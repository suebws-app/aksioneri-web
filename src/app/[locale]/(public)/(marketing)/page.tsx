import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getFeaturedLessons } from '@/features/learn/learnData';
import { MARKET_TIMESTAMP, MarketsPage } from '@/features/markets';
import { getArticles, getFeaturedArticle } from '@/features/news';
import type { Locale } from '@/i18n/config';
import { getQuotes } from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';

/** Matches the API's poll interval — see `lib/api/news.ts`. */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/',
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [articles, featured, quotes] = await Promise.all([
    getArticles(locale),
    getFeaturedArticle(locale),
    getQuotes(),
  ]);
  const week = getCalendarWeek(locale);

  // The lead story appears once, at the top; the sidebar and the news list take
  // the rest so no headline is printed twice on the page.
  const rest = articles.filter((article) => article.id !== featured?.id);

  return (
    <MarketsPage
      quotes={quotes}
      featured={featured}
      sidebarStories={rest.slice(0, 3)}
      latestNews={rest.slice(3, 8)}
      upcomingEvents={
        week.days
          .find((day) => day.date === week.selectedDate)
          ?.events.filter((event) => event.impact === 'high')
          .slice(0, 2) ?? []
      }
      lessons={getFeaturedLessons(locale)}
      updatedAt={MARKET_TIMESTAMP}
    />
  );
}
