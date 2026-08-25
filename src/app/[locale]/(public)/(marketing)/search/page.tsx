import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { searchArticles } from '@/features/news';
import {
  articleEntry,
  buildSearchIndex,
  rankResults,
  readQuery,
  SearchPage,
} from '@/features/search';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

/** Matches the wire's poll interval — the index includes recent stories. */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'search' });

  // Search result pages are never worth indexing: they are unbounded (one URL
  // per query), thin, and duplicate the pages they link to. Listed in
  // `robots.ts` as well — noIndex alone still spends crawl budget.
  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/search',
    locale,
    noIndex: true,
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = readQuery(await searchParams);

  // Nothing typed yet: render the empty form without building an index or
  // touching the API.
  if (query.length === 0) {
    return <SearchPage query="" results={[]} />;
  }

  // Two sources, one ranking. The index holds the site's own content plus the
  // newest stories; the API search reaches the rest of the archive, which is
  // the only way an older story can be found at all. Merging them before
  // ranking keeps one order rather than two lists glued together.
  const [index, wire] = await Promise.all([
    buildSearchIndex(locale),
    searchArticles(locale, query),
  ]);

  const known = new Set(index.map((entry) => entry.href));
  const fromWire = wire
    .flatMap((article) => articleEntry(article) ?? [])
    .filter((entry) => !known.has(entry.href));

  const results = rankResults([...index, ...fromWire], query);

  return <SearchPage query={query} results={results} />;
}
