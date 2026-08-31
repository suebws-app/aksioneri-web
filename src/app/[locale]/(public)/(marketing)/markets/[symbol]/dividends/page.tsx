import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { DataSource } from '@/components/DataSource';
import { EmptyState } from '@/components/EmptyState';
import { MetricCard } from '@/components/MetricCard';
import { resolveTickerSlug } from '@/features/markets/marketsUniverse';
import type { Locale } from '@/i18n/config';
import {
  getDividends,
  hasFundamentals,
  type Dividends,
} from '@/lib/api/fundamentals';
import { getAssetDetail } from '@/lib/api/markets';
import { formatEndDate } from '@/lib/format/financials';
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
  const t = await getTranslations({ locale, namespace: 'company.dividends' });
  return buildMetadata({
    title: t('metaTitle', { name: asset.name }),
    description: t('metaDescription', { name: asset.name }),
    path: `/markets/${asset.symbol}/dividends`,
    locale,
  });
}

function formatPercent(value: number | null, locale: string): string {
  if (value === null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatMoney(
  value: number | null,
  currency: string,
  locale: string,
): string {
  if (value === null || !Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

function hasAnyDividendData(d: Dividends): boolean {
  return (
    d.dividendYield !== null ||
    d.trailingAnnualRate !== null ||
    d.payoutRatio !== null ||
    d.fiveYearAvgYield !== null ||
    d.exDividendDate !== null ||
    d.nextPaymentDate !== null ||
    d.history.length > 0
  );
}

export default async function Page({ params }: PageProps) {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();

  const t = await getTranslations({ locale, namespace: 'company.dividends' });
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

  const dividends = await getDividends(asset.ticker);
  const currency = dividends.currency ?? 'USD';

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

      {!hasAnyDividendData(dividends) ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
        />
      ) : (
        <div className="flex flex-col gap-10">
          <dl className="border-line bg-surface grid grid-cols-1 rounded-sm border sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              label={t('metrics.dividendYield')}
              value={formatPercent(dividends.dividendYield, locale)}
            />
            <MetricCard
              label={t('metrics.trailingAnnualRate')}
              value={formatMoney(
                dividends.trailingAnnualRate,
                currency,
                locale,
              )}
            />
            <MetricCard
              label={t('metrics.payoutRatio')}
              value={formatPercent(dividends.payoutRatio, locale)}
            />
            <MetricCard
              label={t('metrics.fiveYearAvgYield')}
              value={formatPercent(
                normalizeFiveYearYield(dividends.fiveYearAvgYield),
                locale,
              )}
            />
            <MetricCard
              label={t('metrics.exDividendDate')}
              value={
                dividends.exDividendDate
                  ? formatEndDate(dividends.exDividendDate, locale)
                  : '—'
              }
            />
            <MetricCard
              label={t('metrics.nextPaymentDate')}
              value={
                dividends.nextPaymentDate
                  ? formatEndDate(dividends.nextPaymentDate, locale)
                  : '—'
              }
            />
          </dl>

          <section>
            <h2 className="text-ink-faint mb-3 text-[11px] font-semibold tracking-[0.12em] uppercase">
              {t('history.heading')}
            </h2>
            {dividends.history.length === 0 ? (
              <EmptyState title={t('history.empty')} />
            ) : (
              <div className="border-line relative overflow-x-auto rounded-sm border">
                <table className="w-full min-w-[400px] border-collapse text-[14.5px]">
                  <thead>
                    <tr className="border-line-soft bg-surface border-b">
                      <th
                        scope="col"
                        className="text-ink-faint px-4 py-3 text-left text-[11.5px] font-semibold tracking-[0.08em] uppercase"
                      >
                        {t('history.columns.date')}
                      </th>
                      <th
                        scope="col"
                        className="text-ink-faint px-4 py-3 text-right text-[11.5px] font-semibold tracking-[0.08em] uppercase"
                      >
                        {t('history.columns.amount')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dividends.history.map((event) => (
                      <tr
                        key={event.date}
                        className="border-line-soft border-b last:border-b-0"
                      >
                        <td className="text-ink px-4 py-3 font-mono text-[13px]">
                          <time dateTime={event.date}>
                            {formatEndDate(event.date, locale)}
                          </time>
                        </td>
                        <td className="text-ink px-4 py-3 text-right font-mono tabular-nums">
                          {formatMoney(event.amount, currency, locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <DataSource
            source={dividends.source}
            updatedAt={dividends.fetchedAt}
          />
        </div>
      )}
    </div>
  );
}

function normalizeFiveYearYield(value: number | null): number | null {
  if (value === null || !Number.isFinite(value)) return null;
  return value > 1 ? value / 100 : value;
}
