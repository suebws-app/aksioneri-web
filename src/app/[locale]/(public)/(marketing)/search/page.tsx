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

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'search' });

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

  return (
    <SearchPage query={query}>
      <Suspense key={query} fallback={<SearchResultsSkeleton />}>
        <SearchResults locale={locale} query={query} />
      </Suspense>
    </SearchPage>
  );
}
