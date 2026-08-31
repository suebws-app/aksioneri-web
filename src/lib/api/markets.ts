import { cache } from 'react';
import { apiFetch, type RequestOptions } from './client';
import { safely } from './safely';

export const SUPPORTED_SYMBOLS = [
  'sp-500',
  'nasdaq-100',
  'dow-jones',
  'stoxx-600',
  'ftse-100',
  'dax-40',
  'nikkei-225',
  'hang-seng',
  'bitcoin',
  'ethereum',
  'solana',
  'ripple',
  'gold',
  'silver',
  'oil-wti',
  'oil-brent',
  'natural-gas',
  'eur-usd',
  'gbp-usd',
  'usd-jpy',
  'aud-usd',
  'usd-cad',
] as const;

export type SupportedSymbol = (typeof SUPPORTED_SYMBOLS)[number];

export type IndexSymbol = 'sp-500' | 'nasdaq-100' | 'dow-jones' | 'stoxx-600';

export const LEAD_INDEX: IndexSymbol = 'sp-500';

export const FEATURED_SYMBOLS = [
  'sp-500',
  'nasdaq-100',
  'dow-jones',
  'bitcoin',
  'gold',
  'eur-usd',
] as const satisfies readonly SupportedSymbol[];

export interface FeaturedStockMeta {
  ticker: string;
  name: string;
  sector: string;
}

export const FEATURED_STOCK_META: readonly FeaturedStockMeta[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'technology' },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'semiconductors' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'technology' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'consumerDiscretionary' },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'automotive' },
  { ticker: 'META', name: 'Meta Platforms Inc.', sector: 'technology' },
];

export const FEATURED_STOCKS = FEATURED_STOCK_META.map((stock) => stock.ticker);

export type AssetType = 'index' | 'crypto' | 'commodity' | 'currency' | 'stock';

export type DataSource = 'biquote' | 'yahoo' | 'binance' | 'cache';

export type MarketStatus = 'open' | 'closed' | 'unknown';

export interface Quote {
  symbol: string;
  name: string;
  price: string;
  changePercent: number;

  providerSymbol?: string;
  assetType?: AssetType;
  dataSource?: DataSource;
  marketStatus?: MarketStatus;
  quotedAt?: string | null;
}

export interface Mover {
  symbol: string;
  name: string;
  changePercent: number;
}

export interface Movers {
  gainers: Mover[];
  losers: Mover[];
  mostWatched: Mover[];
}

export interface Holding {
  name: string;
  weight: number;
  changePercent: number;
}

export interface Statistic {
  label: string;
  value: string;
  tone?: 'positive' | 'negative' | null;
}

export interface SectorMove {
  name: string;
  changePercent: number;
}

export interface AssetDetail {
  symbol: string;
  ticker: string;
  name: string;
  descriptor: string;
  category: string;
  price: string;
  changePercent: number;
  changeAbsolute: string;
  statusLine: string;
  series: number[];
  sessionTimes: string[];
  statistics: Statistic[];
  holdings?: Holding[] | null;

  providerSymbol?: string;
  assetType?: AssetType;
  dataSource?: DataSource;
  marketStatus?: MarketStatus;
  quotedAt?: string | null;
}

const REVALIDATE_SECONDS = 30;

const cacheOptions: RequestOptions = {
  next: { revalidate: REVALIDATE_SECONDS, tags: ['markets'] },
};

const SCOPE = 'markets';

export const getQuotes = cache(async (): Promise<Quote[]> =>
  safely(() => apiFetch<Quote[]>('markets/quotes', cacheOptions), [], SCOPE),
);

export const getQuotesFor = cache(
  async (symbols: readonly string[]): Promise<Quote[]> => {
    if (symbols.length === 0) return [];
    return safely(
      () =>
        apiFetch<Quote[]>('markets/quotes', {
          searchParams: { symbols: symbols.join(',') },
          ...cacheOptions,
        }),
      [],
      SCOPE,
    );
  },
);

export const getAssetDetail = cache(
  async (symbol: string): Promise<AssetDetail | null> =>
    safely(
      () =>
        apiFetch<AssetDetail>(
          `markets/asset/${encodeURIComponent(symbol)}`,
          cacheOptions,
        ),
      null,
      SCOPE,
    ),
);

export const getMovers = cache(async (index: IndexSymbol): Promise<Movers> =>
  safely(
    () =>
      apiFetch<Movers>(
        `markets/movers/${encodeURIComponent(index)}`,
        cacheOptions,
      ),
    { gainers: [], losers: [], mostWatched: [] },
    SCOPE,
  ),
);

export const fetchQuotes = (): Promise<Quote[]> =>
  apiFetch<Quote[]>('markets/quotes');

export const fetchAssetDetail = (symbol: string): Promise<AssetDetail> =>
  apiFetch<AssetDetail>(`markets/asset/${encodeURIComponent(symbol)}`);

export const fetchMovers = (index: IndexSymbol): Promise<Movers> =>
  apiFetch<Movers>(`markets/movers/${encodeURIComponent(index)}`);

export type CandleInterval = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d';

export interface OhlcBar {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number | null;
}

export interface Candles {
  symbol: string;
  providerSymbol: string;
  interval: CandleInterval;
  bars: OhlcBar[];
  dataSource: DataSource;
}

export const getCandles = cache(
  async (
    symbol: string,
    interval: CandleInterval = '1h',
    limit = 200,
  ): Promise<Candles | null> =>
    safely(
      () =>
        apiFetch<Candles>(
          `markets/asset/${encodeURIComponent(symbol)}/candles`,
          {
            searchParams: { interval, limit },
            ...cacheOptions,
          },
        ),
      null,
      SCOPE,
    ),
);

export const fetchCandles = (
  symbol: string,
  interval: CandleInterval = '1h',
  limit = 200,
): Promise<Candles> =>
  apiFetch<Candles>(`markets/asset/${encodeURIComponent(symbol)}/candles`, {
    searchParams: { interval, limit },
  });

export interface MarketsHealth {
  healthy: boolean;
}

export const fetchMarketsHealth = (): Promise<MarketsHealth> =>
  apiFetch<MarketsHealth>('markets/health');

export interface InstrumentSearchHit {
  symbol: string;
  name: string;
  exchange: string | null;
  type: string | null;
}

export const searchInstruments = (
  query: string,
  limit = 8,
): Promise<InstrumentSearchHit[]> =>
  apiFetch<InstrumentSearchHit[]>('markets/search', {
    searchParams: { q: query, limit },
  });
