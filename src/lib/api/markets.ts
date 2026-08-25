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

/** Kept in sync with `SUPPORTED_SYMBOLS` in the API. */
export const SUPPORTED_SYMBOLS = [
  'sp-500',
  'nasdaq-100',
  'dow-jones',
  'stoxx-600',
  'bitcoin',
  'gold',
  'eur-usd',
] as const;

export type SupportedSymbol = (typeof SUPPORTED_SYMBOLS)[number];

/** Kept in sync with `INDEX_SYMBOLS` in the API. */
export type IndexSymbol = 'sp-500' | 'nasdaq-100' | 'dow-jones' | 'stoxx-600';

export interface Quote {
  symbol: SupportedSymbol;
  name: string;
  price: string;
  changePercent: number;
}

export interface Mover {
  name: string;
  changePercent: number;
}

export interface Movers {
  gainers: Mover[];
  losers: Mover[];
  mostWatched: string[];
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

export const getAssetDetail = cache(
  async (symbol: SupportedSymbol): Promise<AssetDetail | null> =>
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

export const fetchAssetDetail = (
  symbol: SupportedSymbol,
): Promise<AssetDetail> =>
  apiFetch<AssetDetail>(`markets/asset/${encodeURIComponent(symbol)}`);

export const fetchMovers = (index: IndexSymbol): Promise<Movers> =>
  apiFetch<Movers>(`markets/movers/${encodeURIComponent(index)}`);
