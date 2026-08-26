import { useTranslations } from 'next-intl';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ChangeValue } from '@/components/ChangeValue';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import type { CalendarEvent } from '@/features/calendar';
import type { Lesson } from '@/features/learn/learnTypes';
import { ArticleMeta } from '@/features/news/components/ArticleMeta';
import type { NewsArticle } from '@/features/news/newsTypes';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { AssetDetail, Quote } from '@/lib/api/markets';
import { AssetChartLive } from './components/AssetChartLive';
import { AssetPriceLive } from './components/AssetPriceLive';

export interface AssetPageProps {
  asset: AssetDetail;
  otherQuotes: Quote[];
  events: CalendarEvent[];
  lessons: Lesson[];
  articles: NewsArticle[];
  /** Mirrors the design's sc-if props. */
  showExplainer?: boolean;
  showComposition?: boolean;
}

/**
 * Number of decimals in a formatted price string ("7,689.62" → 2). Used
 * to hand `AssetChartLive` the same precision the header shows without
 * hard-coding a per-instrument table on the frontend.
 */
function decimalsIn(formatted: string): number {
  const dot = formatted.indexOf('.');
  return dot === -1 ? 0 : formatted.length - dot - 1;
}

export function AssetPage({
  asset,
  otherQuotes,
  events,
  lessons,
  articles,
  showExplainer = true,
  showComposition = true,
}: AssetPageProps) {
  const t = useTranslations('markets');
  const tNews = useTranslations('news');
  const tLearn = useTranslations('learn');
  const tCal = useTranslations('calendar');
  // The API sends stable keys for these fields (audit Step 5); the web
  // translates on render so a locale swap does not require a redeploy
  // of the API.
  const tCategories = useTranslations('markets.categories');
  const tStats = useTranslations('markets.stats');

  const heaviest = Math.max(...(asset.holdings?.map((h) => h.weight) ?? [1]));

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="home"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main className="flex-1">
        <Breadcrumb
          label={tNews('breadcrumbLabel')}
          items={[
            { label: t('breadcrumbRoot'), href: '/' },
            { label: tCategories(asset.category) },
            { label: asset.name },
          ]}
        />

        <header className="page-container pt-6.5">
          <div className="border-ink flex flex-col gap-8 border-b-2 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="text-accent rounded-[2px] border border-[#c7d3e2] px-1.5 py-0.5 font-mono text-[11px] tracking-[0.06em]">
                  {asset.ticker}
                </span>
                {asset.descriptor ? (
                  <span className="text-ink-faint text-[13px]">
                    {asset.descriptor}
                  </span>
                ) : null}
              </div>

              <h1 className="text-ink mb-3.5 font-serif text-[40px] leading-[1.1] font-medium tracking-[-0.022em]">
                {asset.name}
              </h1>

              <AssetPriceLive
                symbol={asset.symbol}
                initialPrice={asset.price}
                initialChangePercent={asset.changePercent}
                initialChangeAbsolute={asset.changeAbsolute}
              />
            </div>

            {/* Range buttons moved into `AssetChartLive` — they now
                drive the chart's series, so ownership lives next to the
                consumer instead of being a decorative sibling. */}
          </div>
        </header>

        <div className="page-container flex flex-col gap-12 pt-8 lg:flex-row">
          <div className="min-w-0 flex-1">
            <AssetChartLive
              symbol={asset.symbol}
              initialSeries={asset.series}
              sessionTimes={asset.sessionTimes}
              digits={decimalsIn(asset.price)}
            />

            {asset.statistics.length > 0 ? (
              <section className="border-line bg-surface mb-9 rounded-sm border">
                <h2 className="sr-only">{t('statistics')}</h2>
                <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
                  {asset.statistics.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-line-soft border-b px-6 py-5 last:border-b-0 lg:not-[:nth-child(3n)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                    >
                      <dt className="text-ink-faint mb-1.5 text-xs tracking-[0.06em] uppercase">
                        {tStats(stat.label)}
                      </dt>
                      <dd
                        className={cn(
                          'font-mono text-lg',
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
                  ))}
                </dl>
              </section>
            ) : null}

            {showExplainer && asset.explainer ? (
              <section className="mb-9">
                <h2 className="text-ink mb-3.5 font-serif text-[27px] font-medium">
                  {asset.explainer.heading}
                </h2>
                {asset.explainer.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-4.5 max-w-[72ch] text-[17.5px] leading-[1.7] text-[color:var(--ink-secondary)]"
                  >
                    {paragraph}
                  </p>
                ))}

                <aside className="border-accent bg-surface-tint rounded-r-sm border-l-2 py-4.5 pr-5.5 pl-5.5">
                  <h3 className="text-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    {asset.explainer.callout.heading}
                  </h3>
                  <p className="text-ink-secondary max-w-[62ch] text-base leading-relaxed">
                    {asset.explainer.callout.body}{' '}
                    <Link
                      href={`/learn/${asset.explainer.callout.lessonSlug}`}
                      className="text-accent hover:underline"
                    >
                      {asset.explainer.callout.linkLabel}
                    </Link>
                  </p>
                </aside>
              </section>
            ) : null}

            {showComposition && asset.holdings ? (
              <section className="mb-9">
                <SectionHeading
                  title={t('biggestHoldings')}
                  action={{ label: t('shareOfIndex') }}
                />
                <div className="relative overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-[15.5px]">
                    <caption className="sr-only">
                      {t('biggestHoldings')}
                    </caption>
                    <thead className="sr-only">
                      <tr>
                        <th scope="col">{t('columns.asset')}</th>
                        <th scope="col">{t('shareOfIndex')}</th>
                        <th scope="col">{t('columns.change')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Index, not name: an index can hold two share classes
                          of the same company under one name. */}
                      {asset.holdings.map((holding, index) => (
                        <tr
                          key={index}
                          className="border-line border-t last:border-b"
                        >
                          <td className="text-ink py-3.5">{holding.name}</td>
                          <td className="w-24 py-3.5">
                            {/* Decorative: the percentage is in the next cell. */}
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
                            {holding.weight.toFixed(1)}%
                          </td>
                          <td className="min-w-16 py-3.5 text-right">
                            <ChangeValue percent={holding.changePercent} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {articles.length > 0 ? (
              <section>
                <SectionHeading
                  title={t('newsAbout')}
                  action={{ label: t('allNews'), href: '/news' }}
                />
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="border-line border-t py-5 last:border-b"
                  >
                    <h3 className="text-ink mb-2 font-serif text-[21px] leading-[1.24] font-medium">
                      <Link
                        href={`/news/${article.slug}`}
                        className="hover:text-accent"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-ink-muted mb-2.5 max-w-[74ch] text-[15px] leading-relaxed">
                      {article.summary}
                    </p>
                    <ArticleMeta
                      article={article}
                      variant="full"
                      className="text-[12.5px]"
                    />
                  </article>
                ))}
              </section>
            ) : null}
          </div>

          <aside className="flex flex-col gap-6 lg:w-79 lg:shrink-0">
            {otherQuotes.length > 0 ? (
              <section className="border-line bg-surface rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('otherMarkets')}
                </h2>
                <ul>
                  {otherQuotes.map((quote) => (
                    <li
                      key={quote.symbol}
                      className="border-line-soft border-b last:border-b-0"
                    >
                      <Link
                        href={`/markets/${quote.symbol}`}
                        className="hover:text-accent flex items-center justify-between gap-2.5 py-3 first:pt-0"
                      >
                        <span className="text-ink text-[15px]">
                          {quote.name}
                        </span>
                        <ChangeValue
                          percent={quote.changePercent}
                          className="text-[13px]"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {asset.sectors ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('sectorsToday')}
                </h2>
                <dl>
                  {asset.sectors.map((sector, index) => (
                    <div
                      key={index}
                      className="border-line-soft flex justify-between gap-3 border-b py-2.5 text-[14.5px] first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-ink">{sector.name}</dt>
                      <dd>
                        <ChangeValue
                          percent={sector.changePercent}
                          className="text-[13px]"
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {events.length > 0 ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink font-serif text-[19px]">
                  {t('whatCouldMoveIt')}
                </h2>
                <p className="text-ink-faint mt-1 mb-4 text-[13px]">
                  {t('comingUp.window')}
                </p>
                <ul>
                  {events.map((event) => (
                    <li
                      key={event.id}
                      className="border-line-soft border-b last:border-b-0"
                    >
                      <Link
                        href={`/calendar/${event.slug}`}
                        className="hover:text-accent block py-3.5 first:pt-0"
                      >
                        <span className="mb-1.5 flex items-center justify-between gap-2.5">
                          <span className="text-ink text-[14.5px] font-medium">
                            {event.title}
                          </span>
                          <time className="text-ink-muted font-mono text-[12.5px]">
                            {event.time}
                          </time>
                        </span>
                        <span className="text-ink-faint text-[12.5px]">
                          {tCal(`impact.${event.impact}`)}
                          {event.expected
                            ? ` · ${tNews('expectedShort')} ${event.expected}`
                            : ''}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {lessons.length > 0 ? (
              <section className="border-line bg-surface-muted rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-accent mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('beforeYouInvest')}
                </h2>
                <ul>
                  {lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="border-line-strong border-b last:border-b-0"
                    >
                      <Link
                        href={`/learn/${lesson.slug}`}
                        className="text-ink hover:text-accent block py-3 text-[15.5px] first:pt-0"
                      >
                        {lesson.title}{' '}
                        <span className="text-ink-faint">
                          ·{' '}
                          {tLearn('stats.minutesValue', {
                            minutes: lesson.readingMinutes,
                          })}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>
      </main>

      <div className="mt-13">
        <SiteFooter />
      </div>
    </div>
  );
}
