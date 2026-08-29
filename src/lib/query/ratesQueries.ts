import { queryOptions } from '@tanstack/react-query';
import { fetchFxSeries, type FxSeries } from '@/lib/api/rates';

export const ratesKeys = {
  all: ['rates'] as const,
  fxSeries: (base: string, quote: string, from: string, to: string) =>
    [...ratesKeys.all, 'fx-series', base, quote, from, to] as const,
};

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
