'use client';

import { useQuery } from '@tanstack/react-query';
import type { Quote, SupportedSymbol } from '@/lib/api/markets';
import { quotesQuery } from '@/lib/query/marketsQueries';
import { useLiveQuotes } from '@/lib/websockets/useLiveQuotes';
import { QuoteTable } from './QuoteTable';

/**
 * Client wrapper that keeps `QuoteTable` in sync with live WebSocket
 * ticks. The SSR-hydrated `initial` fills the first paint; `useLiveQuotes`
 * subscribes to every visible symbol and patches the shared TanStack
 * cache on each tick. No REST polling — a socket outage freezes the
 * table rather than papering over it with 15 s-old numbers.
 */
export function QuoteTableLive({ initial }: { initial: Quote[] }) {
  const { data } = useQuery(quotesQuery(initial));
  const quotes = data ?? initial;
  const symbols = quotes.map((q) => q.symbol) as SupportedSymbol[];
  useLiveQuotes(symbols);
  return <QuoteTable quotes={quotes} />;
}
