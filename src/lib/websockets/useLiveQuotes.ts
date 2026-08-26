'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { Quote, SupportedSymbol } from '@/lib/api/markets';
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
 * additional wiring. The 15 s poll on `quotesQuery` stays as a belt-and-
 * braces safety net for the case where the WS handshake fails.
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
 * formatted string ("6,421.20"), so the tick's numeric price is left to
 * the caller to format via its own precision rules — the merged row keeps
 * the previous formatted string when the tick lacks a price. Everything
 * else that the tick carries overrides.
 */
function mergeQuote(prev: Quote, tick: LiveQuote): Quote {
  return {
    ...prev,
    price:
      tick.price !== null ? formatFallback(tick.price, prev.price) : prev.price,
    changePercent: tick.changePercent ?? prev.changePercent,
    marketStatus: tick.marketStatus ?? prev.marketStatus,
    quotedAt: tick.quotedAt ?? prev.quotedAt,
    dataSource: tick.dataSource,
  };
}

/**
 * The WS ticks arrive faster than the API's per-instrument precision
 * rules can be re-derived here. Fall back to a lossy but readable
 * formatting that preserves the previous string's decimal count when we
 * can guess it, otherwise 2 decimals. Not perfect for currency pairs
 * (`EUR/USD` at 4 dp), but survives the round trip until the next REST
 * refresh replaces it with the properly-formatted value.
 */
function formatFallback(next: number, previousFormatted: string): string {
  const dotIndex = previousFormatted.indexOf('.');
  const digits = dotIndex >= 0 ? previousFormatted.length - dotIndex - 1 : 2;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: previousFormatted.includes(','),
  }).format(next);
}
