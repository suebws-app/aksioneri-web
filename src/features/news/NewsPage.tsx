import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import type { CalendarEvent } from '@/features/calendar';
import { ComingUp } from '@/features/markets/components/ComingUp';
import { MarketTicker } from '@/features/markets/components/MarketTicker';
import { Link } from '@/i18n/navigation';
import { ArticleCard } from './components/ArticleCard';
import { ArticleFeed } from './components/ArticleFeed';
import { CategoryTabs, type CategoryFilter } from './components/CategoryTabs';
import { MostRead } from './components/MostRead';
import { WhyItMatters } from './components/WhyItMatters';
import type {
  ArticleFeed as ArticleFeedPage,
  MostReadEntry,
  NewsArticle,
} from './newsTypes';

export interface NewsPageProps {
  /** Null while the wire is empty — a cold API, or a first ingest still running. */
  lead: NewsArticle | null;
  /** Page one of the wire; the feed appends the rest in place. */
  feed: ArticleFeedPage;
  mostRead: MostReadEntry[];
  upcomingEvents: CalendarEvent[];
  category: CategoryFilter;
  /** Mirrors the design's sc-if props. */
  showWhyItMatters?: boolean;
  showComingUp?: boolean;
}

export function NewsPage({
  lead,
  feed,
  mostRead,
  upcomingEvents,
  category,
  showWhyItMatters = true,
  showComingUp = true,
}: NewsPageProps) {
  const t = useTranslations('news');

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="news"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />
      <MarketTicker />

      <main id="main-content" className="flex-1">
        <div className="page-container pt-10">
          <div className="mb-5.5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-ink mb-2 font-serif text-[38px] font-medium tracking-[-0.02em]">
                {t('heading')}
              </h1>
              <p className="text-ink-muted text-base">{t('subheading')}</p>
            </div>
          </div>

          <CategoryTabs selected={category} />
        </div>

        <div className="page-container flex flex-col gap-11 pt-8.5 pb-11 lg:flex-row">
          <div className="min-w-0 flex-1">
            {lead ? (
              <div className="border-ink border-b-2 pb-8">
                <ArticleCard article={lead} variant="lead" />
                {showWhyItMatters && lead.whyItMatters ? (
                  <div className="mt-5.5">
                    <WhyItMatters>{lead.whyItMatters}</WhyItMatters>
                  </div>
                ) : null}
              </div>
            ) : null}

            <ArticleFeed
              initialPage={feed}
              {...(category === 'all' ? {} : { category })}
              {...(lead ? { excludeId: lead.id } : {})}
            />
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
