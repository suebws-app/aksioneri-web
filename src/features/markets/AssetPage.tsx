import { useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Sparkline } from '@/components/Sparkline';
import type { CalendarEvent } from '@/features/calendar';
import type { Lesson } from '@/features/learn/learnTypes';
import { ArticleMeta } from '@/features/news/components/ArticleMeta';
import type { NewsArticle } from '@/features/news/newsTypes';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { AssetDetail, Quote } from '@/lib/api/markets';

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

/** Range buttons in the design. No history API yet, so 1D is fixed. */
const RANGES = ['1D', '1W', '1M', '6M', '1Y', '5Y'] as const;

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

  const heaviest = Math.max(...(asset.holdings?.map((h) => h.weight) ?? [1]));

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="markets"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main className="flex-1">
        <nav
          aria-label={tNews('breadcrumbLabel')}
          className="page-container pt-6.5"
        >
          <ol className="text-ink-faint flex flex-wrap items-center gap-2.5 text-[13px]">
            <li>
              <Link href="/" className="hover:text-accent">
                {t('breadcrumbRoot')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>{asset.category}</li>
            <li aria-hidden>/</li>
            <li className="text-accent">{asset.name}</li>
          </ol>
        </nav>

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

              <p className="flex flex-wrap items-baseline gap-4">
                <span className="text-ink font-mono text-[38px]">
                  {asset.price}
                </span>
                <span
                  className={cn(
                    'font-mono text-[17px]',
                    asset.changePercent < 0 ? 'text-negative' : 'text-positive',
                  )}
                >
                  {asset.changeAbsolute
                    ? `${asset.changeAbsolute} (${asset.changePercent < 0 ? '−' : '+'}${Math.abs(asset.changePercent).toFixed(2)}%)`
                    : `${asset.changePercent < 0 ? '−' : '+'}${Math.abs(asset.changePercent).toFixed(2)}%`}
                </span>
              </p>
              <p className="text-ink-faint mt-2 text-[13px]">
                {asset.statusLine}
              </p>
            </div>

            {/* Only the day series exists; the other ranges are shown as the
                design has them, inactive, rather than as dead controls. */}
            <ul className="flex flex-wrap gap-1.5 pb-1.5 text-[13px]">
              {RANGES.map((range, index) => (
                <li
                  key={range}
                  className={cn(
                    'rounded-[3px] px-3.5 py-2',
                    index === 0
                      ? 'bg-ink text-paper'
                      : 'border-line-strong text-ink-muted border',
                  )}
                >
                  {range}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="page-container flex flex-col gap-12 pt-8 lg:flex-row">
          <div className="min-w-0 flex-1">
            {asset.series.length > 0 ? (
              <section className="border-line bg-surface mb-8 rounded-sm border p-6.5 sm:px-7">
                <Sparkline values={asset.series} className="h-75" />
                <div className="text-ink-ghost mt-3 flex justify-between font-mono text-[11px]">
                  {asset.sessionTimes.map((time) => (
                    <span key={time}>{time}</span>
                  ))}
                </div>
              </section>
            ) : null}

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
                        {stat.label}
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
                {asset.explainer.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
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
                      {asset.holdings.map((holding) => (
                        <tr
                          key={holding.name}
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
                  {asset.sectors.map((sector) => (
                    <div
                      key={sector.name}
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
