import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getGlossary, getLessons } from '@/features/learn/learnData';
import { findLessonForArticle } from '@/features/learn/matchNews';
import {
  ArticlePage,
  getArticleBySlug,
  getArticles,
  getArticleSlugs,
  getMostRead,
} from '@/features/news';
import { matchCalculatorForArticle } from '@/features/calculators';
import { locales, type Locale } from '@/i18n/config';
import { getQuotes } from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbSchema,
  newsArticleSchema,
  safeJsonLd,
} from '@/lib/seo/schemas';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export const dynamicParams = true;

export const revalidate = 60;

export async function generateStaticParams() {
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await getArticleSlugs(locale);
      return slugs.map((slug) => ({ locale, slug }));
    }),
  );
  return perLocale.flat();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(locale, slug);

  if (!article) notFound();

  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${article.slug}`,
    locale,
    ...(article.imageUrl ? { image: article.imageUrl } : {}),
    article: { publishedTime: article.publishedAt },
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  const article = await getArticleBySlug(locale, slug);
  if (!article) notFound();

  const week = await getCalendarWeek(locale);
  const [related, mostRead, quotes] = await Promise.all([
    getArticles(locale),
    getMostRead(locale),
    getQuotes(),
  ]);

  const mentionedSymbols = new Set(article.mentionedSymbols ?? []);

  const relatedLesson = findLessonForArticle(
    article,
    getGlossary(locale),
    getLessons(locale),
  );

  const t = await getTranslations({ locale, namespace: 'news' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            newsArticleSchema(locale, {
              slug: article.slug,
              title: article.title,
              summary: article.summary,
              publishedAt: article.publishedAt,
              imageUrl: article.imageUrl,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            breadcrumbSchema(locale, [
              { name: t('heading'), path: '/news' },
              { name: t(`categories.${article.category}`) },
            ]),
          ),
        }}
      />
      <ArticlePage
        article={article}
        calculatorEmbed={matchCalculatorForArticle({
          title: article.title,
          summary: article.summary,
          body: article.body ?? null,
          category: article.category,
        })}
        related={related.filter((entry) => entry.id !== article.id).slice(0, 3)}
        mostRead={mostRead}
        glossary={getGlossary(locale)}
        mentioned={quotes.filter((quote) => mentionedSymbols.has(quote.symbol))}
        nextRelease={
          article.relatedEventSlug
            ? (week.days
                .flatMap((day) => day.events)
                .find((event) => event.slug === article.relatedEventSlug) ??
              null)
            : null
        }
        relatedLesson={relatedLesson}
      />
    </>
  );
}
