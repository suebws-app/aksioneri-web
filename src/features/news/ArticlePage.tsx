import { useLocale, useTranslations } from 'next-intl';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CalculatorEmbed } from '@/features/calculators';
import { ChangeValue } from '@/components/ChangeValue';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import type { CalendarEvent } from '@/features/calendar';
import { formatTimestamp } from '@/features/calendar/formatDate';
import type { Quote } from '@/features/markets/marketsTypes';
import { GlossaryText } from '@/features/learn/components/GlossaryText';
import type { GlossaryTerm, Lesson } from '@/features/learn/learnTypes';
import { GlossaryLinker } from '@/features/learn/linkGlossaryTerms';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { ArticleMeta } from './components/ArticleMeta';
import { NewsImage } from './components/NewsImage';
import { WhyItMatters } from './components/WhyItMatters';
import type { MostReadEntry } from './newsTypes';
import type { NewsArticle } from './newsTypes';

export interface ArticlePageProps {
  article: NewsArticle;
  related: NewsArticle[];
  mostRead: MostReadEntry[];
  mentioned: Quote[];
  nextRelease: CalendarEvent | null;
  relatedLesson: Lesson | null;
  glossary: GlossaryTerm[];
  showWhyItMatters?: boolean;
  showInNumbers?: boolean;
  showTerms?: boolean;
  calculatorEmbed?: string | null;
  showCalculatorEmbed?: boolean;
}

export function ArticlePage({
  article,
  related,
  mostRead,
  mentioned,
  nextRelease,
  relatedLesson,
  glossary,
  showWhyItMatters = true,
  showInNumbers = true,
  showTerms = true,
  calculatorEmbed = null,
  showCalculatorEmbed = true,
}: ArticlePageProps) {
  const t = useTranslations('news');
  const locale = useLocale() as Locale;

  const linker = new GlossaryLinker(glossary);

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="news"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <Breadcrumb
          label={t('breadcrumbLabel')}
          items={[
            { label: t('heading'), href: '/news' },
            { label: t(`categories.${article.category}`) },
          ]}
        />

        <div className="page-container flex flex-col gap-14 pt-7 lg:flex-row">
          <article className="min-w-0 flex-1 lg:max-w-[760px]">
            <h1 className="text-ink mb-4.5 font-serif text-[46px] leading-[1.1] font-medium tracking-[-0.022em] text-pretty">
              {article.title}
            </h1>
            <p className="text-ink-body mb-6.5 text-xl leading-[1.55] text-pretty">
              {article.summary}
            </p>

            {article.author ? (
              <div className="border-line mb-7.5 flex items-center gap-3.5 border-y py-4.5">
                <span
                  aria-hidden
                  className="text-ink-subtle flex size-9.5 items-center justify-center rounded-full bg-[#e9e5da] text-[13px] font-semibold"
                >
                  {article.author.initials}
                </span>
                <div>
                  <p className="text-ink text-[14.5px] font-medium">
                    {article.author.name}
                  </p>
                  <p className="text-ink-faint text-[13px]">
                    {article.author.desk ? `${article.author.desk} · ` : ''}
                    {article.publishedAt
                      ? `${formatTimestamp(locale, article.publishedAt)} · `
                      : ''}
                    {t('readingTime', { minutes: article.readingMinutes })}
                  </p>
                </div>
              </div>
            ) : null}

            <NewsImage
              article={article}
              className="mb-3 h-[400px] w-full"
              sizes="(max-width: 1024px) 100vw, 760px"
              priority
            />

            {(article.heroCaption ?? article.sourceName) ? (
              <p className="text-ink-faint mb-8.5 text-[12.5px]">
                {article.heroCaption ?? ''}{' '}
                <span className="text-ink-ghost">
                  {article.sourceName
                    ? t('photoVia', { source: article.sourceName })
                    : t('photoCredit')}
                </span>
              </p>
            ) : null}

            {showWhyItMatters && article.whyItMatters ? (
              <div className="mb-8.5">
                <WhyItMatters>{article.whyItMatters}</WhyItMatters>
              </div>
            ) : null}

            {article.body?.map((paragraph, index) => (
              <p
                key={index}
                className="mb-5 text-lg leading-[1.72] text-[color:var(--ink-secondary)]"
              >
                <GlossaryText text={paragraph} linker={linker} />
              </p>
            ))}

            {article.sections?.map((section, index) => (
              <section key={section.heading}>
                <h2 className="text-ink mt-9 mb-3.5 font-serif text-[27px] font-medium tracking-[-0.012em]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-5 text-lg leading-[1.72] text-[color:var(--ink-secondary)]"
                  >
                    <GlossaryText text={paragraph} linker={linker} />
                  </p>
                ))}

                {index === 0 && showCalculatorEmbed && calculatorEmbed ? (
                  <CalculatorEmbed slug={calculatorEmbed} locale={locale} />
                ) : null}

                {index === 0 && showInNumbers && article.inNumbers ? (
                  <section className="border-line bg-surface my-7.5 rounded-sm border p-6.5 sm:px-7">
                    <h3 className="text-ink-faint mb-5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                      {t('inNumbers')}
                    </h3>
                    <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                      {article.inNumbers.map((entry, entryIndex) => (
                        <div
                          key={entry.label}
                          className={cn(
                            entryIndex === 0
                              ? 'lg:pr-5.5'
                              : 'lg:border-line-soft lg:border-l lg:px-5.5 lg:last:pr-0',
                          )}
                        >
                          <dd
                            className={cn(
                              'mb-1.5 font-mono text-[25px]',
                              entry.tone === 'positive'
                                ? 'text-positive'
                                : 'text-ink',
                            )}
                          >
                            {entry.value}
                          </dd>
                          <dt className="text-ink-subtle text-[13.5px] leading-snug">
                            {entry.label}
                          </dt>
                        </div>
                      ))}
                    </dl>
                  </section>
                ) : null}

                {index === 0 && article.pullQuote ? (
                  <blockquote className="border-ink my-7.5 border-l-[3px] py-1 pl-6.5">
                    <p className="text-ink mb-3 font-serif text-[25px] leading-[1.4]">
                      “{article.pullQuote.quote}”
                    </p>
                    <footer className="text-ink-faint text-[13.5px]">
                      {article.pullQuote.attribution}
                    </footer>
                  </blockquote>
                ) : null}
              </section>
            ))}

            {showTerms && article.terms ? (
              <section className="border-line bg-surface-muted mt-8.5 mb-8.5 rounded-sm border p-6.5 sm:px-7">
                <div className="mb-4.5 flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-ink font-serif text-xl">
                    {t('termsHeading')}
                  </h2>
                  <Link
                    href="/learn"
                    className="text-accent text-[13px] hover:underline"
                  >
                    {t('jargonBuster')}
                  </Link>
                </div>
                <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
                  {article.terms.map((entry, entryIndex) => (
                    <div
                      key={entry.term}
                      className={
                        entryIndex === 0
                          ? 'lg:pr-6'
                          : 'lg:border-line-strong lg:border-l lg:px-6 lg:last:pr-0'
                      }
                    >
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

            {related.length > 0 ? (
              <section className="border-ink border-t-2 pt-7.5">
                <h2 className="text-ink mb-5.5 font-serif text-2xl font-medium">
                  {t('moreOnThis')}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((entry) => (
                    <article key={entry.id}>
                      <Link
                        href={`/news/${entry.slug}`}
                        className="mb-3.5 block"
                        aria-label={entry.title}
                      >
                        <NewsImage
                          article={entry}
                          className="h-33 w-full"
                          sizes="(max-width: 640px) 100vw, 240px"
                        />
                      </Link>
                      <p className="text-accent mb-2 text-[11px] font-semibold tracking-[0.12em] uppercase">
                        {t(`categories.${entry.category}`)}
                      </p>
                      <h3 className="text-ink mb-2 line-clamp-2 font-serif text-[19px] leading-[1.26] font-medium">
                        <Link
                          href={`/news/${entry.slug}`}
                          className="hover:text-accent"
                        >
                          {entry.title}
                        </Link>
                      </h3>
                      <ArticleMeta article={entry} className="text-[12.5px]" />
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="flex flex-col gap-6 lg:w-79 lg:shrink-0">
            {mentioned.length > 0 ? (
              <section className="border-line bg-surface rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('mentioned')}
                </h2>
                <ul>
                  {mentioned.map((quote) => (
                    <li
                      key={quote.symbol}
                      className="border-line-soft border-b last:border-b-0"
                    >
                      <Link
                        href={`/markets/${quote.symbol}`}
                        className="hover:text-accent flex items-center justify-between gap-2.5 py-3.5 first:pt-0"
                      >
                        <span className="text-ink text-[15px] font-medium">
                          {quote.name}
                        </span>
                        <ChangeValue
                          percent={quote.changePercent}
                          className="text-[13.5px]"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {nextRelease ? (
              <section className="border-line rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-ink font-serif text-[19px]">
                  {t('nextRelease')}
                </h2>
                <p className="text-ink-faint mt-1 mb-4 text-[13px]">
                  {t('nextReleaseNote')}
                </p>
                <Link href={`/calendar/${nextRelease.slug}`} className="block">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-ink text-[15px] font-medium">
                      {nextRelease.title}
                    </span>
                    <time className="text-ink-muted font-mono text-[13px]">
                      {nextRelease.time}
                    </time>
                  </div>
                  <div className="text-ink-faint mb-3.5 flex gap-4 text-[13px]">
                    {nextRelease.expected ? (
                      <span>
                        {t('expectedShort')}{' '}
                        <span className="text-ink-secondary font-mono">
                          {nextRelease.expected}
                        </span>
                      </span>
                    ) : null}
                    {nextRelease.previous ? (
                      <span>
                        {t('previousShort')}{' '}
                        <span className="text-ink-secondary font-mono">
                          {nextRelease.previous}
                        </span>
                      </span>
                    ) : null}
                  </div>
                  <span className="text-accent text-[13px]">
                    {t('whatThisMeans')}
                  </span>
                </Link>
              </section>
            ) : null}

            <section className="border-line rounded-sm border p-5.5 sm:px-6">
              <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                {t('mostRead')}
              </h2>
              <ol>
                {mostRead.slice(0, 3).map((entry, index) => (
                  <li
                    key={entry.id}
                    className="border-line-soft flex gap-3.5 border-b py-3.5 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="text-ink-ghost font-mono text-[12.5px]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Link
                      href={`/news/${entry.slug}`}
                      className="text-ink hover:text-accent text-[14.5px] leading-snug"
                    >
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            {relatedLesson ? (
              <section className="border-line bg-surface-muted rounded-sm border p-5.5 sm:px-6">
                <h2 className="text-accent mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {t('newToThis')}
                </h2>
                <p className="text-ink mb-2.5 font-serif text-xl leading-[1.25]">
                  {relatedLesson.title}
                </p>
                <p className="text-ink-muted mb-3.5 text-[14.5px] leading-relaxed">
                  {relatedLesson.summary}
                </p>
                <Link
                  href={`/learn/${relatedLesson.slug}`}
                  className="text-accent text-[13px] hover:underline"
                >
                  {t('readLesson')}
                </Link>
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
