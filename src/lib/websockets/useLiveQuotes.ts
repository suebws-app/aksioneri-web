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

export function useLiveQuotes(symbols: readonly SupportedSymbol[]): {
  connectionState: ConnectionState;
} {
  const queryClient = useQueryClient();
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('idle');

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
  }, [key, queryClient]);

  return { connectionState };
}

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
