'use client';

import { useQuery } from '@tanstack/react-query';
import type { Quote, SupportedSymbol } from '@/lib/api/markets';
import { quotesQuery } from '@/lib/query/marketsQueries';
import { useLiveQuotes } from '@/lib/websockets/useLiveQuotes';
import { QuoteTable } from './QuoteTable';

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
