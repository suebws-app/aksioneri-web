import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  detailFromEvent,
  EventPage,
  getCalendarSlugs,
  getCalendarWeek,
  getEventDetail,
  getSeedEventDetail,
} from '@/features/calendar';
import { getLessonBySlug, getTopics } from '@/features/learn';
import { getQuote } from '@/features/markets';
import { findArticlesMentioning } from '@/features/learn/matchNews';
import { getArticles } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
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

  // Editorial `EventDetail` (hand-authored copy for known slugs) takes
  // precedence; the live wire fills the gap for anything new.
  const seedDetail = getSeedEventDetail(locale, slug);
  const row = seedDetail ? null : await getEventDetail(locale, slug);

  if (!seedDetail && !row) {
    return buildMetadata({
      title: t('event.notFoundTitle'),
      description: t('metaDescription'),
      path: `/calendar/${slug}`,
      locale,
      noIndex: true,
    });
  }

  const title = seedDetail?.title ?? row?.title ?? '';

  return buildMetadata({
    title,
    // A row without an editorial explainer has no summary of its own; the
    // page describes what the reader will find instead of shipping an
    // empty description.
    description:
      seedDetail?.summary || t('event.fallbackDescription', { title }),
    path: `/calendar/${slug}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const week = await getCalendarWeek(locale);
  const everyEvent = week.days.flatMap((day) => day.events);

  // Always fetch the by-slug row — that endpoint is the only one that
  // carries the Kosovar-Albanian `explanation` payload (the week endpoint
  // omits it to keep list sizes down). React `cache()` dedupes with the
  // metadata pass so this is one round trip per render, not two.
  const row =
    (await getEventDetail(locale, slug)) ??
    everyEvent.find((event) => event.slug === slug);

  const detail =
    getSeedEventDetail(locale, slug) ??
    (row
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
