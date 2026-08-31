import { queryOptions } from '@tanstack/react-query';
import {
  fetchAssetDetail,
  fetchMovers,
  fetchQuotes,
  type AssetDetail,
  type IndexSymbol,
  type Movers,
  type Quote,
} from '@/lib/api/markets';

export const marketsKeys = {
  all: ['markets'] as const,
  quotes: () => [...marketsKeys.all, 'quotes'] as const,
  asset: (symbol: string) => [...marketsKeys.all, 'asset', symbol] as const,
  movers: (index: IndexSymbol) =>
    [...marketsKeys.all, 'movers', index] as const,
};

const POLL_INTERVAL_MS = 15_000;

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

export const assetQuery = (symbol: string, initialData?: AssetDetail) =>
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
    refetchInterval: 30_000,
    staleTime: 30_000,
    ...(initialData ? { initialData } : {}),
  });
