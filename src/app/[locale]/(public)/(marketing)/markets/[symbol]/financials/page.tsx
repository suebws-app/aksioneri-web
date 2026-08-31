import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { DataSource } from '@/components/DataSource';
import { EmptyState } from '@/components/EmptyState';
import { AssetFinancials } from '@/features/markets/components/AssetFinancials';
import { resolveTickerSlug } from '@/features/markets/marketsUniverse';
import type { Locale } from '@/i18n/config';
import { getIncomeStatement, hasFundamentals } from '@/lib/api/fundamentals';
import { getAssetDetail } from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; symbol: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();
  const t = await getTranslations({
    locale,
    namespace: 'company.financials',
  });
  return buildMetadata({
    title: t('metaTitle', { name: asset.name }),
    description: t('metaDescription', { name: asset.name }),
    path: `/markets/${asset.symbol}/financials`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();

  const t = await getTranslations({
    locale,
    namespace: 'company.financials',
  });

  if (!hasFundamentals(asset.category)) {
    return (
      <div className="page-container pt-8">
        <EmptyState
          title={t('notApplicable.title')}
          description={t('notApplicable.description')}
        />
      </div>
    );
  }

  const initialStatement = await getIncomeStatement(asset.ticker, 'annual', 5);

  return (
    <div className="page-container flex flex-col gap-4 pt-8 pb-12">
      <AssetFinancials
        ticker={asset.ticker}
        locale={locale}
        initialStatement={initialStatement}
      />
      <DataSource
        source={initialStatement.source}
        updatedAt={initialStatement.fetchedAt}
      />
    </div>
  );
}
