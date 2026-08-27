import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCalendarWeek } from '@/features/calendar';
import { getTopics } from '@/features/learn';
import { AssetPage } from '@/features/markets';
import { findArticlesMentioning } from '@/features/learn/matchNews';
import { getArticles } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import {
  getAssetDetail,
  getQuotes,
  SUPPORTED_SYMBOLS,
} from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, safeJsonLd } from '@/lib/seo/schemas';

interface PageProps {
  params: Promise<{ locale: Locale; symbol: string }>;
}

/**
 * `symbol` is no longer restricted to the seven curated slugs — it is
 * anything that URL-decodes to a plausible ticker (`NVDA`, `BRK-B`), so a
 * click in the "Lëvizësit e tregut" panel opens the constituent's page.
 * The API is the source of truth: it accepts both slugs and raw tickers
 * and answers 404 for anything Yahoo cannot resolve. This page treats
 * that 404 as `notFound()`.
 *
 * `generateStaticParams` still pre-renders the curated seven so the
 * common pages are static; unknown tickers render on-demand because
 * Next.js keeps `dynamicParams` true by default.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SUPPORTED_SYMBOLS.map((symbol) => ({ locale, symbol })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, symbol } = await params;
  const t = await getTranslations({ locale, namespace: 'markets' });

  const asset = await getAssetDetail(symbol);

  // Thrown here rather than only in the page body: `generateMetadata`
  // blocks the response because no loading boundary wraps this segment (the
  // index's skeleton lives in its own `(index)` group), so
  // the response carries a real 404 status instead of a 200 whose body
  // later swaps to the not-found UI. `getAssetDetail` is `cache()`d, so the
  // page body's identical call costs no second round trip.
  if (!asset) notFound();

  return buildMetadata({
    title: asset.name,
    description: t('assetDescription', { name: asset.name }),
    path: `/markets/${asset.symbol}`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, symbol } = await params;

  const [asset, quotes] = await Promise.all([
    getAssetDetail(symbol),
    getQuotes(),
  ]);
  if (!asset) notFound();

  const everyEvent = (await getCalendarWeek(locale)).days.flatMap(
    (day) => day.events,
  );
  const everyLesson = getTopics(locale).flatMap((topic) => topic.lessons);

  const relatedArticles = findArticlesMentioning(
    [asset.name, asset.ticker],
    await getArticles(locale),
  );

  // Mirrors the visible trail `AssetPage` renders: Markets root → category →
  // asset. Category and asset crumbs are labels, not links, so they carry no
  // URL here either.
  const t = await getTranslations({ locale, namespace: 'markets' });
  const breadcrumb = breadcrumbSchema(locale, [
    { name: t('breadcrumbRoot'), path: '/' },
    { name: t(`categories.${asset.category}`) },
    { name: asset.name },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }}
      />
      <AssetPage
        asset={asset}
        otherQuotes={quotes
          .filter((q) => q.symbol !== asset.symbol)
          .slice(0, 5)}
        events={everyEvent.slice(0, 3)}
        lessons={everyLesson.slice(0, 3)}
        articles={relatedArticles}
      />
    </>
  );
}
