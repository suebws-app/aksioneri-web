'use server';

import { searchArticles } from '@/features/news';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { articleEntry } from './articleEntry';
import { buildSearchIndex } from './buildSearchIndex';
import { MIN_QUERY_LENGTH } from './rankResults';
import type { SearchEntry } from './searchTypes';

const SUBTITLE_LIMIT = 120;

const trim = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  return value.length > SUBTITLE_LIMIT
    ? `${value.slice(0, SUBTITLE_LIMIT).trimEnd()}…`
    : value;
};

export async function loadSearchIndex(
  requested: Locale,
): Promise<SearchEntry[]> {
  const locale = isLocale(requested) ? requested : defaultLocale;
  const entries = await buildSearchIndex(locale);

  return entries.map((entry) => ({
    ...entry,
    subtitle: trim(entry.subtitle),
    context: trim(entry.context),
  }));
}

export async function searchWire(
  requested: Locale,
  query: string,
): Promise<SearchEntry[]> {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LENGTH) return [];

  const locale = isLocale(requested) ? requested : defaultLocale;
  const articles = await searchArticles(locale, trimmed);

  return articles.flatMap((article) => {
    const entry = articleEntry(article);
    return entry ? [{ ...entry, subtitle: trim(entry.subtitle) }] : [];
  });
}
