import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getFeaturedLessons,
  getGlossary,
  getLearnStats,
  getLessons,
  getTopics,
  LearnPage,
} from '@/features/learn';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'learn' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/learn',
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const topics = getTopics(locale);

  // Built here rather than in the component: this is the only place that can
  // see the lesson bodies, and the whole point is not to ship them.
  const searchIndex = topics.flatMap((topic) =>
    topic.lessons.map((lesson) => ({
      slug: lesson.slug,
      title: lesson.title,
      summary: lesson.summary,
      topic: topic.title,
      terms: (lesson.keyTerms ?? []).map((term) => term.term),
    })),
  );

  return (
    <LearnPage
      stats={getLearnStats()}
      startHere={getFeaturedLessons(locale)}
      allLessons={getLessons(locale)}
      topics={topics}
      searchIndex={searchIndex}
      glossary={getGlossary(locale)}
    />
  );
}
