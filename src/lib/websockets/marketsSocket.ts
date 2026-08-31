import { io, type Socket } from 'socket.io-client';
import { clientEnv } from '@/lib/utils/env.client';
import type { DataSource, MarketStatus } from '@/lib/api/markets';

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

export type ProviderConnectionState =
  'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export interface ProviderConnectionEvent {
  provider: DataSource;
  state: ProviderConnectionState;
}

export type ProviderConnectionSnapshot = Readonly<
  Record<DataSource, ProviderConnectionState>
>;

interface SubscribeAck {
  subscribed?: string[];
  error?: 'rate_limited';
}

const RATE_LIMIT_MAX_RETRIES = 3;
const RATE_LIMIT_BASE_DELAY_MS = 2000;
const RATE_LIMIT_JITTER_MS = 500;

class MarketsSocketClient {
  private socket: Socket | null = null;

  private readonly refcounts = new Map<string, number>();

  private readonly listeners = new Map<
    string,
    Set<(quote: LiveQuote) => void>
  >();

  private readonly latest = new Map<string, LiveQuote>();

  private readonly staleFlags = new Map<string, boolean>();

  private readonly staleListeners = new Map<
    string,
    Set<(isStale: boolean) => void>
  >();

  private state: ConnectionState = 'idle';
  private readonly stateListeners = new Set<(state: ConnectionState) => void>();

  private readonly providerStates = new Map<
    DataSource,
    ProviderConnectionState
  >();
  private readonly providerStateListeners = new Set<
    (snapshot: ProviderConnectionSnapshot) => void
  >();

  subscribe(symbols: string[], onTick: (quote: LiveQuote) => void): () => void {
    const cleaned = symbols.filter(
      (s) => typeof s === 'string' && s.length > 0,
    );
    if (cleaned.length === 0) return () => undefined;

    this.ensureConnected();
    const socket = this.socket;
    if (!socket) return () => undefined;

    const toRequest: string[] = [];
    for (const symbol of cleaned) {
      const listeners = this.listeners.get(symbol) ?? new Set();
      listeners.add(onTick);
      this.listeners.set(symbol, listeners);

      const next = (this.refcounts.get(symbol) ?? 0) + 1;
      this.refcounts.set(symbol, next);
      if (next === 1) toRequest.push(symbol);

      const cached = this.latest.get(symbol);
      if (cached) onTick(cached);
    }

    if (toRequest.length > 0) this.requestSubscribe(toRequest, 0);

    return () => this.releaseSubscription(cleaned, onTick);
  }

  onStateChange(listener: (state: ConnectionState) => void): () => void {
    this.stateListeners.add(listener);
    listener(this.state);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  subscribeConnectionState(
    listener: (snapshot: ProviderConnectionSnapshot) => void,
  ): () => void {
    this.providerStateListeners.add(listener);
    listener(this.getConnectionState());
    return () => {
      this.providerStateListeners.delete(listener);
    };
  }

  getConnectionState(): ProviderConnectionSnapshot {
    const snapshot: Partial<Record<DataSource, ProviderConnectionState>> = {};
    for (const [provider, state] of this.providerStates) {
      snapshot[provider] = state;
    }
    return snapshot as ProviderConnectionSnapshot;
  }

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

    if (this.refcounts.size === 0 && this.stateListeners.size === 0) {
      this.disconnect();
    }
  }

  private requestSubscribe(
    symbols: string[],
    retry: number,
    allowMissingRetry = true,
  ): void {
    const socket = this.socket;
    if (!socket) return;

    const stillWanted = symbols.filter((s) => (this.refcounts.get(s) ?? 0) > 0);
    if (stillWanted.length === 0) return;

    socket.emit('subscribe', { symbols: stillWanted }, (ack?: SubscribeAck) => {
      if (!ack) return;

      if (ack.error === 'rate_limited') {
        if (retry >= RATE_LIMIT_MAX_RETRIES) {
          console.warn(
            '[markets-socket] subscribe rate-limited; giving up',
            stillWanted,
          );
          return;
        }
        const delay =
          RATE_LIMIT_BASE_DELAY_MS + Math.random() * RATE_LIMIT_JITTER_MS;
        console.warn(
          `[markets-socket] subscribe rate-limited; retry ${retry + 1} in ${Math.round(delay)}ms`,
        );
        setTimeout(() => {
          this.requestSubscribe(stillWanted, retry + 1, allowMissingRetry);
        }, delay);
        return;
      }

      if (!allowMissingRetry) return;

      const subscribed = new Set(ack.subscribed ?? []);
      const missing = stillWanted.filter((s) => !subscribed.has(s));
      if (missing.length > 0) this.requestSubscribe(missing, retry, false);
    });
  }

  private ensureConnected(): void {
    if (this.socket) return;

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
      const symbols = Array.from(this.refcounts.keys());
      if (symbols.length > 0) this.requestSubscribe(symbols, 0);
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

    this.socket.on('connection-state', (event: ProviderConnectionEvent) => {
      this.providerStates.set(event.provider, event.state);
      const snapshot = this.getConnectionState();
      for (const listener of this.providerStateListeners) listener(snapshot);
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

export const marketsSocket = new MarketsSocketClient();
