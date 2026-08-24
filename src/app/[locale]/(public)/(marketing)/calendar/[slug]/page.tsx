import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  detailFromEvent,
  EventPage,
  getCalendarWeek,
  getEventDetail,
} from '@/features/calendar';
import { getLessonBySlug, getTopics } from '@/features/learn';
import { getQuote } from '@/features/markets';
import { findArticlesMentioning } from '@/features/learn/matchNews';
import { getArticles } from '@/features/news';
import { locales, type Locale, defaultLocale } from '@/i18n/config';
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

export function generateStaticParams() {
  const slugs = getCalendarWeek(defaultLocale)
    .days.flatMap((day) => day.events)
    .map((event) => event.slug);

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'calendar' });

  const detail = getEventDetail(locale, slug);
  const row = getCalendarWeek(locale)
    .days.flatMap((day) => day.events)
    .find((event) => event.slug === slug);

  if (!detail && !row) {
    return buildMetadata({
      title: t('event.notFoundTitle'),
      description: t('metaDescription'),
      path: `/calendar/${slug}`,
      locale,
      noIndex: true,
    });
  }

  const title = detail?.title ?? row?.title ?? '';

  return buildMetadata({
    title,
    // A row without an explainer has no summary of its own; the page describes
    // what the reader will find instead of shipping an empty description.
    description: detail?.summary || t('event.fallbackDescription', { title }),
    path: `/calendar/${slug}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const week = getCalendarWeek(locale);
  const everyEvent = week.days.flatMap((day) => day.events);
  const row = everyEvent.find((event) => event.slug === slug);

  const detail =
    getEventDetail(locale, slug) ??
    (row
      ? detailFromEvent(
          row,
          t(`regionNames.${REGION_KEY[row.region]}`),
          t(`impact.${row.impact}`),
          `${week.todayDate}T${row.time}:00Z`,
        )
      : null);

  if (!detail) notFound();

  const everyLesson = getTopics(locale).flatMap((topic) => topic.lessons);

  // Matched on what the release is called rather than the stored
  // `articleSlugs`, which never resolved against the live wire.
  const relatedArticles = findArticlesMentioning(
    [detail.shortName, detail.title],
    await getArticles(locale),
  );

  return (
    <EventPage
      event={detail}
      alsoThisWeek={everyEvent
        .filter((event) => event.slug !== slug)
        .slice(0, 3)}
      reactingQuotes={(detail.reactingSymbols ?? [])
        .map((symbol) => getQuote(locale, symbol))
        .filter((quote) => quote !== null)}
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
