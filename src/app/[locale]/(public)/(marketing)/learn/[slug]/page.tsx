import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
import { learningResourceSchema } from '@/lib/seo/schemas';

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
  const t = await getTranslations({ locale, namespace: 'learn' });

  if (!lesson) {
    return buildMetadata({
      title: t('notFoundTitle'),
      description: t('metaDescription'),
      path: `/learn/${slug}`,
      locale,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: lesson.title,
    description: lesson.summary,
    path: `/learn/${lesson.slug}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

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

  return (
    <>
      <script
        type="application/ld+json"
        // Built from constants and our own content, never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
