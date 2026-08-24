import { useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import type { Quote } from '@/features/markets/marketsTypes';
import type { NewsArticle } from '@/features/news/newsTypes';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import type { Lesson } from './learnTypes';

export interface LessonPageProps {
  lesson: Lesson;
  /** Lessons offered in the sidebar and as the "next" card. */
  upNext: Lesson[];
  relatedQuotes: Quote[];
  relatedArticle: NewsArticle | null;
  /** Mirrors the design's sc-if props. */
  showKeyTerms?: boolean;
  showQuiz?: boolean;
}

const COST_TONE = {
  positive: 'text-positive',
  negative: 'text-negative',
  neutral: 'text-ink-secondary',
} as const;

export function LessonPage({
  lesson,
  upNext,
  relatedQuotes,
  relatedArticle,
  showKeyTerms = true,
  showQuiz = true,
}: LessonPageProps) {
  const t = useTranslations('learn');
  const tNews = useTranslations('news');

  // Section headings drive the "on this page" rail, so the two can never drift.
  const outline = [
    ...(lesson.inOneSentence ? [t('inOneSentence')] : []),
    ...(lesson.body?.map((section) => section.heading) ?? []),
    ...(lesson.comparison ? [lesson.comparison.heading] : []),
    ...(showKeyTerms && lesson.keyTerms ? [t('keyTerms')] : []),
  ];

  const nextLesson = upNext[0] ?? null;

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader active="learn" />

      <main className="flex-1">
        <nav
          aria-label={tNews('breadcrumbLabel')}
          className="mx-auto max-w-[1280px] px-6 pt-6.5 sm:px-11"
        >
          <ol className="text-ink-faint flex flex-wrap items-center gap-2.5 text-[13px]">
            <li>
              <Link href="/learn" className="hover:text-accent">
                {t('heading')}
              </Link>
            </li>
            {lesson.track ? (
              <>
                <li aria-hidden>/</li>
                <li>{lesson.track.topicTitle}</li>
                <li aria-hidden>/</li>
                <li className="text-accent">
                  {t('lessonNumber', { number: lesson.track.position })}
                </li>
              </>
            ) : null}
          </ol>
        </nav>

        <div className="mx-auto flex max-w-[1280px] flex-col gap-14 px-6 pt-7 sm:px-11 lg:flex-row">
          {outline.length > 0 ? (
            <nav
              aria-label={t('onThisPage')}
              className="lg:sticky lg:top-7 lg:h-fit lg:w-61 lg:shrink-0"
            >
              <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                {t('onThisPage')}
              </h2>
              {/* Static markers rather than scroll-spy links: the anchors are
                  not wired yet, and a link that jumps nowhere is worse than a
                  plain list. */}
              <ol className="flex flex-col text-[14.5px]">
                {outline.map((heading, index) => (
                  <li
                    key={heading}
                    className={cn(
                      'border-l-2 py-2.5 pl-3.5',
                      index === 0
                        ? 'border-accent text-ink font-medium'
                        : 'border-line text-ink-subtle',
                    )}
                  >
                    {heading}
                  </li>
                ))}
              </ol>

              {lesson.track ? (
                <div className="border-line mt-6.5 border-t pt-5.5">
                  <p className="text-ink-faint mb-2.5 text-[13px]">
                    {t('trackPosition', {
                      position: lesson.track.position,
                      total: lesson.track.total,
                      topic: lesson.track.topicTitle,
                    })}
                  </p>
                  <div
                    role="progressbar"
                    aria-valuenow={lesson.track.position}
                    aria-valuemin={0}
                    aria-valuemax={lesson.track.total}
                    className="bg-line h-1 overflow-hidden rounded-full"
                  >
                    <div
                      className="bg-accent h-full"
                      style={{
                        width: `${(lesson.track.position / lesson.track.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </nav>
          ) : null}

          <article className="min-w-0 flex-1 lg:max-w-[720px]">
            <div className="text-ink-faint mb-4 flex flex-wrap items-center gap-3 text-[13px]">
              <span className="text-accent text-[11px] font-semibold tracking-[0.12em] uppercase">
                {t(`levels.${lesson.level}`)}
              </span>
              <span
                aria-hidden
                className="size-[3px] rounded-full bg-[#c8c3b8]"
              />
              <span>
                {tNews('readingTime', { minutes: lesson.readingMinutes })}
              </span>
              <span
                aria-hidden
                className="size-[3px] rounded-full bg-[#c8c3b8]"
              />
              <span>{t('noMaths')}</span>
            </div>

            <h1 className="text-ink mb-4.5 font-serif text-[44px] leading-[1.1] font-medium tracking-[-0.022em]">
              {lesson.title}
            </h1>
            <p className="text-ink-body mb-8 text-[19px] leading-[1.6] text-pretty">
              {lesson.summary}
            </p>

            {lesson.inOneSentence ? (
              <aside className="border-accent bg-surface-tint mb-8.5 rounded-r-sm border-l-2 py-5 pr-5.5 pl-5.5">
                <h2 className="text-accent mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('inOneSentence')}
                </h2>
                <p className="text-ink-secondary text-[17px] leading-relaxed">
                  {lesson.inOneSentence}
                </p>
              </aside>
            ) : null}

            {lesson.body?.map((section, index) => (
              <section key={section.heading}>
                <h2 className="text-ink mb-3.5 font-serif text-[27px] font-medium">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-5 text-[17.5px] leading-[1.7] text-[color:var(--ink-secondary)]"
                  >
                    {paragraph}
                  </p>
                ))}

                {index === 0 && lesson.workedExample ? (
                  <section className="border-line bg-surface my-7.5 rounded-sm border p-7 sm:px-7.5">
                    <h3 className="text-ink-faint mb-5.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                      {t('workedExample')}
                    </h3>
                    <ol>
                      {lesson.workedExample.map((step, stepIndex) => (
                        <li
                          key={step.title}
                          className="border-line-soft flex items-start gap-6 border-b py-5 first:pt-0 last:border-b-0 last:pb-0"
                        >
                          <span
                            aria-hidden
                            className="text-ink-ghost pt-1 font-mono text-xs"
                          >
                            {String(stepIndex + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h4 className="text-ink mb-1.5 text-[16.5px]">
                              {step.title}
                            </h4>
                            <p className="text-ink-muted text-[15px] leading-relaxed">
                              {step.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : null}
              </section>
            ))}

            {lesson.comparison ? (
              <section className="mb-8">
                <h2 className="text-ink mb-3.5 font-serif text-[27px] font-medium">
                  {lesson.comparison.heading}
                </h2>
                <div className="relative overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse text-[15.5px]">
                    <thead className="text-ink-ghost text-[11px] font-semibold tracking-[0.11em] uppercase">
                      <tr>
                        <th scope="col" className="pb-3 text-left">
                          {lesson.comparison.columns[0]}
                        </th>
                        <th scope="col" className="pb-3 text-right">
                          {lesson.comparison.columns[1]}
                        </th>
                        <th scope="col" className="pb-3 text-right">
                          {lesson.comparison.columns[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.comparison.rows.map((row) => (
                        <tr
                          key={row.label}
                          className="border-line border-t last:border-b"
                        >
                          <td className="text-ink py-3.5">{row.label}</td>
                          <td className="text-ink-secondary py-3.5 text-right font-mono">
                            {row.value}
                          </td>
                          <td
                            className={cn(
                              'py-3.5 text-right font-mono',
                              COST_TONE[row.tone ?? 'neutral'],
                            )}
                          >
                            {row.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {showKeyTerms && lesson.keyTerms ? (
              <section className="border-line bg-surface-muted mb-8.5 rounded-sm border p-7 sm:px-7.5">
                <h2 className="text-ink mb-5 font-serif text-[21px]">
                  {t('keyTerms')}
                </h2>
                <dl className="grid gap-5.5 sm:grid-cols-2 sm:gap-x-8">
                  {lesson.keyTerms.map((entry) => (
                    <div key={entry.term}>
                      <dt className="text-ink mb-1.5 text-[15.5px] font-medium">
                        {entry.term}
                      </dt>
                      <dd className="text-ink-muted text-[14.5px] leading-relaxed">
                        {entry.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {showQuiz && lesson.quiz ? (
              <section className="border-line bg-surface mb-8.5 rounded-sm border p-7 sm:px-7.5">
                <h2 className="text-ink-faint mb-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('quickCheck')}
                </h2>
                <p className="text-ink mb-5 font-serif text-[22px] leading-[1.35]">
                  {lesson.quiz.question}
                </p>
                {/* Not interactive yet: there is no grading, and a button that
                    does nothing on click is worse than a plain list. */}
                <ul className="flex flex-col gap-2.5">
                  {lesson.quiz.options.map((option) => (
                    <li
                      key={option}
                      className="border-line-strong text-ink rounded-[3px] border px-4.5 py-3.5 text-[15.5px]"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <nav className="border-ink flex flex-col gap-5 border-t-2 pt-7.5 sm:flex-row">
              <Link
                href="/learn"
                className="border-line bg-surface hover:border-ink-faint flex-1 rounded-sm border p-5.5 sm:px-6"
              >
                <span className="text-ink-faint mb-2 block text-xs">
                  {t('backTo')}
                </span>
                <span className="text-ink font-serif text-[19px]">
                  {t('heading')}
                </span>
              </Link>

              {nextLesson ? (
                <Link
                  href={`/learn/${nextLesson.slug}`}
                  className="border-line bg-surface hover:border-ink-faint flex-1 rounded-sm border p-5.5 sm:px-6 sm:text-right"
                >
                  <span className="text-ink-faint mb-2 block text-xs">
                    {t('nextLesson')}
                  </span>
                  <span className="text-ink font-serif text-[19px]">
                    {nextLesson.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          </article>

          <aside className="flex flex-col gap-6 lg:w-67 lg:shrink-0">
            {relatedQuotes.length > 0 ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('seeInMarkets')}
                </h2>
                <ul>
                  {relatedQuotes.map((quote) => (
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

            {upNext.length > 0 ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('upNext')}
                </h2>
                <ul>
                  {upNext.map((entry) => (
                    <li
                      key={entry.id}
                      className="border-line-soft border-b py-3.5 first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <Link
                        href={`/learn/${entry.slug}`}
                        className="text-ink hover:text-accent text-[15px] leading-snug"
                      >
                        {entry.title}{' '}
                        <span className="text-ink-faint text-[13px]">
                          ·{' '}
                          {t('stats.minutesValue', {
                            minutes: entry.readingMinutes,
                          })}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {relatedArticle ? (
              <section className="border-line bg-surface-muted rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-accent mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('inTodaysNews')}
                </h2>
                <Link
                  href={`/news/${relatedArticle.slug}`}
                  className="text-ink hover:text-accent mb-2 block font-serif text-lg leading-tight"
                >
                  {relatedArticle.title}
                </Link>
                <p className="text-ink-muted text-sm leading-relaxed">
                  {t('vocabularyNote')}
                </p>
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
