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

function formatSignedQuotePrice(
  value: number,
  precision: QuotePrecision,
): string {
  const sign = value >= 0 ? '+' : '−';
  return `${sign}${formatQuotePrice(Math.abs(value), precision)}`;
}
