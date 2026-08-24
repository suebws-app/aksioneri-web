'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * Search across lessons.
 *
 * Deliberately fed a trimmed index rather than the lessons themselves: at 48
 * full-length lessons the bodies run to tens of thousands of words, and
 * shipping them to every visitor to support a search box would be a poor
 * trade. Title, summary, topic and key terms are enough to find a lesson.
 */
export interface LessonSearchEntry {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  /** Key term names, so searching "yield" finds the bonds lesson. */
  terms: string[];
}

export function LessonSearch({ entries }: { entries: LessonSearchEntry[] }) {
  const t = useTranslations('learn');
  const [query, setQuery] = useState('');

  const needle = normalise(query.trim());

  const matches = useMemo(() => {
    if (needle.length < 2) return [];

    return entries
      .filter((entry) =>
        [entry.title, entry.summary, entry.topic, ...entry.terms].some((text) =>
          normalise(text).includes(needle),
        ),
      )
      .slice(0, 8);
  }, [entries, needle]);

  return (
    <div className="relative mb-8 max-w-md">
      <label>
        <span className="sr-only">{t('search.label')}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          className="border-line-strong bg-surface text-ink placeholder:text-ink-ghost focus:border-accent w-full rounded-sm border px-4 py-2.5 text-[15px] outline-none"
        />
      </label>

      {needle.length >= 2 ? (
        <div className="mt-3">
          {matches.length === 0 ? (
            <p className="text-ink-faint text-[14px]">
              {t('search.noResults')}
            </p>
          ) : (
            <ul className="border-line bg-surface divide-line-soft divide-y rounded-sm border">
              {matches.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/learn/${entry.slug}`}
                    className="hover:bg-paper block px-4 py-3"
                  >
                    <span className="text-ink block text-[15px]">
                      {entry.title}
                    </span>
                    <span className="text-ink-faint block text-[13px]">
                      {entry.topic}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** Diacritic-insensitive, so "perqindje" finds "përqindje". */
const normalise = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
