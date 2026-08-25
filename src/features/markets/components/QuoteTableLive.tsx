'use client';

import { useQuery } from '@tanstack/react-query';
import type { Quote } from '@/lib/api/markets';
import { quotesQuery } from '@/lib/query/marketsQueries';
import { QuoteTable } from './QuoteTable';

/** Client wrapper that keeps `QuoteTable` in sync with the poll. */
export function QuoteTableLive({ initial }: { initial: Quote[] }) {
  const { data } = useQuery(quotesQuery(initial));
  const quotes = data ?? initial;
  return <QuoteTable quotes={quotes} />;
}
