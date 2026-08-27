import { io, type Socket } from 'socket.io-client';
import { clientEnv } from '@/lib/utils/env.client';

/**
 * Singleton browser-side client for the calendar Socket.io namespace.
 *
 * Every open calendar page calls `onUpdate(cb)` and gets a `dispose()`
 * back for cleanup. The socket carries a lightweight `calendar-updated`
 * pulse — no payload beyond a list of changed slugs — and the caller's
 * job is to trigger a REST refetch (via `revalidateTag('calendar')` +
 * `router.refresh()`) rather than patch state from the wire directly.
 *
 * The connection is lazy: opened when the first listener subscribes,
 * closed when the last one leaves. That keeps the socket count at zero
 * on tabs the reader is not currently viewing the calendar on.
 */
class CalendarSocketClient {
  private socket: Socket | null = null;
  private readonly listeners = new Set<
    (payload: { changedSlugs: string[] }) => void
  >();

  onUpdate(
    listener: (payload: { changedSlugs: string[] }) => void,
  ): () => void {
    this.listeners.add(listener);
    this.ensureConnected();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) this.disconnect();
    };
  }

  private ensureConnected(): void {
    if (this.socket) return;

    // `NEXT_PUBLIC_API_URL` carries the `/api` REST prefix; Socket.io wants
    // the origin plus the namespace, so strip `/api` off before joining.
    const origin = clientEnv.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '');
    const url = `${origin}/calendar`;

    this.socket = io(url, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    this.socket.on(
      'calendar-updated',
      (payload: { changedSlugs: string[] }) => {
        for (const listener of this.listeners) listener(payload);
      },
    );

    // Mirrors `marketsSocket`: a dropped connection means every pulse in
    // between was missed, so when Socket.io re-establishes the link the
    // subscribers are notified as if an update had arrived. Their job is
    // "refetch the calendar", which is exactly the right response to an
    // outage of unknown length — an empty changed-slugs list because the
    // wire does not know what changed while it was down.
    this.socket.io.on('reconnect', () => {
      for (const listener of this.listeners) listener({ changedSlugs: [] });
    });
  }

  private disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}

/**
 * Module-level singleton. Every mount of the live wrapper reuses this
 * client so a single browser holds one socket regardless of how many
 * calendar views live in the tree.
 */
export const calendarSocket = new CalendarSocketClient();
