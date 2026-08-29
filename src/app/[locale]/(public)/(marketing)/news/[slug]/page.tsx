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

/**
 * Stories published after the build still have to render, and the wire gains
 * new ones every minute, so the prerendered set is a head start rather than
 * the whole site.
 */
export const dynamicParams = true;

/** Matches the API's poll interval — see `lib/api/news.ts`. */
export const revalidate = 60;

/**
 * Pre-renders every story in every locale rather than on first request.
 *
 * The slug set is fetched per locale: `en` returns every servable story,
 * `sq` returns only stories with a fully translated body. Pre-rendering an
 * `sq` URL that has no Albanian translation would just build a page that
 * 404s on the API — a waste of build minutes and a broken preview.
 */
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

  // Thrown here rather than only in the page body: `generateMetadata`
  // blocks the response because no loading boundary wraps this segment (the
  // index's skeleton lives in its own `(index)` group), so
  // the response carries a real 404 status instead of a 200 whose body
  // later swaps to the not-found UI. `getArticleBySlug` is `cache()`d, so
  // the page body's identical call costs no second round trip.
  if (!article) notFound();

  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${article.slug}`,
    locale,
    // The story's own art on the social card, when the wire supplied any.
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

  // Matched over the glossary vocabulary the article actually uses. The
  // `relatedLessonSlug` field this replaces was declared on the DTO and
  // consumed here, but nothing ever set it — the wire is RSS.
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
        // Article fields pass through `safeJsonLd`, which neutralises any
        // `</script>` a wire headline could smuggle in.
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
      {/* Mirrors the visible trail `ArticlePage` renders: News → category.
          The category crumb is a label, not a link, so it carries no URL. */}
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
        // Matched from the story's own words each render. Nothing is stored, so
        // nothing can go stale — the failure `matchNews.ts` documents.
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
