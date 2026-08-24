import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/SectionHeading';
import { Link } from '@/i18n/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import type { CalendarEvent } from '@/features/calendar';
import { formatTimestamp } from '@/features/calendar/formatDate';
import type { Locale } from '@/i18n/config';
import { LessonCard } from '@/features/learn/components/LessonCard';
import type { Lesson } from '@/features/learn/learnTypes';
import { ArticleCard } from '@/features/news/components/ArticleCard';
import { WhyItMatters } from '@/features/news/components/WhyItMatters';
import type { NewsArticle } from '@/features/news/newsTypes';
import { ComingUp } from './components/ComingUp';
import { MarketMiniChart } from './components/MarketMiniChart';
import { MarketMovers } from './components/MarketMovers';
import { QuoteTable } from './components/QuoteTable';
import { MarketTicker } from './components/MarketTicker';
import type { MarketMovers as Movers, Quote } from './marketsTypes';

export interface MarketsPageProps {
  quotes: Quote[];
  movers: Movers;
  /** Null while the wire is empty — a cold API, or a first ingest still running. */
  featured: NewsArticle | null;
  sidebarStories: NewsArticle[];
  latestNews: NewsArticle[];
  upcomingEvents: CalendarEvent[];
  lessons: Lesson[];
  /** ISO instant shown beside "What matters today". */
  updatedAt: string;
  /** Mirrors the design's three sc-if props. */
  showWhyItMatters?: boolean;
  showMovers?: boolean;
  showComingUp?: boolean;
}

export function MarketsPage({
  quotes,
  movers,
  featured,
  sidebarStories,
  latestNews,
  upcomingEvents,
  lessons,
  updatedAt,
  showWhyItMatters = true,
  showMovers = true,
  showComingUp = true,
}: MarketsPageProps) {
  const t = useTranslations('markets');
  const locale = useLocale() as Locale;

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader active="markets" />
      <MarketTicker />

      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-6 pt-11 pb-10 sm:px-11">
          <SectionHeading title={t('todayHeading')} size="lg" rule="strong">
            <time dateTime={updatedAt} className="text-ink-faint text-[13px]">
              {formatTimestamp(locale, updatedAt)}
            </time>
          </SectionHeading>

          <div className="mt-7.5 flex flex-col gap-11 lg:flex-row">
            <div className="min-w-0 flex-1">
              {featured ? (
                <>
                  <ArticleCard article={featured} variant="lead" />
                  {showWhyItMatters && featured.whyItMatters ? (
                    <div className="mt-6">
                      <WhyItMatters>{featured.whyItMatters}</WhyItMatters>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>

            <div className="flex flex-col lg:w-[372px] lg:shrink-0">
              {sidebarStories.map((story) => (
                <div
                  key={story.id}
                  className="border-line border-b py-5.5 first:pt-0"
                >
                  <ArticleCard article={story} variant="sidebar" />
                </div>
              ))}
              <MarketMiniChart symbol="sp-500" className="pt-6" />
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1280px] flex-col gap-11 px-6 pb-11 sm:px-11 lg:flex-row">
          <section className="lg:w-[528px] lg:shrink-0">
            <SectionHeading
              title={t('quotesHeading')}
              action={{ label: t('viewAllMarkets'), href: '/markets' }}
            />
            <QuoteTable quotes={quotes} />
          </section>

          {showMovers ? (
            <div className="min-w-0 flex-1">
              <MarketMovers movers={movers} />
            </div>
          ) : null}
        </div>

        <div className="border-line bg-surface border-t">
          <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-11">
            <SectionHeading
              title={t('latestNewsHeading')}
              action={{ label: t('viewAllNews'), href: '/news' }}
            />

            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="min-w-0 flex-1">
                {latestNews.map((article) => (
                  <div
                    key={article.id}
                    className="border-line-soft border-b py-5.5 last:border-b-0"
                  >
                    <ArticleCard article={article} variant="row" />
                  </div>
                ))}
              </div>

              {showComingUp ? (
                <div className="mt-5.5 lg:w-80 lg:shrink-0">
                  <ComingUp events={upcomingEvents} />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="border-line bg-surface-muted border-t">
          <div className="mx-auto max-w-[1280px] px-6 py-11 sm:px-11">
            <div className="mb-6.5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-ink mb-1.5 font-serif text-[27px] font-medium">
                  {t('learnHeading')}
                </h2>
                <p className="text-ink-muted text-base">
                  {t('learnSubheading')}
                </p>
              </div>
              <Link
                href="/learn"
                className="text-accent text-sm whitespace-nowrap hover:underline"
              >
                {t('exploreLearn')}
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson, index) => (
                <LessonCard key={lesson.id} lesson={lesson} index={index} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
