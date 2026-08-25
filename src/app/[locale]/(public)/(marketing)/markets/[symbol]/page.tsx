import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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
  type SupportedSymbol,
} from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; symbol: string }>;
}

const isSupportedSymbol = (value: string): value is SupportedSymbol =>
  (SUPPORTED_SYMBOLS as readonly string[]).includes(value);

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

  if (!isSupportedSymbol(symbol)) {
    return buildMetadata({
      title: t('assetNotFoundTitle'),
      description: t('metaDescription'),
      path: `/markets/${symbol}`,
      locale,
      noIndex: true,
    });
  }

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
  setRequestLocale(locale);

  if (!isSupportedSymbol(symbol)) notFound();

  const [asset, quotes] = await Promise.all([
    getAssetDetail(symbol),
    getQuotes(),
  ]);
  if (!asset) notFound();

  const everyEvent = getCalendarWeek(locale).days.flatMap((day) => day.events);
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
