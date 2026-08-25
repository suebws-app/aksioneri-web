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
 * Height of the header the phone sheet hangs from. Hardcoded because the sheet
 * is `fixed`, and measuring the header to place it would cost a layout effect
 * to save nothing — the header's padding is fixed too.
 */
const HEADER_HEIGHT = '71px';

/**
 * `trigger` is the desktop nav: a label that swaps for a field when tapped,
 * with results in a dropdown over the page.
 *
 * `mobile` is the phone header: an icon beside the menu button that drops a
 * full-width sheet under the header. Search sits outside the nav drawer
 * because it is the one thing a reader reaches for directly, and burying it
 * behind the menu costs a tap every time.
 */
export type NavSearchVariant = 'trigger' | 'mobile';

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
export function NavSearch({
  variant = 'trigger',
}: { variant?: NavSearchVariant } = {}) {
  const t = useTranslations('search');
  // The trigger reuses the nav's existing label rather than duplicating it.
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();

  const onPhone = variant === 'mobile';
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

  const loadIndex = () => {
    if (index.peek() || loading) return;

    setLoading(true);
    setFailed(false);
    index
      .load()
      .then(setEntries)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  /**
   * Opening is what pays for the index — loading it on the interaction that
   * asked for it keeps the cost off every other page view.
   */
  const openSearch = () => {
    setOpen(true);
    loadIndex();
  };

  const close = () => {
    setOpen(false);
    setQuery('');
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
    close();
    router.push(entry.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
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

  const field = (
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
          placeholder={onPhone ? t('placeholderShort') : t('placeholder')}
          autoComplete="off"
          role="combobox"
          aria-expanded={searching}
          aria-controls={listboxId}
          aria-autocomplete="list"
          className={cn(
            'border-line-strong bg-surface text-ink placeholder:text-ink-ghost focus:border-accent w-full rounded-sm border outline-none',
            onPhone
              ? 'px-3.5 py-2.5 text-[16px]'
              : 'px-3 py-1.5 text-[14px] sm:w-72',
          )}
        />
      </label>
    </form>
  );

  const resultList = searching ? (
    <div
      className={cn(
        'border-line bg-surface rounded-sm border',
        onPhone
          ? 'mt-3'
          : 'absolute right-0 z-20 mt-2 w-[calc(100vw-3rem)] max-w-96 shadow-lg sm:w-96',
      )}
    >
      {results.length === 0 ? (
        <p className="text-ink-faint px-4 py-3 text-[14px]">
          {loading
            ? t('loading')
            : failed
              ? t('failed')
              : t('empty', { query: query.trim() })}
        </p>
      ) : (
        <ul id={listboxId} role="listbox" className="divide-line-soft divide-y">
          {results.map((entry, entryIndex) => (
            <li key={`${entry.kind}-${entry.href}`} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={entryIndex === highlight}
                onMouseEnter={() => setHighlight(entryIndex)}
                onClick={() => go(entry)}
                className={cn(
                  'block w-full px-4 py-2.5 text-left',
                  entryIndex === highlight && 'bg-paper',
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
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      {open && !onPhone ? field : null}

      {onPhone ? (
        // Stays put and turns into a cross while the sheet is open: without
        // it the field appeared with no visible way back, and tapping outside
        // is not a control anyone can see.
        <button
          type="button"
          onClick={open ? close : openSearch}
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={open ? t('close') : tNav('search')}
          className="text-ink flex size-10 items-center justify-center"
        >
          {open ? <CloseIcon /> : <SearchIcon size={21} />}
        </button>
      ) : open ? null : (
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

      {open && onPhone ? (
        // A sheet under the sticky header rather than a field inside it: the
        // header row has no width to spare once the wordmark and the two
        // buttons are in place. `dvh` so the sheet ends above the browser
        // chrome on a phone rather than behind it.
        <div
          className="border-line bg-paper animate-panel-item-in fixed inset-x-0 z-40 overflow-y-auto border-b px-6 pt-3 pb-10 shadow-sm"
          style={{
            top: HEADER_HEIGHT,
            maxHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
          }}
        >
          {field}
          {resultList}
        </div>
      ) : null}

      {open && !onPhone ? resultList : null}
    </div>
  );
}

/**
 * 15px beside the desktop label, 21px as the phone's icon-only button — where
 * it has to carry the same weight as the menu icon next to it rather than sit
 * quietly in front of a word.
 */
function CloseIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M5 5l12 12" />
      <path d="M17 5L5 17" />
    </svg>
  );
}

function SearchIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={size > 16 ? 1.35 : 1.5}
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="7" cy="7" r="4.6" />
      <path d="M10.4 10.4L14 14" />
    </svg>
  );
}
