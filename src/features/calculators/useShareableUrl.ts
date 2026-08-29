'use client';

import { useCallback, useEffect, useRef } from 'react';

const WRITE_DELAY_MS = 400;

export function useShareableUrl(params: Record<string, string>) {
  const serialised = new URLSearchParams(params).toString();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const write = useCallback((query: string) => {
    const url = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState(null, '', url);
  }, []);

  useEffect(() => {
    timer.current = setTimeout(() => {
      write(serialised);
    }, WRITE_DELAY_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [serialised, write]);

  const commit = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    write(serialised);
  }, [serialised, write]);

  return { commit };
}
