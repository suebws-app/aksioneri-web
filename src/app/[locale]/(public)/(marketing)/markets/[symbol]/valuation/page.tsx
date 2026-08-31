import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { DataSource } from '@/components/DataSource';
import { EmptyState } from '@/components/EmptyState';
import { MetricCard } from '@/components/MetricCard';
import { resolveTickerSlug } from '@/features/markets/marketsUniverse';
import type { Locale } from '@/i18n/config';
import {
  getValuation,
  hasFundamentals,
  type Valuation,
} from '@/lib/api/fundamentals';
import { getAssetDetail } from '@/lib/api/markets';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale; symbol: string }>;
}

export const dynamicParams = true;

type MetricKey = {
  [K in keyof Valuation]: Valuation[K] extends number | null ? K : never;
}[keyof Valuation];

interface MetricSpec {
  key: MetricKey;
  format: 'currency' | 'ratio' | 'percent';
}

const VALUATION_RATIOS: readonly MetricSpec[] = [
  { key: 'marketCap', format: 'currency' },
  { key: 'enterpriseValue', format: 'currency' },
  { key: 'peRatio', format: 'ratio' },
  { key: 'forwardPeRatio', format: 'ratio' },
  { key: 'pegRatio', format: 'ratio' },
  { key: 'priceToSales', format: 'ratio' },
  { key: 'priceToBook', format: 'ratio' },
  { key: 'evToRevenue', format: 'ratio' },
  { key: 'evToEbitda', format: 'ratio' },
  { key: 'beta', format: 'ratio' },
];

const PROFITABILITY_GROWTH: readonly MetricSpec[] = [
  { key: 'profitMargin', format: 'percent' },
  { key: 'operatingMargin', format: 'percent' },
  { key: 'returnOnEquity', format: 'percent' },
  { key: 'returnOnAssets', format: 'percent' },
  { key: 'revenueGrowth', format: 'percent' },
  { key: 'earningsGrowth', format: 'percent' },
  { key: 'debtToEquity', format: 'ratio' },
];

const PRICE_RANGE: readonly MetricSpec[] = [
  { key: 'fiftyTwoWeekLow', format: 'currency' },
  { key: 'fiftyTwoWeekHigh', format: 'currency' },
];

function makeFormatValue(currency: string, locale: string) {
  return (raw: number | null, format: MetricSpec['format']): string => {
    if (raw === null || !Number.isFinite(raw)) return '—';
    if (format === 'currency') {
      try {
        const magnitude = Math.abs(raw);
        return new Intl.NumberFormat(locale, {
          notation: 'compact',
          style: 'currency',
          currency,
          compactDisplay: 'short',
          maximumFractionDigits: magnitude >= 1e11 ? 0 : 2,
        }).format(raw);
      } catch {
        return '—';
      }
    }
    if (format === 'percent') {
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      }).format(raw);
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(raw);
  };
}

function hasAny(valuation: Valuation, specs: readonly MetricSpec[]): boolean {
  return specs.some((spec) => valuation[spec.key] !== null);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();
  const t = await getTranslations({ locale, namespace: 'company.valuation' });
  return buildMetadata({
    title: t('metaTitle', { name: asset.name }),
    description: t('metaDescription', { name: asset.name }),
    path: `/markets/${asset.symbol}/valuation`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();

  const t = await getTranslations({ locale, namespace: 'company.valuation' });
  const tFin = await getTranslations({
    locale,
    namespace: 'company.financials',
  });

  if (!hasFundamentals(asset.category)) {
    return (
      <div className="page-container pt-8">
        <EmptyState
          title={tFin('notApplicable.title')}
          description={tFin('notApplicable.description')}
        />
      </div>
    );
  }

  const valuation = await getValuation(asset.ticker);
  const currency = valuation.currency ?? 'USD';
  const formatValue = makeFormatValue(currency, locale);

  const anyData =
    hasAny(valuation, VALUATION_RATIOS) ||
    hasAny(valuation, PROFITABILITY_GROWTH) ||
    hasAny(valuation, PRICE_RANGE);

  return (
    <div className="page-container pt-8 pb-12">
      <header className="mb-8">
        <h1 className="text-ink font-serif text-[32px] font-medium">
          {t('heading')}
        </h1>
        <p className="text-ink-muted mt-2 max-w-[62ch] text-[15.5px]">
          {t('subheading')}
        </p>
      </header>

      {!anyData ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
        />
      ) : (
        <div className="flex flex-col gap-10">
          {hasAny(valuation, VALUATION_RATIOS) ? (
            <MetricGroup
              heading={t('groups.valuationRatios')}
              specs={VALUATION_RATIOS}
              valuation={valuation}
              t={t}
              formatValue={formatValue}
            />
          ) : null}
          {hasAny(valuation, PROFITABILITY_GROWTH) ? (
            <MetricGroup
              heading={t('groups.profitabilityGrowth')}
              specs={PROFITABILITY_GROWTH}
              valuation={valuation}
              t={t}
              formatValue={formatValue}
            />
          ) : null}
          {hasAny(valuation, PRICE_RANGE) ? (
            <MetricGroup
              heading={t('groups.priceRange')}
              specs={PRICE_RANGE}
              valuation={valuation}
              t={t}
              formatValue={formatValue}
            />
          ) : null}

          <DataSource
            source={valuation.source}
            updatedAt={valuation.fetchedAt}
          />
        </div>
      )}
    </div>
  );
}

interface MetricGroupProps {
  heading: string;
  specs: readonly MetricSpec[];
  valuation: Valuation;
  t: (key: string) => string;
  formatValue: (raw: number | null, format: MetricSpec['format']) => string;
}

function MetricGroup({
  heading,
  specs,
  valuation,
  t,
  formatValue,
}: MetricGroupProps) {
  return (
    <section>
      <h2 className="text-ink-faint mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {heading}
      </h2>
      <dl className="border-line bg-surface grid grid-cols-1 rounded-sm border sm:grid-cols-2 lg:grid-cols-4">
        {specs.map((spec) => (
          <MetricCard
            key={spec.key}
            label={t(`metrics.${spec.key}`)}
            value={formatValue(valuation[spec.key], spec.format)}
          />
        ))}
      </dl>
    </section>
  );
}
