import { useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import type { NewsArticle } from '@/features/news/newsTypes';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { formatMinutesAgo } from '@/lib/format/relativeTime';
import { cn } from '@/lib/utils/cn';
import type { AssetDetail } from '@/lib/api/markets';
import { AssetChartLive } from './components/AssetChartLive';
import { AssetSnapshot } from './components/AssetSnapshot';

export interface AssetPageProps {
  asset: AssetDetail;
  articles: NewsArticle[];
  locale: Locale;
  showComposition?: boolean;
}

function decimalsIn(formatted: string): number {
  const dot = formatted.indexOf('.');
  return dot === -1 ? 0 : formatted.length - dot - 1;
}

export function AssetPage({
  asset,
  articles,
  locale,
  showComposition = true,
}: AssetPageProps) {
  const t = useTranslations('markets');
  const tStats = useTranslations('markets.stats');
  const tNews = useTranslations('news');
  const tNewsCategories = useTranslations('news.categories');

  const heaviest = Math.max(...(asset.holdings?.map((h) => h.weight) ?? [1]));

  return (
    <div className="page-container flex flex-col gap-10 pt-8 pb-12">
      <AssetSnapshot ticker={asset.ticker} locale={locale} />

      <SectionShell
        heading={t('priceHeading')}
        headingSize="lg"
        headingRule="strong"
      >
        <div className="p-6.5 sm:px-7">
          <AssetChartLive
            symbol={asset.symbol}
            initialSeries={asset.series}
            sessionTimes={asset.sessionTimes}
            digits={decimalsIn(asset.price)}
          />
        </div>
      </SectionShell>

      {asset.statistics.length > 0 ? (
        <SectionShell
          heading={t('keyStatistics')}
          headingSize="lg"
          headingRule="strong"
          headingAction={t('keyStatisticsNote')}
        >
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {asset.statistics.map((stat, index, all) => {
              const isLastInRow = (index + 1) % 4 === 0;
              const isBottomRow = index >= all.length - (all.length % 4 || 4);
              return (
                <div
                  key={stat.label}
                  className={cn(
                    'px-6 py-5',
                    !isLastInRow && 'border-line-soft lg:border-r',
                    !isBottomRow && 'border-line-soft border-b',
                  )}
                >
                  <dt className="text-ink-faint mb-1.5 text-[11.5px] tracking-[0.07em] uppercase">
                    {tStats(stat.label)}
                  </dt>
                  <dd
                    className={cn(
                      'font-mono text-[19px]',
                      stat.tone === 'positive'
                        ? 'text-positive'
                        : stat.tone === 'negative'
                          ? 'text-negative'
                          : 'text-ink',
                    )}
                  >
                    {stat.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </SectionShell>
      ) : null}

      {showComposition && asset.holdings ? (
        <SectionShell
          heading={t('biggestHoldings')}
          headingSize="lg"
          headingRule="strong"
          headingAction={t('shareOfIndex')}
        >
          <div className="relative overflow-x-auto p-6.5 sm:px-7">
            <table className="w-full min-w-[520px] border-collapse text-[15.5px]">
              <caption className="sr-only">{t('biggestHoldings')}</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">{t('columns.asset')}</th>
                  <th scope="col">{t('shareOfIndex')}</th>
                  <th scope="col">{t('columns.change')}</th>
                </tr>
              </thead>
              <tbody>
                {asset.holdings.map((holding, index) => (
                  <tr
                    key={index}
                    className="border-line-soft border-t last:border-b"
                  >
                    <td className="text-ink py-3.5">{holding.name}</td>
                    <td className="w-24 py-3.5">
                      <span
                        aria-hidden
                        className="bg-line block h-1.5 overflow-hidden rounded-full"
                      >
                        <span
                          className="bg-accent block h-full rounded-full"
                          style={{
                            width: `${(holding.weight / heaviest) * 100}%`,
                          }}
                        />
                      </span>
                    </td>
                    <td className="text-ink-secondary min-w-14 py-3.5 text-right font-mono">
                      {Number.isFinite(holding.weight)
                        ? `${holding.weight.toFixed(1)}%`
                        : '—'}
                    </td>
                    <td className="min-w-16 py-3.5 text-right">
                      <ChangeValue percent={holding.changePercent} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionShell>
      ) : null}

      {articles.length > 0 ? (
        <section>
          <div className="border-ink flex flex-wrap items-baseline justify-between gap-3 border-b pb-3.5">
            <h2 className="text-ink font-serif text-[23px] font-medium">
              {t('latestOn', { name: asset.name })}
            </h2>
            <Link
              href="/news"
              className="text-accent text-[13px] hover:underline"
            >
              {t('allCoverage')}
            </Link>
          </div>
          <div className="border-line bg-surface grid grid-cols-1 rounded-b-md border border-t-0 md:grid-cols-3">
            {articles.slice(0, 3).map((article, index) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className={cn(
                  'hover:bg-surface-tint block p-5 transition-colors',
                  index !== 0 && 'border-t md:border-t-0 md:border-l',
                  'border-line-soft',
                )}
              >
                <div className="text-ink-faint mb-2 text-[12px]">
                  {formatMinutesAgo(article.minutesAgo, tNews)}
                  {article.category
                    ? ` · ${tNewsCategories(article.category)}`
                    : ''}
                </div>
                <div className="text-ink font-serif text-[19px] leading-[1.3]">
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

interface SectionShellProps {
  heading: string;
  headingSize?: 'sm' | 'lg';
  headingRule?: 'normal' | 'strong';
  headingAction?: string;
  children: React.ReactNode;
}

function SectionShell({
  heading,
  headingSize = 'lg',
  headingRule = 'strong',
  headingAction,
  children,
}: SectionShellProps) {
  return (
    <section>
      <div
        className={cn(
          'flex flex-wrap items-baseline justify-between gap-3 pb-3.5',
          headingRule === 'strong'
            ? 'border-ink border-b-2'
            : 'border-ink border-b',
        )}
      >
        <h2
          className={cn(
            'text-ink font-serif font-medium',
            headingSize === 'lg'
              ? 'text-[27px] tracking-[-0.015em]'
              : 'text-[23px]',
          )}
        >
          {heading}
        </h2>
        {headingAction ? (
          <span className="text-ink-faint text-[13px]">{headingAction}</span>
        ) : null}
      </div>
      <div className="border-line bg-surface overflow-hidden rounded-b-md border border-t-0">
        {children}
      </div>
    </section>
  );
}
