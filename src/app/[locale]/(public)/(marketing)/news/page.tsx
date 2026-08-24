import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getTickerQuotes, MARKET_TIMESTAMP } from '@/features/markets';
import {
  getArticles,
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
  const raw = Array.isArray(query.category)
    ? query.category[0]
    : query.category;
  const category: CategoryFilter = raw && isCategory(raw) ? raw : 'all';

  const all = getArticles(locale);
  const lead = getFeaturedArticle(locale);
  const week = getCalendarWeek(locale);

  // The lead is printed in full at the top, so it is excluded from the list
  // below to avoid running the same headline twice on one page.
  const rest = all.filter(
    (article) =>
      article.id !== lead.id &&
      (category === 'all' || article.category === category),
  );

  return (
    <NewsPage
      tickerQuotes={getTickerQuotes(locale)}
      lead={lead}
      articles={rest}
      mostRead={getMostRead(locale)}
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
