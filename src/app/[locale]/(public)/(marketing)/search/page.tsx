import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import {
  readQuery,
  SearchPage,
  SearchResults,
  SearchResultsSkeleton,
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

  const query = readQuery(await searchParams);

  // The shell (heading, intro, search field) renders synchronously so
  // typing a new query never blanks the page. `key={query}` remounts the
  // suspense boundary on each search, so the skeleton reappears for the
  // results block alone.
  return (
    <SearchPage query={query}>
      <Suspense key={query} fallback={<SearchResultsSkeleton />}>
        <SearchResults locale={locale} query={query} />
      </Suspense>
    </SearchPage>
  );
}
