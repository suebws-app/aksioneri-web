import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  detailFromEvent,
  EventPage,
  getCalendarSlugs,
  getCalendarWeek,
  getEventDetail,
} from '@/features/calendar';
import { getLessonBySlug, getTopics } from '@/features/learn';
import { findArticlesMentioning } from '@/features/learn/matchNews';
import { getArticles } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import { getQuotes } from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

/** Region codes to full names, for the breadcrumb. */
const REGION_KEY = {
  US: 'unitedStates',
  EU: 'euroArea',
  DE: 'germany',
  UK: 'unitedKingdom',
  JP: 'japan',
} as const;

/**
 * Since the calendar list is now dynamic (BiQuote sync fills the table),
 * `generateStaticParams` pre-renders slugs known at build time from a
 * single API call. Unknown slugs render on-demand — Next.js keeps
 * `dynamicParams: true` by default.
 */
export async function generateStaticParams() {
  const entries = await getCalendarSlugs();
  const slugs = entries.map((e) => e.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'calendar' });

  const row = await getEventDetail(locale, slug);

  if (!row) {
    return buildMetadata({
      title: t('event.notFoundTitle'),
      description: t('metaDescription'),
      path: `/calendar/${slug}`,
      locale,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: row.title,
    description:
      row.explanation?.summary ||
      t('event.fallbackDescription', { title: row.title }),
    path: `/calendar/${slug}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const week = await getCalendarWeek(locale);
  const everyEvent = week.days.flatMap((day) => day.events);

  // The by-slug endpoint is the only one that carries the Kosovar-Albanian
  // `explanation` payload (the week endpoint omits it to keep list sizes
  // down). React `cache()` dedupes with the metadata pass so this is one
  // round trip per render, not two.
  const row =
    (await getEventDetail(locale, slug)) ??
    everyEvent.find((event) => event.slug === slug);

  const detail = row
    ? detailFromEvent(
        row,
        t(`regionNames.${REGION_KEY[row.region]}`),
        t(`impact.${row.impact}`),
        // Row time is `HH:mm` in the reader's timezone; the seed used
        // `${todayDate}T${time}:00Z`. Kept identical so the countdown
        // and dateline render exactly as before.
        `${week.todayDate || new Date().toISOString().slice(0, 10)}T${row.time}:00Z`,
        {
          whyItMatters: t('event.whyItMatters'),
          howToRead: t('event.howToRead'),
        },
      )
    : null;

  if (!detail) notFound();

  const everyLesson = getTopics(locale).flatMap((topic) => topic.lessons);

  // Matched on what the release is called rather than the stored
  // `articleSlugs`, which never resolved against the live wire.
  const [quotes, articles] = await Promise.all([
    getQuotes(),
    getArticles(locale),
  ]);
  const relatedArticles = findArticlesMentioning(
    [detail.shortName, detail.title],
    articles,
  );

  const reactingSymbols = new Set(detail.reactingSymbols ?? []);

  return (
    <EventPage
      event={detail}
      alsoThisWeek={everyEvent
        .filter((event) => event.slug !== slug)
        .slice(0, 3)}
      reactingQuotes={quotes.filter((quote) =>
        reactingSymbols.has(quote.symbol),
      )}
      lessons={(detail.lessonSlugs ?? [])
        .map(
          (lessonSlug) =>
            getLessonBySlug(locale, lessonSlug) ??
            everyLesson.find((lesson) => lesson.slug === lessonSlug),
        )
        .filter((lesson) => lesson !== undefined)}
      articles={relatedArticles}
    />
  );
}
