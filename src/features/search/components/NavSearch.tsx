'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { getPathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { createIndexLoader } from '../indexCache';
import { MIN_QUERY_LENGTH, rankResults } from '../rankResults';
import { loadSearchIndex } from '../searchAction';
import { QUERY_PARAM } from '../searchParams';
import type { SearchEntry } from '../searchTypes';

/** Results the dropdown shows before the reader is better off narrowing. */
const VISIBLE_RESULTS = 7;

/**
 * The index, kept for the life of the tab.
 *
 * Module scope rather than component state: the header remounts on every
 * navigation, and re-fetching a few hundred entries each time the reader
 * reopens search would undo the point of loading it lazily.
 */
const index = createIndexLoader(loadSearchIndex);

/**
 * Search in the nav bar itself.
 *
 * Opens in place instead of navigating: the reader stays on the page they were
 * reading, and results appear as they type. The `/search` page still exists
 * and this still renders a real GET form pointed at it, which is what runs
 * before hydration and when JavaScript is off — with JavaScript, submitting
 * opens the top result rather than leaving the page.
 */
export function NavSearch() {
  const t = useTranslations('search');
  // The trigger reuses the nav's existing label rather than duplicating it.
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  // A previous mount on another page may already have loaded it.
  const [entries, setEntries] = useState<SearchEntry[]>(
    () => index.peek() ?? [],
  );
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  /**
   * Opening is what pays for the index — loading it here rather than in an
   * effect keeps the fetch tied to the interaction that asked for it.
   */
  const openSearch = () => {
    setOpen(true);
    if (index.peek()) return;

    setLoading(true);
    setFailed(false);
    index
      .load()
      .then(setEntries)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const results = useMemo(
    () => rankResults(entries, query, { limit: VISIBLE_RESULTS }),
    [entries, query],
  );

  const searching = query.trim().length >= MIN_QUERY_LENGTH;

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    setOpen(false);
    setQuery('');
    router.push(entry.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlight((current) => (current + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlight(
        (current) => (current - 1 + results.length) % results.length,
      );
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {open ? (
        <form
          // Without JavaScript this is an ordinary GET form and `/search`
          // renders the same results as a page.
          action={getPathname({ href: '/search', locale })}
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            go(results[highlight]);
          }}
          onKeyDown={onKeyDown}
        >
          <label>
            <span className="sr-only">{t('label')}</span>
            <input
              ref={inputRef}
              type="search"
              name={QUERY_PARAM}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                // New query, new list — the old highlight means nothing.
                setHighlight(0);
              }}
              placeholder={t('placeholder')}
              autoComplete="off"
              role="combobox"
              aria-expanded={searching}
              aria-controls={listboxId}
              aria-autocomplete="list"
              className="border-line-strong bg-surface text-ink placeholder:text-ink-ghost focus:border-accent w-56 rounded-sm border px-3 py-1.5 text-[14px] outline-none sm:w-72"
            />
          </label>
        </form>
      ) : (
        <button
          type="button"
          onClick={openSearch}
          aria-expanded={false}
          className="text-ink-subtle hover:text-accent flex items-center gap-[7px]"
        >
          <SearchIcon />
          {tNav('search')}
        </button>
      )}

      {open && searching ? (
        <div className="border-line bg-surface absolute right-0 z-20 mt-2 w-80 rounded-sm border shadow-lg sm:w-96">
          {results.length === 0 ? (
            <p className="text-ink-faint px-4 py-3 text-[14px]">
              {loading
                ? t('loading')
                : failed
                  ? t('failed')
                  : t('empty', { query: query.trim() })}
            </p>
          ) : (
            <ul
              id={listboxId}
              role="listbox"
              className="divide-line-soft divide-y"
            >
              {results.map((entry, index) => (
                <li key={`${entry.kind}-${entry.href}`} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === highlight}
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => go(entry)}
                    className={cn(
                      'block w-full px-4 py-2.5 text-left',
                      index === highlight && 'bg-paper',
                    )}
                  >
                    <span className="text-ink-faint block text-[10.5px] font-semibold tracking-[0.12em] uppercase">
                      {t(`kinds.${entry.kind}`)}
                    </span>
                    <span className="text-ink mt-0.5 block text-[14.5px]">
                      {entry.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="7" cy="7" r="4.6" />
      <path d="M10.4 10.4L14 14" />
    </svg>
  );
}
