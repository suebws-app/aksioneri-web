import { io, type Socket } from 'socket.io-client';
import { clientEnv } from '@/lib/utils/env.client';
import type { DataSource, MarketStatus } from '@/lib/api/markets';

/**
 * One live tick as the `/markets` gateway emits it. Field names match
 * `NormalizedQuote` in the API — the socket is a passthrough of the
 * upstream shape with the browser's original symbol alias echoed back
 * so callers can look up by the same identifier they subscribed with.
 */
export interface LiveQuote {
  symbol: string;
  providerSymbol: string;
  price: number | null;
  previousClose: number | null;
  changePercent: number | null;
  changeAbsolute: number | null;
  marketStatus: MarketStatus;
  quotedAt: string | null;
  stale: boolean;
  dataSource: DataSource;
}

export type ConnectionState =
  'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

interface ConnectionEvent {
  provider: DataSource;
  state: 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
}

/**
 * Singleton browser-side client for the markets Socket.io namespace.
 *
 * Every component that wants a live quote calls `subscribe(symbol, cb)` and
 * gets a `dispose()` back for cleanup. Multiple subscribers of the same
 * symbol share one server-side subscription — the refcount lives here so
 * unmounting a strip that mounts the same symbol twice does not release
 * the upstream slot early.
 *
 * The connection is lazy: opened the first time anyone subscribes,
 * disposed when the last subscriber leaves. That keeps the socket count
 * zero on server-rendered pages and on tabs the reader never interacts
 * with.
 */
class MarketsSocketClient {
  private socket: Socket | null = null;

  /** symbol → count of live subscribers (per browser). */
  private readonly refcounts = new Map<string, number>();

  /** symbol → set of callbacks to invoke on each tick. */
  private readonly listeners = new Map<
    string,
    Set<(quote: LiveQuote) => void>
  >();

  /** Cache of the last tick per symbol, for cold subscribers. */
  private readonly latest = new Map<string, LiveQuote>();

  /** symbol → is-stale flag from the server's stale-detection. */
  private readonly staleFlags = new Map<string, boolean>();

  /** symbol → set of callbacks that want to know when the flag flips. */
  private readonly staleListeners = new Map<
    string,
    Set<(isStale: boolean) => void>
  >();

  private state: ConnectionState = 'idle';
  private readonly stateListeners = new Set<(state: ConnectionState) => void>();

  subscribe(symbols: string[], onTick: (quote: LiveQuote) => void): () => void {
    const cleaned = symbols.filter(
      (s) => typeof s === 'string' && s.length > 0,
    );
    if (cleaned.length === 0) return () => undefined;

    this.ensureConnected();
    const socket = this.socket;
    if (!socket) return () => undefined;

    for (const symbol of cleaned) {
      const listeners = this.listeners.get(symbol) ?? new Set();
      listeners.add(onTick);
      this.listeners.set(symbol, listeners);

      const next = (this.refcounts.get(symbol) ?? 0) + 1;
      this.refcounts.set(symbol, next);
      if (next === 1) {
        // First subscriber on this tab — ask the server to add it. Server
        // maintains its own refcount, so this call is safe to make on
        // every 0→1 transition.
        socket.emit('subscribe', { symbols: [symbol] });
      }

      // Replay the last-known tick to the fresh listener so it does not
      // wait up to 15 s (or 60 s at the edge of a session) for the next
      // upstream update to render.
      const cached = this.latest.get(symbol);
      if (cached) onTick(cached);
    }

    return () => this.releaseSubscription(cleaned, onTick);
  }

  onStateChange(listener: (state: ConnectionState) => void): () => void {
    this.stateListeners.add(listener);
    // Prime the listener with the current state so it does not need to
    // wait for the first flip to render a status indicator.
    listener(this.state);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  /**
   * Subscribe to the stale-flag for one symbol. Emits `true` when the
   * server flags it stale (no upstream tick for >30 s) and `false` when
   * a fresh tick clears it. Primed with the current flag so a
   * late-mounting component does not flash "live" before the next flip.
   *
   * Does not touch the tick refcount — a component that only wants the
   * stale badge should still call `subscribe` if it also renders the
   * price.
   */
  onStaleChange(
    symbol: string,
    listener: (isStale: boolean) => void,
  ): () => void {
    let listeners = this.staleListeners.get(symbol);
    if (!listeners) {
      listeners = new Set();
      this.staleListeners.set(symbol, listeners);
    }
    listeners.add(listener);
    listener(this.staleFlags.get(symbol) ?? false);
    return () => {
      const set = this.staleListeners.get(symbol);
      set?.delete(listener);
      if (set && set.size === 0) this.staleListeners.delete(symbol);
    };
  }

  private releaseSubscription(
    symbols: string[],
    onTick: (quote: LiveQuote) => void,
  ): void {
    for (const symbol of symbols) {
      const listeners = this.listeners.get(symbol);
      listeners?.delete(onTick);
      if (listeners && listeners.size === 0) this.listeners.delete(symbol);

      const current = this.refcounts.get(symbol) ?? 0;
      if (current <= 0) continue;
      const next = current - 1;
      if (next === 0) {
        this.refcounts.delete(symbol);
        this.latest.delete(symbol);
        this.socket?.emit('unsubscribe', { symbols: [symbol] });
      } else {
        this.refcounts.set(symbol, next);
      }
    }

    // Nothing subscribed and no state listeners → close the socket. Keeps
    // idle tabs from holding an open connection for no reason.
    if (this.refcounts.size === 0 && this.stateListeners.size === 0) {
      this.disconnect();
    }
  }

  private ensureConnected(): void {
    if (this.socket) return;

    // `NEXT_PUBLIC_API_URL` carries the `/api` REST prefix (e.g.
    // `http://localhost:4000/api`). Socket.io wants the origin plus the
    // namespace, so strip `/api` off before joining.
    const origin = clientEnv.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '');
    const url = `${origin}/markets`;

    this.setState('connecting');
    this.socket = io(url, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    this.socket.on('connect', () => this.setState('connected'));
    this.socket.on('disconnect', () => this.setState('disconnected'));
    this.socket.io.on('reconnect_attempt', () => this.setState('reconnecting'));
    this.socket.io.on('reconnect', () => {
      this.setState('connected');
      // Rehydrate every current subscription so a reconnect resumes
      // coverage without waiting for every component to unmount and
      // remount.
      const symbols = Array.from(this.refcounts.keys());
      if (symbols.length > 0) {
        this.socket?.emit('subscribe', { symbols });
      }
    });

    this.socket.on('quote', (quote: LiveQuote) => {
      this.latest.set(quote.symbol, quote);
      const listeners = this.listeners.get(quote.symbol);
      if (!listeners) return;
      for (const listener of listeners) listener(quote);
    });

    this.socket.on(
      'stale',
      (event: { symbol: string; providerSymbol: string; stale: boolean }) => {
        this.staleFlags.set(event.symbol, event.stale);
        const listeners = this.staleListeners.get(event.symbol);
        if (!listeners) return;
        for (const listener of listeners) listener(event.stale);
      },
    );

    // Upstream (BiQuote → API) state changes propagate here so the UI
    // can label a fallback flip or a full outage. Distinct from this
    // socket's own state — an API instance can be up while its BiQuote
    // socket is reconnecting.
    this.socket.on('connection-state', (event: ConnectionEvent) => {
      // Reserved for a future "Powered by …" / provider-status pane;
      // for now this is a hook point, not a rendered signal.
      void event;
    });
  }

  private disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    this.setState('idle');
  }

  private setState(state: ConnectionState): void {
    if (this.state === state) return;
    this.state = state;
    for (const listener of this.stateListeners) listener(state);
  }
}

/**
 * Module-level singleton. All hooks share this instance so subscription
 * refcounting works across the whole app.
 */
export const marketsSocket = new MarketsSocketClient();
