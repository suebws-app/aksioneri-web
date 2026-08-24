import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getGlossary, getLessons } from '@/features/learn/learnData';
import { findLessonForArticle } from '@/features/learn/matchNews';
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

/**
 * Stories published after the build still have to render, and the wire gains
 * new ones every minute, so the prerendered set is a head start rather than
 * the whole site.
 */
export const dynamicParams = true;

/** Matches the API's poll interval — see `lib/api/news.ts`. */
export const revalidate = 60;

/** Pre-renders every story in every locale rather than on first request. */
export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(locale, slug);
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

  const article = await getArticleBySlug(locale, slug);
  if (!article) notFound();

  const week = getCalendarWeek(locale);
  const [related, mostRead] = await Promise.all([
    getArticles(locale),
    getMostRead(locale),
  ]);

  // Matched over the glossary vocabulary the article actually uses. The
  // `relatedLessonSlug` field this replaces was declared on the DTO and
  // consumed here, but nothing ever set it — the wire is RSS.
  const relatedLesson = findLessonForArticle(
    article,
    getGlossary(locale),
    getLessons(locale),
  );

  return (
    <ArticlePage
      article={article}
      related={related.filter((entry) => entry.id !== article.id).slice(0, 3)}
      mostRead={mostRead}
      glossary={getGlossary(locale)}
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
      relatedLesson={relatedLesson}
    />
  );
}
