'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Keeps the address bar in step with the calculator, without re-rendering.
 *
 * **Written with `history.replaceState`, not the router.** next-intl's
 * `useRouter().replace()` is the obvious choice and the wrong one here: it
 * triggers an RSC round-trip and re-renders the whole server tree. At one
 * call per keystroke that is a request storm and a visibly janky field.
 * `replaceState` touches the URL and nothing else.
 *
 * The cost, stated plainly: `useSearchParams()` will not observe these
 * writes. Nothing reads it — the client island owns the input state, and the
 * server's `searchParams` only ever seeds the first render. If something
 * later needs to react to the URL, it must read it here, not there.
 *
 * History policy:
 *
 * - Typing and dragging replace the entry. Forty keystrokes must not become
 *   forty back-button presses; Back should leave the calculator.
 * - A deliberate, nameable change — switching currency, picking a scenario,
 *   pressing Share — pushes one entry, because a reader may well want to get
 *   back to it.
 */

/** Trailing debounce. Long enough to skip mid-word, short enough that a copied URL is current. */
const WRITE_DELAY_MS = 400;

export function useShareableUrl(params: Record<string, string>) {
  const serialised = new URLSearchParams(params).toString();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const write = useCallback((query: string, mode: 'replace' | 'push') => {
    const url = query
      ? `${window.location.pathname}?${query}`
      : // No query at all when every value is its default, so the shared URL
        // and the canonical URL are the same string.
        window.location.pathname;

    if (mode === 'push') {
      window.history.pushState(null, '', url);
    } else {
      window.history.replaceState(null, '', url);
    }
  }, []);

  useEffect(() => {
    timer.current = setTimeout(() => {
      write(serialised, 'replace');
    }, WRITE_DELAY_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [serialised, write]);

  /** Flush immediately and add a history entry. For Share and scenario changes. */
  const commit = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    write(serialised, 'push');
  }, [serialised, write]);

  /** The absolute URL as it stands, for the copy-link button. */
  const currentUrl = useCallback(
    () =>
      serialised
        ? `${window.location.origin}${window.location.pathname}?${serialised}`
        : `${window.location.origin}${window.location.pathname}`,
    [serialised],
  );

  return { commit, currentUrl };
}
