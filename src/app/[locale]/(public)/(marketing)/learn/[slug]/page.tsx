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
import { getQuote } from '@/features/markets';
import { getArticleBySlug } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getLessonSlugs().map((slug) => ({ locale, slug })),
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

  return (
    <LessonPage
      lesson={lesson}
      upNext={upNext}
      relatedQuotes={(lesson.relatedSymbols ?? [])
        .map((symbol) => getQuote(locale, symbol))
        .filter((quote) => quote !== null)}
      relatedArticle={
        lesson.relatedArticleSlug
          ? getArticleBySlug(locale, lesson.relatedArticleSlug)
          : null
      }
    />
  );
}
