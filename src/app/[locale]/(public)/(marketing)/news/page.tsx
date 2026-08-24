import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { MARKET_TIMESTAMP } from '@/features/markets';
import {
  getArticlePage,
  getFeaturedArticle,
  getMostRead,
  NewsPage,
  type CategoryFilter,
  type NewsCategory,
} from '@/features/news';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

const CATEGORIES: NewsCategory[] = [
  'macro',
  'stocks',
  'europe',
  'crypto',
  'commodities',
  'economy',
];

const isCategory = (value: string): value is NewsCategory =>
  (CATEGORIES as string[]).includes(value);

/** A repeated query parameter arrives as an array; take the first value. */
const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** Matches the API's poll interval — see `lib/api/news.ts`. */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/news',
    locale,
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

  const query = await searchParams;
  const raw = first(query.category);
  const category: CategoryFilter = raw && isCategory(raw) ? raw : 'all';
  // Filtering happens in the API. Filtering a page that has already been
  // truncated to twenty would leave a thin desk showing two stories when it
  // has fifty. Paging is client-side from here — see `ArticleFeed`.
  const [feed, lead, mostRead] = await Promise.all([
    getArticlePage(locale, category === 'all' ? {} : { category }),
    getFeaturedArticle(locale),
    getMostRead(locale),
  ]);
  const week = getCalendarWeek(locale);

  return (
    <NewsPage
      lead={lead}
      feed={feed}
      mostRead={mostRead}
      upcomingEvents={
        week.days
          .find((day) => day.date === week.selectedDate)
          ?.events.filter((event) => event.impact === 'high')
          .slice(0, 2) ?? []
      }
      category={category}
      updatedAt={MARKET_TIMESTAMP}
    />
  );
}
