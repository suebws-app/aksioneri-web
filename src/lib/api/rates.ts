import { cache } from 'react';
import { ApiError, apiFetch } from './client';

/**
 * Reference rates from aksioneri-api's `/rates` endpoints: ECB euro fixings,
 * consumer-price indices and policy rates.
 *
 * Same two-flavour shape as `markets.ts` — a `get*` wrapped in React `cache()`
 * for server components, and a bare `fetch*` for `useQuery` — and the same
 * refusal to throw. A calculator whose market data is missing should render
 * its "no data" state and let the reader type a rate in by hand, not 500 the
 * page.
 *
 * These are **reference rates**, not tradeable quotes. The UI says so; this
 * comment is here so nobody removes that label thinking it is boilerplate.
 */

/** Kept in sync with `CONVERTIBLE_CURRENCIES` in the API. */
export const CONVERTIBLE_CURRENCIES = [
  'EUR',
  'USD',
  'GBP',
  'CHF',
  'JPY',
  'SEK',
  'NOK',
  'DKK',
  'PLN',
  'CZK',
  'HUF',
  'RON',
  'BGN',
  'TRY',
  'CAD',
  'AUD',
  'CNY',
] as const;

export type ConvertibleCurrency = (typeof CONVERTIBLE_CURRENCIES)[number];

export interface FxLatest {
  base: string;
  /** The day these rates were fixed. Always shown beside the result. */
  date: string;
  /** Units of each currency per one unit of `base`. */
  rates: Record<string, number>;
  source: string;
}

export interface FxSeriesPoint {
  date: string;
  rate: number;
}

export interface FxSeries {
  base: string;
  quote: string;
  data: FxSeriesPoint[];
  source: string;
}

export interface InflationPoint {
  period: string;
  /** Index level, not a percentage. */
  indexValue: number;
}

export interface InflationSeries {
  seriesId: string;
  /**
   * Which series actually answered. When it differs from `seriesId` the
   * requested country had no data — label it in the UI rather than passing
   * euro-area inflation off as Kosovo's.
   */
  servedSeriesId: string;
  unit: string;
  data: InflationPoint[];
  source: string;
}

export interface PolicyRate {
  seriesId: string;
  rate: number;
  effectiveDate: string;
  source: string;
}

async function safely<T>(work: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return fallback;
    console.error('[rates] request failed:', error);
    return fallback;
  }
}

// --- Server-side --- //

/**
 * Every rate for one base, on the latest published day.
 *
 * One request covers the whole converter: the client can re-base and cross
 * any pair from this map without another round trip, which is what lets the
 * currency switcher stay instant.
 *
 * Revalidated hourly — the ECB fixes once per business day, so anything
 * shorter is wasted, and anything much longer risks showing yesterday's rate
 * well into the afternoon.
 */
export const getFxLatest = cache(
  async (base: string = 'EUR'): Promise<FxLatest | null> =>
    safely(
      () =>
        apiFetch<FxLatest>('rates/fx/latest', {
          searchParams: { base },
          next: { revalidate: 3600, tags: ['rates'] },
        }),
      null,
    ),
);

export const getInflationSeries = cache(
  async (seriesId: string): Promise<InflationSeries | null> =>
    safely(
      () =>
        apiFetch<InflationSeries>(`rates/inflation/${seriesId}`, {
          // Monthly data; a day of staleness is invisible.
          next: { revalidate: 86_400, tags: ['rates'] },
        }),
      null,
    ),
);

export const getPolicyRate = cache(
  async (seriesId: string): Promise<PolicyRate | null> =>
    safely(
      () =>
        apiFetch<PolicyRate>(`rates/policy/${seriesId}/latest`, {
          next: { revalidate: 3600, tags: ['rates'] },
        }),
      null,
    ),
);

// --- Client-side --- //

export const fetchFxLatest = (base: string): Promise<FxLatest> =>
  apiFetch<FxLatest>('rates/fx/latest', { searchParams: { base } });

export const fetchFxSeries = (
  base: string,
  quote: string,
  from: string,
  to: string,
): Promise<FxSeries> =>
  apiFetch<FxSeries>('rates/fx/series', {
    searchParams: { base, quote, from, to },
  });
