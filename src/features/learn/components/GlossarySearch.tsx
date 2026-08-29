'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { GlossaryTerm } from '../learnTypes';

export function GlossarySearch({ terms }: { terms: GlossaryTerm[] }) {
  const t = useTranslations('learn');
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState<string | null>(null);
  const targetSlug = useTargetSlug();
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetSlug) return;

    let cancelled = false;
    const align = () => {
      if (!cancelled) targetRef.current?.scrollIntoView({ block: 'start' });
    };

    const frame = requestAnimationFrame(align);
    void document.fonts?.ready.then(align);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [targetSlug]);

  const letters = useMemo(
    () =>
      [...new Set(terms.map((term) => firstLetter(term.term)))].sort((a, b) =>
        a.localeCompare(b, 'sq'),
      ),
    [terms],
  );

  const visible = useMemo(() => {
    const needle = normalise(query.trim());

    return terms.filter((term) => {
      if (letter && firstLetter(term.term) !== letter) return false;
      if (!needle) return true;

      return [term.term, term.definition, ...(term.aliases ?? [])].some(
        (text) => normalise(text).includes(needle),
      );
    });
  }, [terms, query, letter]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const term of visible) {
      const key = firstLetter(term.term);
      map.set(key, [...(map.get(key) ?? []), term]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, 'sq'));
  }, [visible]);

  return (
    <div className="page-container py-10">
      <div className="mb-7 flex flex-col gap-5">
        <label className="max-w-md">
          <span className="sr-only">{t('glossary.searchLabel')}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('glossary.searchPlaceholder')}
            className="border-line-strong bg-surface text-ink placeholder:text-ink-ghost focus:border-accent w-full rounded-sm border px-4 py-2.5 text-[15px] outline-none"
          />
        </label>

        <nav aria-label={t('glossary.letterFilter')}>
          <ul className="flex flex-wrap gap-1.5">
            <li>
              <button
                type="button"
                onClick={() => setLetter(null)}
                aria-pressed={letter === null}
                className={cn(
                  'rounded-sm px-2.5 py-1 font-mono text-[13px]',
                  letter === null
                    ? 'bg-accent text-ink-inverse'
                    : 'text-ink-subtle hover:text-ink',
                )}
              >
                {t('glossary.allLetters')}
              </button>
            </li>
            {letters.map((entry) => (
              <li key={entry}>
                <button
                  type="button"
                  onClick={() => setLetter(entry === letter ? null : entry)}
                  aria-pressed={entry === letter}
                  className={cn(
                    'rounded-sm px-2.5 py-1 font-mono text-[13px]',
                    entry === letter
                      ? 'bg-accent text-ink-inverse'
                      : 'text-ink-subtle hover:text-ink',
                  )}
                >
                  {entry}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {grouped.length === 0 ? (
        <p className="text-ink-faint py-10 text-center text-[15px]">
          {t('glossary.noResults')}
        </p>
      ) : (
        grouped.map(([key, entries]) => (
          <section key={key} className="mb-9">
            <h2 className="border-line text-ink-faint mb-4 border-b pb-2 font-mono text-[13px]">
              {key}
            </h2>
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {entries.map((term) => (
                <div
                  key={term.slug}
                  id={term.slug}
                  ref={term.slug === targetSlug ? targetRef : undefined}
                  data-targeted={term.slug === targetSlug ? 'true' : undefined}
                  className="glossary-entry scroll-mt-24 sm:scroll-mt-6"
                >
                  <dt className="text-ink mb-1 text-base font-medium">
                    {term.term}
                  </dt>
                  <dd className="text-ink-muted text-[14.5px] leading-relaxed">
                    {term.definition}
                    {term.lessonSlug ? (
                      <>
                        {' '}
                        <Link
                          href={`/learn/${term.lessonSlug}`}
                          className="text-accent hover:underline"
                        >
                          {t('glossary.readLesson')}
                        </Link>
                      </>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))
      )}
    </div>
  );
}

const normalise = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const firstLetter = (term: string): string =>
  term.charAt(0).toLocaleUpperCase('sq');

const subscribeToHash = (onChange: () => void): (() => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

function useTargetSlug(): string | null {
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => '',
  );

  return hash ? decodeURIComponent(hash.slice(1)) : null;
}
