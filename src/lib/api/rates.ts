import { cache } from 'react';
import { ApiError, apiFetch } from './client';

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
  date: string;
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
  indexValue: number;
}

export interface InflationSeries {
  seriesId: string;
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
