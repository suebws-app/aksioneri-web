import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { QuoteTableLive } from './components/QuoteTableLive';
import { MarketTicker } from './components/MarketTicker';
import type { Quote } from '@/lib/api/markets';

export interface MarketsIndexPageProps {
  groups: { key: string; quotes: Quote[] }[];
}

export function MarketsIndexPage({ groups }: MarketsIndexPageProps) {
  const t = useTranslations('markets');

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="home"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />
      <MarketTicker />

      <main id="main-content" className="flex-1">
        <div className="page-container pt-10">
          <div className="mb-8">
            <h1 className="text-ink mb-2 font-serif text-[38px] font-medium tracking-[-0.02em]">
              {t('indexHeading')}
            </h1>
            <p className="text-ink-muted text-base">{t('indexSubheading')}</p>
          </div>
        </div>

        <div className="page-container flex flex-col gap-10 pb-11">
          {groups.map((group) => (
            <section key={group.key}>
              <SectionHeading title={t(`groups.${group.key}`)} />
              <QuoteTableLive initial={group.quotes} />
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
