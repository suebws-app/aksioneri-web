'use client';

import { useEffect, useRef, useState } from 'react';
import {
  formatQuotePrice,
  quotePrecisionOf,
  type QuotePrecision,
} from '@/lib/format/quotePrice';
import { cn } from '@/lib/utils/cn';
import { marketsSocket, type LiveQuote } from '@/lib/websockets/marketsSocket';
import { usePriceFlash } from '../usePriceFlash';

/**
 * Big price + change display on the asset page, live-updated over the
 * markets WebSocket. Server-rendered `initial*` props paint the first
 * frame; the socket takes over from tick 1 and applies the same
 * TradingView-style green/red text flash as the top strip.
 *
 * Extracted as a client island so `AssetPage` can stay a server
 * component (SSR + SEO), with only the two spans that need live data
 * paying the client-side cost.
 */
export interface AssetPriceLiveProps {
  symbol: string;
  initialPrice: string;
  initialChangePercent: number;
  initialChangeAbsolute: string;
}

export function AssetPriceLive({
  symbol,
  initialPrice,
  initialChangePercent,
  initialChangeAbsolute,
}: AssetPriceLiveProps) {
  const [price, setPrice] = useState(initialPrice);
  const [changePercent, setChangePercent] = useState(initialChangePercent);
  const [changeAbsolute, setChangeAbsolute] = useState(initialChangeAbsolute);

  // Precision is inferred from the SSR'd string once and pinned — the
  // socket tick carries a raw number and we reformat to the exact shape
  // of the server-rendered string (2 dp for indices, 0 for BTC, 4 for FX)
  // without needing a separate per-symbol table on the client. See
  // `lib/format/quotePrice` for why this mirrors the API's formatter
  // rather than the site locale.
  const precisionRef = useRef(quotePrecisionOf(initialPrice));

  useEffect(() => {
    const dispose = marketsSocket.subscribe([symbol], (tick: LiveQuote) => {
      if (tick.price !== null) {
        setPrice(formatQuotePrice(tick.price, precisionRef.current));
      }
      if (tick.changePercent !== null) setChangePercent(tick.changePercent);
      if (tick.changeAbsolute !== null) {
        setChangeAbsolute(
          formatSignedQuotePrice(tick.changeAbsolute, precisionRef.current),
        );
      }
    });
    return dispose;
  }, [symbol]);

  const flash = usePriceFlash(price);
  const isNegative = changePercent < 0;

  return (
    <p className="flex flex-wrap items-baseline gap-4">
      <span
        className={cn(
          'font-mono text-[38px] transition-colors duration-500',
          flash === 'up'
            ? 'text-positive'
            : flash === 'down'
              ? 'text-negative'
              : 'text-ink',
        )}
      >
        {price}
      </span>
      <span
        className={cn(
          'font-mono text-[17px]',
          isNegative ? 'text-negative' : 'text-positive',
        )}
      >
        {changeAbsolute
          ? `${changeAbsolute} (${isNegative ? '−' : '+'}${Math.abs(changePercent).toFixed(2)}%)`
          : `${isNegative ? '−' : '+'}${Math.abs(changePercent).toFixed(2)}%`}
      </span>
    </p>
  );
}

/**
 * Signed variant for the absolute change. True minus (U+2212) rather
 * than a hyphen, the same choice `ChangeValue.tsx` makes — in Plex Mono
 * the true minus has the width of a digit, so the column stays aligned.
 */
function formatSignedQuotePrice(
  value: number,
  precision: QuotePrecision,
): string {
  const sign = value >= 0 ? '+' : '−';
  return `${sign}${formatQuotePrice(Math.abs(value), precision)}`;
}
