import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AssetPage } from '@/features/markets';
import { findArticlesMentioning } from '@/features/learn/matchNews';
import { resolveTickerSlug } from '@/features/markets/marketsUniverse';
import { getArticles } from '@/features/news';
import { locales, type Locale } from '@/i18n/config';
import {
  FEATURED_STOCKS,
  getAssetDetail,
  SUPPORTED_SYMBOLS,
} from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, safeJsonLd } from '@/lib/seo/schemas';

interface PageProps {
  params: Promise<{ locale: Locale; symbol: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  const symbols = [...SUPPORTED_SYMBOLS, ...FEATURED_STOCKS];
  return locales.flatMap((locale) =>
    symbols.map((symbol) => ({ locale, symbol })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, symbol } = await params;
  const t = await getTranslations({ locale, namespace: 'markets' });

  const asset = await getAssetDetail(resolveTickerSlug(symbol));

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

  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();

  const relatedArticles = findArticlesMentioning(
    [asset.name, asset.ticker],
    await getArticles(locale),
  );

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
      <AssetPage asset={asset} locale={locale} articles={relatedArticles} />
    </>
  );
}
