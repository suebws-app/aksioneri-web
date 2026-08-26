'use client';

import { useQuery } from '@tanstack/react-query';
import type { Quote, SupportedSymbol } from '@/lib/api/markets';
import { quotesQuery } from '@/lib/query/marketsQueries';
import { useLiveQuotes } from '@/lib/websockets/useLiveQuotes';
import { QuoteTable } from './QuoteTable';

/**
 * Client wrapper that keeps `QuoteTable` in sync with live WebSocket
 * ticks. The SSR-hydrated `initial` fills the first paint; `useLiveQuotes`
 * subscribes to the visible symbols and patches the shared TanStack cache
 * on each tick. No REST polling — a socket outage freezes the table
 * rather than papering over it with 15 s-old numbers.
 *
 * IMPORTANT: `quotesQuery` uses one cache key across the whole app, so
 * `data` here is EVERY quote the API knows about, not this table's
 * subset. The `initial` prop defines the subset; we filter the cache
 * down to those symbols so a `/markets` page rendering four grouped
 * tables does not repeat the same seven rows in every group.
 */
export function QuoteTableLive({ initial }: { initial: Quote[] }) {
  const { data } = useQuery(quotesQuery(initial));

  const symbols = initial.map((q) => q.symbol);
  const bySymbol = new Map((data ?? initial).map((q) => [q.symbol, q]));
  const quotes = symbols
    .map((symbol) => bySymbol.get(symbol))
    .filter((q): q is Quote => q !== undefined);

  useLiveQuotes(symbols as SupportedSymbol[]);
  return <QuoteTable quotes={quotes} />;
}
