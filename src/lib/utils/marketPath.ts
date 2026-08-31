import { TICKER_TO_SLUG } from '@/features/markets/marketsUniverse';

export const toMarketPath = (symbol: string): string => {
  if (typeof symbol !== 'string') return '/markets';
  const trimmed = symbol.trim();
  if (trimmed.length === 0) return '/markets';
  const upper = trimmed.toUpperCase();
  const aliased = TICKER_TO_SLUG[upper] ?? trimmed;
  return `/markets/${encodeURIComponent(aliased)}`;
};
