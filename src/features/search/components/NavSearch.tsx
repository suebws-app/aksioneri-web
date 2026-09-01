'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { getPathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { createIndexLoader } from '../indexCache';
import { MIN_QUERY_LENGTH, rankResults } from '../rankResults';
import { loadSearchIndex, searchWire } from '../searchAction';
import { QUERY_PARAM } from '../searchParams';
import type { SearchEntry } from '../searchTypes';

const VISIBLE_RESULTS = 7;

const WIRE_DEBOUNCE_MS = 280;

const HEADER_HEIGHT = '71px';

export type NavSearchVariant = 'trigger' | 'mobile';

const index = createIndexLoader(loadSearchIndex);

export function NavSearch({
  variant = 'trigger',
}: { variant?: NavSearchVariant } = {}) {
  const t = useTranslations('search');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();

  const onPhone = variant === 'mobile';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<SearchEntry[]>(
    () => index.peek() ?? [],
  );
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [wire, setWire] = useState<SearchEntry[]>([]);
  const [wireForQuery, setWireForQuery] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const loadIndex = () => {
    if (index.peek() || loading) return;

    setLoading(true);
    setFailed(false);
    index
      .load(locale)
      .then(setEntries)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  const openSearch = () => {
    setOpen(true);
    loadIndex();
  };

  const close = () => {
    setOpen(false);
    setQuery('');
    setWire([]);
    setWireForQuery('');
  };

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const searching = query.trim().length >= MIN_QUERY_LENGTH;

  useEffect(() => {
    if (!open || !searching) return;

    let stale = false;
    const trimmedQuery = query.trim();
    const timer = setTimeout(() => {
      void searchWire(locale, trimmedQuery)
        .then((found) => {
          if (!stale) {
            setWire(found);
            setWireForQuery(trimmedQuery);
          }
        })
        .catch(() => {});
    }, WIRE_DEBOUNCE_MS);

    return () => {
      stale = true;
      clearTimeout(timer);
    };
  }, [locale, open, query, searching]);

  const results = useMemo(() => {
    const known = new Set(entries.map((entry) => entry.href));
    const extra = wire.filter((entry) => !known.has(entry.href));

    return rankResults([...entries, ...extra], query, {
      limit: VISIBLE_RESULTS,
    });
  }, [entries, wire, query]);

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
            setHighlight(0);
          }}
          placeholder={onPhone ? t('placeholderShort') : t('placeholder')}
          autoComplete="off"
          role="combobox"
          aria-expanded={searching}
          aria-controls={listboxId}
          aria-autocomplete="list"
          className={cn(
            'text-ink placeholder:text-ink-ghost w-full bg-transparent outline-none',
            onPhone
              ? 'border-line-strong focus:border-accent rounded-sm border px-3.5 py-2.5 text-[16px]'
              : 'border-line-strong focus:border-accent border-b px-1 py-1.5 text-[14px] sm:w-72',
          )}
        />
      </label>
    </form>
  );

  const wireLoading = searching && wireForQuery !== query.trim();
  const busy = loading || wireLoading;

  const resultList = searching ? (
    <div
      className={cn(
        'border-line bg-surface rounded-sm border',
        onPhone
          ? 'mt-3'
          : 'absolute right-0 z-20 mt-2 w-[calc(100vw-3rem)] max-w-96 shadow-lg sm:w-96',
      )}
      aria-busy={busy}
    >
      {busy ? (
        <div className="border-line-soft text-ink-faint flex items-center gap-2 border-b px-4 py-2 text-[11.5px]">
          <Spinner />
          <span>{t('searching')}</span>
        </div>
      ) : null}

      {results.length > 0 ? (
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
                {entry.subtitle ? (
                  <span className="text-ink-faint mt-0.5 block truncate text-[12px]">
                    {entry.subtitle}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : !busy ? (
        <p className="text-ink-faint px-4 py-3 text-[14px]">
          {failed ? t('failed') : t('empty', { query: query.trim() })}
        </p>
      ) : null}
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      {!onPhone ? (
        <div
          className={cn(
            'relative h-9 overflow-hidden transition-[width] duration-200 ease-out',
            open ? 'w-72' : 'w-24',
          )}
        >
          <button
            type="button"
            onClick={openSearch}
            aria-expanded={open}
            className={cn(
              'text-ink-subtle hover:text-accent absolute inset-0 flex items-center justify-end gap-1.75',
              'transition-opacity duration-150 ease-out',
              open ? 'pointer-events-none opacity-0' : 'opacity-100',
            )}
          >
            <SearchIcon />
            {tNav('search')}
          </button>
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-200 ease-out',
              open ? 'opacity-100 delay-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={!open}
            inert={!open || undefined}
          >
            {field}
          </div>
        </div>
      ) : (
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
      )}

      {open && onPhone ? (
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

function Spinner({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="42 15"
        opacity="0.65"
      />
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
