import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getLessonBySlug } from '@/features/learn/learnData';
import { getQuote } from '@/features/markets';
import {
  ArticlePage,
  getArticleBySlug,
  getArticles,
  getArticleSlugs,
  getMostRead,
} from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

/** Pre-renders every story in every locale rather than on first request. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getArticleSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  const t = await getTranslations({ locale, namespace: 'news' });

  // A missing story still needs valid metadata — the page itself 404s.
  if (!article) {
    return buildMetadata({
      title: t('notFoundTitle'),
      description: t('metaDescription'),
      path: `/news/${slug}`,
      locale,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${article.slug}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const week = getCalendarWeek(locale);

  return (
    <ArticlePage
      article={article}
      related={getArticles(locale)
        .filter((entry) => entry.id !== article.id)
        .slice(0, 3)}
      mostRead={getMostRead(locale)}
      mentioned={(article.mentionedSymbols ?? [])
        .map((symbol) => getQuote(locale, symbol))
        .filter((quote) => quote !== null)}
      nextRelease={
        article.relatedEventSlug
          ? (week.days
              .flatMap((day) => day.events)
              .find((event) => event.slug === article.relatedEventSlug) ?? null)
          : null
      }
      relatedLesson={
        article.relatedLessonSlug
          ? getLessonBySlug(locale, article.relatedLessonSlug)
          : null
      }
    />
  );
}
