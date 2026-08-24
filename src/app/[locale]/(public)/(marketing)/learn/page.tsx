import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getFeaturedLessons,
  getGlossary,
  getLearnStats,
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

  return (
    <LearnPage
      stats={getLearnStats()}
      startHere={getFeaturedLessons(locale)}
      topics={getTopics(locale)}
      glossary={getGlossary(locale)}
    />
  );
}
