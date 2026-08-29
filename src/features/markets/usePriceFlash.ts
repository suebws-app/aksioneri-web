'use client';

import { useEffect, useRef, useState } from 'react';

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
