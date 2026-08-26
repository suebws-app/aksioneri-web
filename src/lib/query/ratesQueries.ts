import { queryOptions } from '@tanstack/react-query';
import { fetchFxSeries, type FxSeries } from '@/lib/api/rates';

/**
 * Query keys for reference rates.
 *
 * A factory rather than inline arrays, per the data-layer skill: an inline
 * key is invisible to `invalidateQueries` and drifts the moment it is written
 * twice.
 */
export const ratesKeys = {
  all: ['rates'] as const,
  fxSeries: (base: string, quote: string, from: string, to: string) =>
    [...ratesKeys.all, 'fx-series', base, quote, from, to] as const,
};

/**
 * A currency pair's history.
 *
 * `staleTime` is an hour because the underlying series only gains a point
 * once per business day; refetching on focus would spend a request to receive
 * the identical array.
 */
export const fxSeriesQuery = (
  base: string,
  quote: string,
  from: string,
  to: string,
  initial?: FxSeries,
) =>
  queryOptions({
    queryKey: ratesKeys.fxSeries(base, quote, from, to),
    queryFn: () => fetchFxSeries(base, quote, from, to),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...(initial ? { initialData: initial } : {}),
  });
