'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * TradingView-style price flash: green when the last render's price was
 * lower than this one, red when it was higher, nothing when unchanged.
 * Fades back to neutral 600 ms after the tick — long enough for the eye
 * to register, short enough that a busy symbol does not strobe.
 *
 * Compares the *formatted* price string but parses numerically so a
 * "6,421.20" → "6,421.20" no-op is silent even under strict-mode's
 * double render. The parse strips `,` because the strings come from the
 * API's en-US-convention formatter (see `lib/format/quotePrice`).
 *
 * Shared by the ticker strip, the asset-page header and the sidebar
 * mini-chart — the three of them had drifted into three identical copies,
 * which is exactly the point where a shared hook earns its keep.
 */
export function usePriceFlash(price: string): 'up' | 'down' | null {
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
