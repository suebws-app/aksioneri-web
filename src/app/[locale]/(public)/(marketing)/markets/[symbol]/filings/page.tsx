import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { DataSource } from '@/components/DataSource';
import { EmptyState } from '@/components/EmptyState';
import { resolveTickerSlug } from '@/features/markets/marketsUniverse';
import type { Locale } from '@/i18n/config';
import { getFilings, hasFundamentals } from '@/lib/api/fundamentals';
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
  const t = await getTranslations({ locale, namespace: 'company.filings' });
  return buildMetadata({
    title: t('metaTitle', { name: asset.name }),
    description: t('metaDescription', { name: asset.name }),
    path: `/markets/${asset.symbol}/filings`,
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, symbol } = await params;
  const asset = await getAssetDetail(resolveTickerSlug(symbol));
  if (!asset) notFound();

  const t = await getTranslations({ locale, namespace: 'company.filings' });
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

  const filings = await getFilings(asset.ticker, 30);

  return (
    <div className="page-container pt-8">
      <header className="mb-6">
        <h1 className="text-ink font-serif text-[32px] font-medium">
          {t('heading')}
        </h1>
        <p className="text-ink-muted mt-2 max-w-[62ch] text-[15.5px]">
          {t('subheading')}
        </p>
      </header>

      {filings.filings.length === 0 ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
        />
      ) : (
        <div className="relative overflow-x-auto">
          <table className="border-line w-full min-w-[720px] border-collapse text-[14.5px]">
            <caption className="sr-only">{t('heading')}</caption>
            <thead>
              <tr className="border-line border-b">
                <th
                  scope="col"
                  className="text-ink-faint py-3 pr-4 text-left text-[11.5px] font-semibold tracking-[0.08em] uppercase"
                >
                  {t('columns.form')}
                </th>
                <th
                  scope="col"
                  className="text-ink-faint py-3 pr-4 text-left text-[11.5px] font-semibold tracking-[0.08em] uppercase"
                >
                  {t('columns.filed')}
                </th>
                <th
                  scope="col"
                  className="text-ink-faint py-3 pr-4 text-left text-[11.5px] font-semibold tracking-[0.08em] uppercase"
                >
                  {t('columns.period')}
                </th>
                <th
                  scope="col"
                  className="text-ink-faint py-3 pr-4 text-left text-[11.5px] font-semibold tracking-[0.08em] uppercase"
                >
                  {t('columns.description')}
                </th>
                <th
                  scope="col"
                  className="text-ink-faint py-3 pl-4 text-right text-[11.5px] font-semibold tracking-[0.08em] uppercase"
                >
                  {t('columns.open')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filings.filings.map((filing) => (
                <tr
                  key={filing.accessionNumber}
                  className="border-line-soft border-b last:border-b-0"
                >
                  <td className="text-accent py-3 pr-4 font-mono text-[12.5px]">
                    {filing.form}
                  </td>
                  <td className="text-ink py-3 pr-4 font-mono text-[13px]">
                    <time dateTime={filing.filedAt}>
                      {formatEndDate(filing.filedAt, locale)}
                    </time>
                  </td>
                  <td className="text-ink-muted py-3 pr-4 font-mono text-[13px]">
                    {filing.reportDate
                      ? formatEndDate(filing.reportDate, locale)
                      : '—'}
                  </td>
                  <td className="text-ink-muted py-3 pr-4">
                    {filing.description ?? '—'}
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <a
                      href={filing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-[13px] hover:underline"
                    >
                      {t('columns.open')} ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <DataSource source={filings.source} updatedAt={filings.fetchedAt} />
      </div>
    </div>
  );
}
