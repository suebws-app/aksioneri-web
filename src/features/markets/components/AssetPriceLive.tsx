'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { marketsSocket, type LiveQuote } from '@/lib/websockets/marketsSocket';

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
  // socket tick carries a raw number and we reformat to match the
  // instrument's convention (2 dp for indices, 0 for BTC, 4 for FX)
  // without needing a separate per-symbol table on the client.
  const precisionRef = useRef({
    digits: decimalPlaces(initialPrice),
    grouping: initialPrice.includes(','),
  });

  useEffect(() => {
    const dispose = marketsSocket.subscribe([symbol], (tick: LiveQuote) => {
      if (tick.price !== null) {
        setPrice(
          formatWithPrecision(
            tick.price,
            precisionRef.current.digits,
            precisionRef.current.grouping,
          ),
        );
      }
      if (tick.changePercent !== null) setChangePercent(tick.changePercent);
      if (tick.changeAbsolute !== null) {
        setChangeAbsolute(
          formatSignedWithPrecision(
            tick.changeAbsolute,
            precisionRef.current.digits,
            precisionRef.current.grouping,
          ),
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
 * TradingView-style flash. Duplicated from `MarketTickerLive` on purpose:
 * moving it to a shared file adds an indirection for one small hook, and
 * the file boundaries between the strip and the asset page make its
 * ownership ambiguous. If a third consumer needs it, promote then.
 */
function usePriceFlash(price: string): 'up' | 'down' | null {
  const prevRef = useRef<string>(price);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = price;
    if (prev === price) return;

    const prevNum = Number(prev.replace(/,/g, ''));
    const currNum = Number(price.replace(/,/g, ''));
    if (!Number.isFinite(prevNum) || !Number.isFinite(currNum)) return;
    if (prevNum === currNum) return;

    setFlash(currNum > prevNum ? 'up' : 'down');
    const timer = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(timer);
  }, [price]);

  return flash;
}

function decimalPlaces(formatted: string): number {
  const dot = formatted.indexOf('.');
  return dot === -1 ? 0 : formatted.length - dot - 1;
}

function formatWithPrecision(
  value: number,
  digits: number,
  grouping: boolean,
): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: grouping,
  }).format(value);
}

function formatSignedWithPrecision(
  value: number,
  digits: number,
  grouping: boolean,
): string {
  const sign = value >= 0 ? '+' : '−';
  return `${sign}${formatWithPrecision(Math.abs(value), digits, grouping)}`;
}
