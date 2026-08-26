import { queryOptions } from '@tanstack/react-query';
import {
  fetchAssetDetail,
  fetchMovers,
  fetchQuotes,
  type AssetDetail,
  type IndexSymbol,
  type Movers,
  type Quote,
  type SupportedSymbol,
} from '@/lib/api/markets';

/**
 * TanStack Query wiring for the live market panels.
 *
 * `refetchInterval` is what makes the strip and the movers list "real-time"
 * without a WebSocket: the poll fires every 15 s and paints new numbers as
 * they arrive. The backend caches every response for 30 s, so a wall of
 * mounted charts across many tabs never fans out to Yahoo more than twice a
 * minute — pass through us, hit the cache, no upstream call.
 *
 * `refetchOnWindowFocus` is on: someone tabbing back after ten minutes should
 * see a current price, not the level it was at when they left.
 */
export const marketsKeys = {
  all: ['markets'] as const,
  quotes: () => [...marketsKeys.all, 'quotes'] as const,
  asset: (symbol: SupportedSymbol) =>
    [...marketsKeys.all, 'asset', symbol] as const,
  movers: (index: IndexSymbol) =>
    [...marketsKeys.all, 'movers', index] as const,
};

/** Poll cadence retained for endpoints that still need it (asset page). */
const POLL_INTERVAL_MS = 15_000;

/**
 * Quotes are sockets-only.
 *
 * The SSR-hydrated `initialData` paints the first frame; from tick 1 the
 * `/markets` WebSocket owns all updates via `useLiveQuotes`, which
 * patches this same cache key. `staleTime: Infinity` keeps TanStack
 * Query from refetching on remount, and the polling / focus refetches
 * are both off — a socket outage now shows a frozen strip rather than a
 * hidden 15 s fallback pretending everything is live.
 */
export const quotesQuery = (initialData?: Quote[]) =>
  queryOptions({
    queryKey: marketsKeys.quotes(),
    queryFn: fetchQuotes,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    ...(initialData ? { initialData } : {}),
  });

export const assetQuery = (
  symbol: SupportedSymbol,
  initialData?: AssetDetail,
) =>
  queryOptions({
    queryKey: marketsKeys.asset(symbol),
    queryFn: () => fetchAssetDetail(symbol),
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: POLL_INTERVAL_MS,
    ...(initialData ? { initialData } : {}),
  });

export const moversQuery = (index: IndexSymbol, initialData?: Movers) =>
  queryOptions({
    queryKey: marketsKeys.movers(index),
    queryFn: () => fetchMovers(index),
    // Movers matter less than the strip; a 30 s poll is enough and halves the
    // wire traffic on an /markets/[symbol] page.
    refetchInterval: 30_000,
    staleTime: 30_000,
    ...(initialData ? { initialData } : {}),
  });
