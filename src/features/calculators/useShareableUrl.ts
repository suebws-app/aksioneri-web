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
 * **History policy: nothing here ever pushes an entry.**
 *
 * An earlier version pushed one for "deliberate, nameable" changes — a
 * currency switch, a share. The reasoning was that a reader might want to get
 * back to the previous state. In use it does the opposite: flipping EUR/USD
 * four times to compare buries the page under four Back presses, and the
 * reader who wanted to leave is trapped stepping through states they were
 * never trying to bookmark.
 *
 * Changing an input is editing a view, not navigating. Back belongs to the
 * reader for leaving the page.
 */

/** Trailing debounce. Long enough to skip mid-word, short enough that a copied URL is current. */
const WRITE_DELAY_MS = 400;

export function useShareableUrl(params: Record<string, string>) {
  const serialised = new URLSearchParams(params).toString();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const write = useCallback((query: string) => {
    const url = query
      ? `${window.location.pathname}?${query}`
      : // No query at all when every value is its default, so the shared URL
        // and the canonical URL are the same string.
        window.location.pathname;

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

  /**
   * Write the pending change immediately instead of waiting out the debounce.
   *
   * For the moments where the URL has to be correct *now* — the reader is
   * about to copy it, or has just made a change they will read back from the
   * address bar. Still a replace: flushing early is about freshness, not
   * about creating something to navigate back to.
   */
  const commit = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    write(serialised);
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
