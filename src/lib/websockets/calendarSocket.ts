import { io, type Socket } from 'socket.io-client';
import { clientEnv } from '@/lib/utils/env.client';

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

    this.socket.io.on('reconnect', () => {
      for (const listener of this.listeners) listener({ changedSlugs: [] });
    });
  }

  private disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const calendarSocket = new CalendarSocketClient();
