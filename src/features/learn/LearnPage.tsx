import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';
import { ContinueReading } from './components/ContinueReading';
import { LessonCard } from './components/LessonCard';
import { LessonTick } from './components/LessonTick';
import {
  LessonSearch,
  type LessonSearchEntry,
} from './components/LessonSearch';
import { TopicProgress } from './components/TopicProgress';
import type {
  GlossaryTerm,
  LearnStats,
  Lesson,
  LessonTopic,
} from './learnTypes';

export interface LearnPageProps {
  stats: LearnStats;
  startHere: Lesson[];
  /** Every lesson, so "continue where you left off" can resolve a title. */
  allLessons: Lesson[];
  /** Trimmed index for the search box — titles and terms, never bodies. */
  searchIndex: LessonSearchEntry[];
  /** First topic renders as a detailed list; the rest as compact columns. */
  topics: LessonTopic[];
  glossary: GlossaryTerm[];
}

export function LearnPage({
  stats,
  startHere,
  allLessons,
  searchIndex,
  topics,
  glossary,
}: LearnPageProps) {
  const t = useTranslations('learn');

  const [primaryTopic, ...secondaryTopics] = topics;
  const startHereMinutes = startHere.reduce(
    (total, lesson) => total + lesson.readingMinutes,
    0,
  );

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="learn"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main className="flex-1">
        <section className="border-line bg-surface-muted border-b">
          <div className="page-container flex flex-col gap-12 py-13 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[620px]">
              <p className="text-accent mb-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                {t('heading')}
              </p>
              <h1 className="text-ink mb-3.5 font-serif text-[44px] leading-[1.1] font-medium tracking-[-0.022em] text-pretty">
                {t('heroHeading')}
              </h1>
              <p className="text-ink-body text-lg leading-relaxed">
                {t('heroBody')}
              </p>
            </div>

            <dl className="flex gap-10 pb-1.5">
              <div>
                <dd className="text-ink mb-1.5 font-mono text-[30px]">
                  {stats.lessonCount}
                </dd>
                <dt className="text-ink-subtle text-[13px]">
                  {t('stats.lessons')}
                </dt>
              </div>
              <div>
                <dd className="text-ink mb-1.5 font-mono text-[30px]">
                  {t('stats.minutesValue', { minutes: stats.averageMinutes })}
                </dd>
                <dt className="text-ink-subtle text-[13px]">
                  {t('stats.averageRead')}
                </dt>
              </div>
              <div>
                <dd className="text-ink mb-1.5 font-mono text-[30px]">
                  {stats.glossarySize}
                </dd>
                <dt className="text-ink-subtle text-[13px]">
                  {t('stats.jargon')}
                </dt>
              </div>
            </dl>
          </div>
        </section>

        <div className="page-container pt-11">
          <LessonSearch entries={searchIndex} />

          <ContinueReading lessons={allLessons} />

          <SectionHeading
            title={t('startHere')}
            size="lg"
            rule="strong"
            action={{
              label: t('startHereMeta', {
                count: startHere.length,
                minutes: startHereMinutes,
              }),
            }}
          />
          <div className="mt-6.5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {startHere.map((lesson, index) => (
              <LessonCard key={lesson.id} lesson={lesson} index={index} />
            ))}
          </div>
        </div>

        {primaryTopic ? (
          <div className="page-container pt-11">
            <SectionHeading
              title={primaryTopic.title}
              action={{
                label: t('lessonCount', { count: primaryTopic.lessonCount }),
              }}
            />
            <TopicProgress
              slugs={primaryTopic.lessons.map((lesson) => lesson.slug)}
              title={primaryTopic.title}
            />
            <ul>
              {primaryTopic.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  // The whole row is the hit target: the title alone is a
                  // thin thing to aim at, and the summary beside it looked
                  // clickable without being so. `after:inset-0` on the link
                  // stretches it over the row while the accessible name stays
                  // the title, rather than title plus level plus minutes.
                  className="border-line hover:bg-accent/10 group relative -mx-3 grid grid-cols-[1fr_auto_auto] items-center gap-x-8 border-t px-3 py-4 transition-colors last:border-b"
                >
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-x-3">
                      <Link
                        href={`/learn/${lesson.slug}`}
                        className="text-ink group-hover:text-accent text-base transition-colors after:absolute after:inset-0 after:z-10"
                      >
                        {lesson.title}
                      </Link>
                      <LessonTick slug={lesson.slug} variant="inline" />
                    </div>
                    {lesson.summary ? (
                      <p className="text-ink-faint text-sm">{lesson.summary}</p>
                    ) : null}
                  </div>
                  <span className="text-ink-faint text-[13px]">
                    {t(`levels.${lesson.level}`)}
                  </span>
                  <span className="text-ink-subtle min-w-13 text-right font-mono text-[13px]">
                    {t('stats.minutesValue', {
                      minutes: lesson.readingMinutes,
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="page-container grid gap-11 pt-11 lg:grid-cols-2">
          {secondaryTopics.map((topic) => (
            <section key={topic.id}>
              <SectionHeading
                title={topic.title}
                action={{
                  label: t('lessonCount', { count: topic.lessonCount }),
                }}
              />
              <TopicProgress
                slugs={topic.lessons.map((lesson) => lesson.slug)}
                title={topic.title}
              />
              <ul>
                {topic.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="border-line hover:bg-accent/10 group relative -mx-3 flex justify-between gap-5 border-t px-3 py-4 transition-colors last:border-b"
                  >
                    <span className="flex flex-wrap items-center gap-x-3">
                      <Link
                        href={`/learn/${lesson.slug}`}
                        className="text-ink group-hover:text-accent text-base transition-colors after:absolute after:inset-0 after:z-10"
                      >
                        {lesson.title}
                      </Link>
                      <LessonTick slug={lesson.slug} variant="inline" />
                    </span>
                    <span className="text-ink-subtle font-mono text-[13px] whitespace-nowrap">
                      {t('stats.minutesValue', {
                        minutes: lesson.readingMinutes,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="page-container py-11">
          <section className="border-line bg-surface rounded-sm border p-8 sm:p-9">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-ink mb-1.5 font-serif text-[25px] font-medium">
                  {t('jargon.heading')}
                </h2>
                <p className="text-ink-muted text-[15px]">
                  {t('jargon.subheading')}
                </p>
              </div>
              <Link
                href="/learn/glossary"
                className="text-accent text-[13px] hover:underline"
              >
                {t('jargon.seeAll', { count: stats.glossarySize })}
              </Link>
            </div>

            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {glossary.map((entry, index) => (
                <div
                  key={entry.term}
                  className={
                    index === 0
                      ? 'lg:pr-6.5'
                      : 'lg:border-line-soft lg:border-l lg:px-6.5 lg:last:pr-0'
                  }
                >
                  <dt className="text-ink mb-1.5 text-base font-medium">
                    {entry.term}
                  </dt>
                  <dd className="text-ink-muted text-[14.5px] leading-relaxed">
                    {entry.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
