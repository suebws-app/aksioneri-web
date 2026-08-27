'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { Quote, SupportedSymbol } from '@/lib/api/markets';
import { formatQuotePrice, quotePrecisionOf } from '@/lib/format/quotePrice';
import { marketsKeys } from '@/lib/query/marketsQueries';
import {
  marketsSocket,
  type ConnectionState,
  type LiveQuote,
} from './marketsSocket';

/**
 * Subscribes to a set of symbols over the markets WebSocket and patches
 * the TanStack Query cache under `['markets', 'quotes']` on every tick.
 *
 * Nothing in the render tree needs to change: components that already do
 * `useQuery(quotesQuery(initial))` see live values arrive without any
 * additional wiring. `quotesQuery` is sockets-only — no poll and no focus
 * refetch stands behind this hook, so what it writes into the cache is
 * what stays on screen until the next tick.
 *
 * The refcount inside `marketsSocket` deduplicates: mounting this hook
 * twice for the same symbol opens exactly one upstream subscription.
 */
export function useLiveQuotes(symbols: readonly SupportedSymbol[]): {
  connectionState: ConnectionState;
} {
  const queryClient = useQueryClient();
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('idle');

  // `symbols` is a fresh array on every render — the join keeps the effect
  // stable across renders when the *set* of symbols has not changed.
  const key = symbols.slice().sort().join(',');

  useEffect(() => {
    const dispose = marketsSocket.subscribe(
      Array.from(symbols),
      (tick: LiveQuote) => {
        queryClient.setQueryData<Quote[]>(marketsKeys.quotes(), (prev) => {
          if (!prev) return prev;
          const merged = prev.map((row) =>
            row.symbol === tick.symbol ? mergeQuote(row, tick) : row,
          );
          return merged;
        });
      },
    );
    const unsub = marketsSocket.onStateChange(setConnectionState);
    return () => {
      dispose();
      unsub();
    };
    // Effect keyed on the sorted symbol string, not the array reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, queryClient]);

  return { connectionState };
}

/**
 * Applies one live tick over an existing DTO. The strip's `price` is a
 * formatted string ("6,421.20"); the tick's raw number is reformatted to
 * the exact shape of that SSR string — same fraction digits, same
 * grouping, same convention as the API's own `formatPrice` — so a tick
 * updates the digits without visibly rewriting the number. There is no
 * correcting REST refresh behind this (`quotesQuery` is sockets-only),
 * so the reformat has to be exact; `lib/format/quotePrice` documents how
 * it mirrors the API. The merged row keeps the previous formatted string
 * when the tick lacks a price. Everything else the tick carries overrides.
 */
function mergeQuote(prev: Quote, tick: LiveQuote): Quote {
  return {
    ...prev,
    price:
      tick.price !== null
        ? formatQuotePrice(tick.price, quotePrecisionOf(prev.price))
        : prev.price,
    changePercent: tick.changePercent ?? prev.changePercent,
    marketStatus: tick.marketStatus ?? prev.marketStatus,
    quotedAt: tick.quotedAt ?? prev.quotedAt,
    dataSource: tick.dataSource,
  };
}
