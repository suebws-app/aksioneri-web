import { cache } from 'react';
import { safely } from './safely';
import { apiFetch } from './client';

const safelyRates = <T>(work: () => Promise<T>, fallback: T): Promise<T> =>
  safely(work, fallback, 'rates');

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

export const getFxLatest = cache(
  async (base: string = 'EUR'): Promise<FxLatest | null> =>
    safelyRates(
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
    safelyRates(
      () =>
        apiFetch<InflationSeries>(`rates/inflation/${seriesId}`, {
          next: { revalidate: 86_400, tags: ['rates'] },
        }),
      null,
    ),
);

export const getPolicyRate = cache(
  async (seriesId: string): Promise<PolicyRate | null> =>
    safelyRates(
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
