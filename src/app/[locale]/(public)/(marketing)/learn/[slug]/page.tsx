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
import {
  getGlossary,
  getLessonSlugAlternates,
} from '@/features/learn/learnData';
import { findArticleForLesson } from '@/features/learn/matchNews';
import { getArticles } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import { redirect } from '@/i18n/navigation';
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

function redirectIfOtherLocaleSlug(locale: Locale, slug: string): void {
  for (const other of locales) {
    if (other === locale) continue;
    const target = getLessonSlugAlternates(other, slug)?.[locale];
    if (target && target !== slug) {
      redirect({
        href: { pathname: '/learn/[slug]', params: { slug: target } },
        locale,
      });
    }
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const lesson = getLessonBySlug(locale, slug);

  if (!lesson) {
    redirectIfOtherLocaleSlug(locale, slug);
    notFound();
  }

  const alternates = getLessonSlugAlternates(locale, slug);

  return buildMetadata({
    title: lesson.title,
    description: lesson.summary,
    path: `/learn/${lesson.slug}`,
    locale,
    ...(alternates
      ? {
          localizedPaths: Object.fromEntries(
            Object.entries(alternates).map(([entry, localizedSlug]) => [
              entry,
              `/learn/${localizedSlug}`,
            ]),
          ),
        }
      : {}),
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  const lesson = getLessonBySlug(locale, slug);
  if (!lesson) {
    redirectIfOtherLocaleSlug(locale, slug);
    notFound();
  }

  const everyLesson = [
    ...getLessons(locale),
    ...getTopics(locale).flatMap((topic) => topic.lessons),
  ];

  const upNext = (lesson.upNextSlugs ?? [])
    .map((next) => everyLesson.find((entry) => entry.slug === next))
    .filter((entry) => entry !== undefined);

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
