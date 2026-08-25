import { useLocale, useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import type { Lesson } from '@/features/learn/learnTypes';
import type { Quote } from '@/features/markets/marketsTypes';
import type { NewsArticle } from '@/features/news/newsTypes';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { ImpactBars } from './components/ImpactBars';
import type {
  CalendarEvent,
  DirectionOutcome,
  EventDetail,
} from './calendarTypes';
import { formatTimestamp } from './formatDate';

export interface EventPageProps {
  event: EventDetail;
  /** Other releases in the same week, for the sidebar. */
  alsoThisWeek: CalendarEvent[];
  reactingQuotes: Quote[];
  lessons: Lesson[];
  articles: NewsArticle[];
  /** Mirrors the design's sc-if props. */
  showGoodBad?: boolean;
  showHowToRead?: boolean;
}

const TONE = {
  positive: 'text-positive',
  negative: 'text-negative',
  neutral: 'text-ink',
} as const;

function DirectionColumn({
  outcome,
  direction,
}: {
  outcome: DirectionOutcome;
  direction: 'higher' | 'lower';
}) {
  const isHigher = direction === 'higher';

  return (
    <div className="p-6.5 sm:px-7">
      <div className="mb-2 flex items-center gap-2.5">
        <span
          aria-hidden
          className={cn(
            'font-mono text-[19px]',
            isHigher ? 'text-negative' : 'text-positive',
          )}
        >
          {isHigher ? '▲' : '▼'}
        </span>
        <span
          className={cn(
            'text-[11px] font-semibold tracking-[0.12em] uppercase',
            isHigher ? 'text-negative' : 'text-positive',
          )}
        >
          {outcome.label}
        </span>
      </div>

      <p className="text-ink mb-3.5 font-serif text-[22px]">
        {outcome.verdict}
      </p>
      <p className="text-ink-body mb-4.5 text-[15.5px] leading-relaxed">
        {outcome.body}
      </p>

      <dl className="flex flex-col text-[15px]">
        {outcome.effects.map((effect) => (
          <div
            key={effect.subject}
            className="border-line-soft flex justify-between gap-3 border-b py-2.5 first:pt-0 last:border-b-0 last:pb-0"
          >
            <dt className="text-ink-muted">{effect.subject}</dt>
            <dd className={cn('text-right font-medium', TONE[effect.tone])}>
              {effect.outcome}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function EventPage({
  event,
  alsoThisWeek,
  reactingQuotes,
  lessons,
  articles,
  showGoodBad = true,
  showHowToRead = true,
}: EventPageProps) {
  const t = useTranslations('calendar');
  const tNews = useTranslations('news');
  const tLearn = useTranslations('learn');
  const locale = useLocale() as Locale;

  const historyMax = Math.max(
    ...(event.history?.entries.map((entry) => entry.value) ?? [1]),
  );

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="calendar"
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
              <Link href="/calendar" className="hover:text-accent">
                {t('heading')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>{event.regionName}</li>
            <li aria-hidden>/</li>
            <li className="text-accent">{event.shortName}</li>
          </ol>
        </nav>

        <header className="page-container pt-6.5">
          <div className="border-ink flex flex-col gap-8 border-b-2 pb-5.5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3.5 flex flex-wrap items-center gap-3">
                <span className="text-accent rounded-[2px] border border-[#c7d3e2] px-1.5 py-0.5 font-mono text-[11px] tracking-[0.06em]">
                  {event.region}
                </span>
                <span className="text-accent text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {event.cadence}
                </span>
                <ImpactBars impact={event.impact} />
              </div>

              <h1 className="text-ink mb-3 font-serif text-[42px] leading-[1.1] font-medium tracking-[-0.022em]">
                {event.title}
              </h1>
              <p className="text-ink-body max-w-[64ch] text-[17.5px] leading-relaxed">
                {event.summary}
              </p>
            </div>

            <div className="shrink-0 lg:text-right">
              <p className="text-ink-faint mb-1.5 text-[13px]">
                {t('event.releasesAt')}
              </p>
              {/* A live countdown would force the page to render dynamically on
                  every request; the release time is stated instead. */}
              <p className="text-ink mb-1.5 font-mono text-[32px]">
                {event.time}
              </p>
              <p className="text-ink-faint text-[13px]">
                {formatTimestamp(locale, event.releasesAt)}
              </p>
            </div>
          </div>
        </header>

        <div className="page-container">
          <div className="border-line bg-surface relative overflow-x-auto border-b">
            <dl className="grid min-w-[720px] grid-cols-5">
              {[
                { label: t('columns.expected'), value: event.expected },
                { label: t('columns.previous'), value: event.previous },
                { label: t('columns.actual'), value: event.actual },
                ...(event.benchmark
                  ? [
                      {
                        label: event.benchmark.label,
                        value: event.benchmark.value,
                      },
                    ]
                  : []),
                ...(event.nextReleaseDate
                  ? [
                      {
                        label: t('event.nextAfter'),
                        value: event.nextReleaseDate,
                      },
                    ]
                  : []),
              ].map((figure, index, all) => (
                <div
                  key={figure.label}
                  className={cn(
                    'px-6 py-5',
                    index < all.length - 1 && 'border-line-soft border-r',
                  )}
                >
                  <dt className="text-ink-faint mb-2 text-[11px] font-semibold tracking-[0.11em] uppercase">
                    {figure.label}
                  </dt>
                  <dd
                    className={cn(
                      'font-mono text-2xl',
                      figure.value ? 'text-ink' : 'text-ink-ghost',
                    )}
                  >
                    {figure.value ?? '—'}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="page-container flex flex-col gap-12 pt-10 lg:flex-row">
          <div className="min-w-0 flex-1 lg:max-w-[780px]">
            {event.explainer ? (
              <section className="mb-8.5">
                <h2 className="text-ink mb-3.5 font-serif text-[27px] font-medium">
                  {event.explainer.heading}
                </h2>
                {event.explainer.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-4.5 text-[17.5px] leading-[1.68] text-[color:var(--ink-secondary)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ) : null}

            {showGoodBad && event.directions ? (
              <section className="border-line bg-surface mb-9 rounded-sm border">
                <div className="border-line border-b p-6.5 sm:px-7">
                  <h2 className="text-ink mb-2 font-serif text-[26px] font-medium">
                    {t('event.goodOrBad')}
                  </h2>
                  <p className="text-ink-muted max-w-[68ch] text-base leading-relaxed">
                    {t('event.goodOrBadNote')}
                  </p>
                </div>

                <div className="sm:divide-line grid sm:grid-cols-2 sm:divide-x">
                  <DirectionColumn
                    outcome={event.directions.higher}
                    direction="higher"
                  />
                  <DirectionColumn
                    outcome={event.directions.lower}
                    direction="lower"
                  />
                </div>

                <div className="border-line bg-surface-tint border-t p-5 sm:px-7">
                  <h3 className="text-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    {event.directions.caveat.heading}
                  </h3>
                  <p className="text-ink-secondary max-w-[78ch] text-[15.5px] leading-relaxed">
                    {event.directions.caveat.body}
                  </p>
                </div>
              </section>
            ) : null}

            {event.history ? (
              <section className="mb-9">
                <h2 className="text-ink mb-2 font-serif text-[26px] font-medium">
                  {event.history.heading}
                </h2>
                <p className="text-ink-muted mb-6 text-base leading-relaxed">
                  {event.history.note}
                </p>

                {/* Bars are sized from the values, so a new reading needs no
                    markup change. Decorative — the table below states each
                    figure. */}
                <div
                  aria-hidden
                  className="border-line bg-surface mb-5.5 flex h-55 items-end gap-3 rounded-sm border p-6.5"
                >
                  {event.history.entries.map((entry, index) => (
                    <div
                      key={entry.period}
                      className={cn(
                        'bg-accent flex-1 rounded-t-[2px]',
                        index === event.history!.entries.length - 1
                          ? 'opacity-55'
                          : 'opacity-16',
                      )}
                      style={{ height: `${(entry.value / historyMax) * 100}%` }}
                    />
                  ))}
                </div>

                <div className="relative overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-[15px]">
                    <caption className="sr-only">
                      {event.history.heading}
                    </caption>
                    <thead className="text-ink-ghost text-[11px] font-semibold tracking-[0.11em] uppercase">
                      <tr>
                        <th scope="col" className="pb-3 text-left">
                          {t('event.release')}
                        </th>
                        <th scope="col" className="pb-3 text-right">
                          {t('columns.actual')}
                        </th>
                        <th scope="col" className="pb-3 text-right">
                          {t('columns.expected')}
                        </th>
                        <th scope="col" className="pb-3 text-right">
                          {t('event.surprise')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.history.entries.map((entry) => (
                        <tr
                          key={entry.period}
                          className="border-line border-t last:border-b"
                        >
                          <td className="text-ink py-3.5">{entry.period}</td>
                          <td className="text-ink-secondary py-3.5 text-right font-mono">
                            {entry.actual}
                          </td>
                          <td className="text-ink-faint py-3.5 text-right font-mono">
                            {entry.expected}
                          </td>
                          <td
                            className={cn(
                              'py-3.5 text-right font-mono',
                              entry.surpriseDirection === 'below'
                                ? 'text-positive'
                                : entry.surpriseDirection === 'above'
                                  ? 'text-negative'
                                  : 'text-ink-faint',
                            )}
                          >
                            {entry.surprise ?? t('event.inLine')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {showHowToRead && event.howToRead ? (
              <section className="border-line bg-surface-muted mb-9 rounded-sm border p-7 sm:px-8">
                <h2 className="text-ink mb-5 font-serif text-2xl font-medium">
                  {event.howToRead.heading}
                </h2>
                <ol>
                  {event.howToRead.steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="border-line-strong flex gap-4.5 border-b py-4.5 first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <span
                        aria-hidden
                        className="text-ink-ghost pt-1 font-mono text-xs"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-ink mb-1.5 text-[16.5px] font-medium">
                          {step.title}
                        </h3>
                        <p className="text-ink-muted max-w-[74ch] text-[15px] leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>

          <aside className="flex flex-col gap-6 lg:w-79 lg:shrink-0">
            {event.atAGlance ? (
              <section className="border-line bg-surface rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('event.atAGlance')}
                </h2>
                <dl>
                  {event.atAGlance.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-line-soft flex justify-between gap-3 border-b py-3 text-[14.5px] first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-ink-subtle">{fact.label}</dt>
                      <dd className="text-ink text-right">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {reactingQuotes.length > 0 ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('event.reactingAssets')}
                </h2>
                <ul>
                  {reactingQuotes.map((quote) => (
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

            {alsoThisWeek.length > 0 ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('event.alsoThisWeek')}
                </h2>
                <ul>
                  {alsoThisWeek.map((entry) => (
                    <li
                      key={entry.id}
                      className="border-line-soft border-b last:border-b-0"
                    >
                      <Link
                        href={`/calendar/${entry.slug}`}
                        className="hover:text-accent flex items-center justify-between gap-2.5 py-3 first:pt-0"
                      >
                        <span className="text-ink text-[14.5px]">
                          {entry.title}
                        </span>
                        <time className="text-ink-faint font-mono text-[12.5px]">
                          {entry.time}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {lessons.length > 0 ? (
              <section className="border-line bg-surface-muted rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-accent mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('event.learnBackground')}
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

            {articles.length > 0 ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('event.relatedNews')}
                </h2>
                <ul>
                  {articles.map((entry) => {
                    const hours = Math.floor(entry.minutesAgo / 60);
                    return (
                      <li
                        key={entry.id}
                        className="border-line-soft border-b py-3.5 first:pt-0 last:border-b-0 last:pb-0"
                      >
                        <Link
                          href={`/news/${entry.slug}`}
                          className="text-ink hover:text-accent mb-1.5 block font-serif text-[17px] leading-tight"
                        >
                          {entry.title}
                        </Link>
                        <p className="text-ink-faint text-xs">
                          {hours >= 1
                            ? tNews('hoursAgo', { hours })
                            : tNews('minutesAgo', {
                                minutes: entry.minutesAgo,
                              })}
                        </p>
                      </li>
                    );
                  })}
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
