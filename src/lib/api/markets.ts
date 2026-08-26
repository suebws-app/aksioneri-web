import { cache } from 'react';
import { ApiError, apiFetch, type RequestOptions } from './client';

/**
 * Live market data, served by aksioneri-api's `/markets` endpoints.
 *
 * Two flavours per resource: a server-side `get*` wrapped in React's
 * `cache()` for use from server components and `generateMetadata`, and a
 * `fetch*` counterpart the client-side `useQuery` calls to poll for updates.
 *
 * Nothing throws on failure: the API is a Yahoo Finance proxy, and Yahoo has
 * had multi-day outages before. A cold or hiccuping backend should cost the
 * visitor a section, not the whole site.
 */

/**
 * Compile-time knowledge of the symbols the API guarantees to serve. Used
 * only as a TypeScript type for props (`SupportedSymbol`) and for the ticker
 * strip's `useLiveQuotes` subscription — every runtime enumeration goes
 * through `getQuotes()` so a new instrument on the backend surfaces in the
 * sitemap and search index without a web deploy.
 *
 * Kept in sync by contract with `SUPPORTED_SYMBOLS` in
 * `aksioneri-api/src/modules/markets/markets.symbols.ts`. Extending the API
 * list without adding it here still works at runtime (`getQuotes()` returns
 * the new symbol) but the value stays untyped in props until this list is
 * updated.
 */
export const SUPPORTED_SYMBOLS = [
  // Indices
  'sp-500',
  'nasdaq-100',
  'dow-jones',
  'stoxx-600',
  'ftse-100',
  'dax-40',
  'nikkei-225',
  'hang-seng',
  // Crypto
  'bitcoin',
  'ethereum',
  'solana',
  'ripple',
  // Commodities
  'gold',
  'silver',
  'oil-wti',
  'oil-brent',
  'natural-gas',
  // Currencies
  'eur-usd',
  'gbp-usd',
  'usd-jpy',
  'aud-usd',
  'usd-cad',
] as const;

export type SupportedSymbol = (typeof SUPPORTED_SYMBOLS)[number];

/** Kept in sync with `INDEX_SYMBOLS` in the API. */
export type IndexSymbol = 'sp-500' | 'nasdaq-100' | 'dow-jones' | 'stoxx-600';

/**
 * The default lead index — the one the homepage strip and movers panel
 * anchor to when a caller does not pass an explicit symbol. Central here
 * so `MarketsPage`, `MarketMovers`, and `MarketMiniChart` cannot drift.
 */
export const LEAD_INDEX: IndexSymbol = 'sp-500';

/**
 * The six instruments the homepage highlights — same set the ticker strip
 * shows, in the same order. The `/markets` index behind the "view all" link
 * still renders every symbol grouped; the homepage table stays focused on the
 * headline six so the strip and the "Tregjet sot" block read as one thing.
 */
export const FEATURED_SYMBOLS = [
  'sp-500',
  'nasdaq-100',
  'dow-jones',
  'bitcoin',
  'gold',
  'eur-usd',
] as const satisfies readonly SupportedSymbol[];

export type AssetType = 'index' | 'crypto' | 'commodity' | 'currency' | 'stock';

export type DataSource = 'biquote' | 'yahoo';

export type MarketStatus = 'open' | 'closed' | 'unknown';

export interface Quote {
  symbol: SupportedSymbol;
  name: string;
  price: string;
  changePercent: number;

  // Optional Step-5 metadata added by the provider-abstraction phase. The
  // strip renders without them if absent, so old server responses keep
  // working while a new deploy rolls out.
  providerSymbol?: string;
  assetType?: AssetType;
  dataSource?: DataSource;
  marketStatus?: MarketStatus;
  quotedAt?: string | null;
}

export interface Mover {
  /**
   * Raw Yahoo ticker (`NVDA`, `BRK-B`). Used as the URL segment when the
   * movers panel links each row to its own asset page.
   */
  symbol: string;
  name: string;
  changePercent: number;
}

export interface Movers {
  gainers: Mover[];
  losers: Mover[];
  /**
   * Was `string[]` — the only column in the movers panel that could not be
   * clicked. Now carries the full `Mover` shape so every row links out.
   */
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
  symbol: SupportedSymbol;
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

  /**
   * Provider-abstraction metadata. Optional so older responses render fine
   * while a new deploy is going out. `dataSource` tells the UI which
   * upstream actually served this tick — used by the eventual "Powered by
   * …" attribution and the stale-data indicator.
   */
  providerSymbol?: string;
  assetType?: AssetType;
  dataSource?: DataSource;
  marketStatus?: MarketStatus;
  quotedAt?: string | null;

  /**
   * Editorial extras. The API does not populate these — they were rendered
   * from hand-authored seed data in the original design. Kept optional here
   * so the component below still accepts them from any future authoring
   * layer without another type flip.
   */
  explainer?: {
    heading: string;
    paragraphs: string[];
    callout: {
      heading: string;
      body: string;
      lessonSlug: string;
      linkLabel: string;
    };
  };
  sectors?: SectorMove[];
  eventSlugs?: string[];
  lessonSlugs?: string[];
}

/**
 * Matches the API's quote cache TTL. Server-rendered pages can hold this for
 * 30 s, since the client will pick up subsequent updates through the poll.
 */
const REVALIDATE_SECONDS = 30;

const cacheOptions: RequestOptions = {
  next: { revalidate: REVALIDATE_SECONDS, tags: ['markets'] },
};

async function safely<T>(work: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return fallback;
    console.error('[markets] request failed:', error);
    return fallback;
  }
}

// --- Server-side (SSR + generateMetadata) --- //

export const getQuotes = cache(async (): Promise<Quote[]> =>
  safely(() => apiFetch<Quote[]>('markets/quotes', cacheOptions), []),
);

/**
 * Fetches one asset. `symbol` is either a known slug (`sp-500`) or a raw
 * ticker (`NVDA`, `BRK-B`) — the API accepts both and 404s on tickers it
 * cannot resolve. Kept as `string` rather than `SupportedSymbol` because
 * the movers panel builds these URLs from Yahoo tickers it does not know
 * ahead of time.
 */
export const getAssetDetail = cache(
  async (symbol: string): Promise<AssetDetail | null> =>
    safely(
      () =>
        apiFetch<AssetDetail>(
          `markets/asset/${encodeURIComponent(symbol)}`,
          cacheOptions,
        ),
      null,
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
  ),
);

// --- Client-side (polled by TanStack Query) --- //

export const fetchQuotes = (): Promise<Quote[]> =>
  apiFetch<Quote[]>('markets/quotes');

export const fetchAssetDetail = (symbol: string): Promise<AssetDetail> =>
  apiFetch<AssetDetail>(`markets/asset/${encodeURIComponent(symbol)}`);

export const fetchMovers = (index: IndexSymbol): Promise<Movers> =>
  apiFetch<Movers>(`markets/movers/${encodeURIComponent(index)}`);

// ── Candles ────────────────────────────────────────────────────────────

export type CandleInterval = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d';

export interface OhlcBar {
  /** Unix milliseconds when the bar opened. */
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

/**
 * OHLCV bars for the interactive chart. Server-rendered initial data
 * hydrates the chart on first paint; the client then patches new bars
 * from the live WebSocket instead of re-polling this endpoint.
 */
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

// ── Health ─────────────────────────────────────────────────────────────

export interface ProviderHealth {
  name: DataSource;
  healthy: boolean;
}

export interface MarketsHealth {
  socket: 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
  providers: ProviderHealth[];
}

export const fetchMarketsHealth = (): Promise<MarketsHealth> =>
  apiFetch<MarketsHealth>('markets/health');
