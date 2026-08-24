import { useLocale, useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import type { CalendarEvent } from '@/features/calendar';
import { formatTimestamp } from '@/features/calendar/formatDate';
import { ComingUp } from '@/features/markets/components/ComingUp';
import { TickerStrip } from '@/features/markets/components/TickerStrip';
import type { Quote } from '@/features/markets/marketsTypes';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { ArticleCard } from './components/ArticleCard';
import { CategoryTabs, type CategoryFilter } from './components/CategoryTabs';
import { MostRead } from './components/MostRead';
import { WhyItMatters } from './components/WhyItMatters';
import type { MostReadEntry } from './newsData';
import type { NewsArticle } from './newsTypes';

export interface NewsPageProps {
  tickerQuotes: Quote[];
  lead: NewsArticle;
  articles: NewsArticle[];
  mostRead: MostReadEntry[];
  upcomingEvents: CalendarEvent[];
  category: CategoryFilter;
  updatedAt: string;
  /** Mirrors the design's sc-if props. */
  showWhyItMatters?: boolean;
  showComingUp?: boolean;
}

export function NewsPage({
  tickerQuotes,
  lead,
  articles,
  mostRead,
  upcomingEvents,
  category,
  updatedAt,
  showWhyItMatters = true,
  showComingUp = true,
}: NewsPageProps) {
  const t = useTranslations('news');
  const locale = useLocale() as Locale;

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader active="news" />
      <TickerStrip quotes={tickerQuotes} />

      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-6 pt-10 sm:px-11">
          <div className="mb-5.5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-ink mb-2 font-serif text-[38px] font-medium tracking-[-0.02em]">
                {t('heading')}
              </h1>
              <p className="text-ink-muted text-base">{t('subheading')}</p>
            </div>
            <time dateTime={updatedAt} className="text-ink-faint text-[13px]">
              {formatTimestamp(locale, updatedAt)}
            </time>
          </div>

          <CategoryTabs selected={category} />
        </div>

        <div className="mx-auto flex max-w-[1280px] flex-col gap-11 px-6 pt-8.5 pb-11 sm:px-11 lg:flex-row">
          <div className="min-w-0 flex-1">
            <div className="border-ink border-b-2 pb-8">
              <ArticleCard article={lead} variant="lead" />
              {showWhyItMatters && lead.whyItMatters ? (
                <div className="mt-5.5">
                  <WhyItMatters>{lead.whyItMatters}</WhyItMatters>
                </div>
              ) : null}
            </div>

            {articles.length > 0 ? (
              <>
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="border-line-soft border-b py-6.5 last:border-b-0"
                  >
                    <ArticleCard article={article} variant="list" />
                  </div>
                ))}

                {/* Pagination is not wired yet — the control is shown as the
                    design has it, inactive, rather than linking nowhere. */}
                <div className="flex justify-center pt-3">
                  <span className="text-ink rounded-sm border border-[#d9d4c8] px-6.5 py-3 text-sm font-medium">
                    {t('loadMore')}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-ink-faint py-10 text-center text-[15px]">
                {t('emptyCategory')}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-6 lg:w-84 lg:shrink-0">
            <MostRead entries={mostRead} />

            {showComingUp ? <ComingUp events={upcomingEvents} /> : null}

            <section className="border-line bg-surface-muted rounded-sm border p-6">
              <h2 className="text-accent mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
                {t('newToThis')}
              </h2>
              <p className="text-ink mb-2.5 font-serif text-[21px] leading-[1.25]">
                {t('glossaryHeading')}
              </p>
              <p className="text-ink-muted mb-4 text-[14.5px] leading-relaxed">
                {t('glossaryBody')}
              </p>
              <Link
                href="/learn"
                className="text-accent text-[13px] hover:underline"
              >
                {t('openLearn')}
              </Link>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
