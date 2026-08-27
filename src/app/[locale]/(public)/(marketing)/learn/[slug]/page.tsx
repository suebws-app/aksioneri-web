import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  getLessonBySlug,
  getLessons,
  getLessonSlugs,
  getTopics,
  LessonPage,
} from '@/features/learn';
import { getGlossary } from '@/features/learn/learnData';
import { findArticleForLesson } from '@/features/learn/matchNews';
import { getArticles } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import { getQuotes } from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbSchema,
  learningResourceSchema,
  safeJsonLd,
} from '@/lib/seo/schemas';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getLessonSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const lesson = getLessonBySlug(locale, slug);

  // Thrown here rather than only in the page body: `generateMetadata`
  // blocks the response because no loading boundary wraps this segment (the
  // index's skeleton lives in its own `(index)` group), so
  // the response carries a real 404 status instead of a 200 whose body
  // later swaps to the not-found UI.
  if (!lesson) notFound();

  return buildMetadata({
    title: lesson.title,
    description: lesson.summary,
    path: `/learn/${lesson.slug}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  const lesson = getLessonBySlug(locale, slug);
  if (!lesson) notFound();

  // Lessons named in `upNextSlugs` may live in a topic rather than the top-level
  // list, so both sources are searched.
  const everyLesson = [
    ...getLessons(locale),
    ...getTopics(locale).flatMap((topic) => topic.lessons),
  ];

  const upNext = (lesson.upNextSlugs ?? [])
    .map((next) => everyLesson.find((entry) => entry.slug === next))
    .filter((entry) => entry !== undefined);

  // Matched against the live wire rather than looked up by a stored slug.
  // Article slugs are generated per feed item and rotate hourly, so the nine
  // slugs the lessons used to carry never resolved even once.
  const [articles, quotes] = await Promise.all([
    getArticles(locale),
    getQuotes(),
  ]);
  const relatedArticle = findArticleForLesson(
    lesson,
    articles,
    getGlossary(locale),
  );

  const relatedSymbols = new Set(lesson.relatedSymbols ?? []);

  const schema = learningResourceSchema(locale, {
    title: lesson.title,
    description: lesson.summary,
    slug: lesson.slug,
    readingMinutes: lesson.readingMinutes,
    level: lesson.level,
    ...(lesson.track ? { topic: lesson.track.topicTitle } : {}),
  });

  // Mirrors the visible trail `LessonPage` renders: Learn → topic → lesson
  // number. The topic and lesson crumbs are labels, not links, so they carry
  // no URL here either.
  const t = await getTranslations({ locale, namespace: 'learn' });
  const breadcrumb = breadcrumbSchema(locale, [
    { name: t('heading'), path: '/learn' },
    ...(lesson.track
      ? [
          { name: lesson.track.topicTitle },
          { name: t('lessonNumber', { number: lesson.track.position }) },
        ]
      : []),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Built from constants and our own content, never user input.
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }}
      />
      <LessonPage
        lesson={lesson}
        upNext={upNext}
        relatedQuotes={quotes.filter((quote) =>
          relatedSymbols.has(quote.symbol),
        )}
        relatedArticle={relatedArticle}
      />
    </>
  );
}
