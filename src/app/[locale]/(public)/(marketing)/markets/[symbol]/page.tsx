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

  if (!asset) {
    return buildMetadata({
      title: t('assetNotFoundTitle'),
      description: t('metaDescription'),
      path: `/markets/${symbol}`,
      locale,
      noIndex: true,
    });
  }

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

  return (
    <AssetPage
      asset={asset}
      otherQuotes={quotes.filter((q) => q.symbol !== asset.symbol).slice(0, 5)}
      events={everyEvent.slice(0, 3)}
      lessons={everyLesson.slice(0, 3)}
      articles={relatedArticles}
    />
  );
}
