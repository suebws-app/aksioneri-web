import { getTranslations } from 'next-intl/server';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import type { Locale } from '@/i18n/config';
import { CompactList } from './components/CompactList';
import { IndexHeroTile } from './components/IndexHeroTile';
import { MarketMovers } from './components/MarketMovers';
import { MarketPageSearch } from './components/MarketPageSearch';
import { MarketTabs } from './components/MarketTabs';
import { TrendingTable } from './components/TrendingTable';
import {
  HERO_LABELS,
  HERO_SYMBOLS,
  HERO_TICKERS,
  POPULAR_ETFS,
  TRENDING_CRYPTO,
  UNIVERSE,
  type MarketTab,
} from './marketsUniverse';

export interface MarketsIndexPageProps {
  locale: Locale;
  tab: MarketTab;
  basePath: string;
}

export async function MarketsIndexPage({
  locale,
  tab,
  basePath,
}: MarketsIndexPageProps) {
  const t = await getTranslations({ locale, namespace: 'markets' });
  const tabTitles = await getTranslations({
    locale,
    namespace: 'markets.tabTitles',
  });

  const universe = UNIVERSE[tab];
  const title = tabTitles(tab);

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        active="home"
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <div className="page-container pt-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
            <div>
              <h1 className="text-ink font-serif text-[44px] leading-[1.06] font-medium tracking-[-0.022em]">
                {t('indexHeading')}
              </h1>
              <p className="text-ink-muted mt-2 max-w-[62ch] text-[17.5px] leading-[1.55]">
                {t('indexSubheading')}
              </p>
            </div>
            <MarketPageSearch />
          </div>
        </div>

        <div className="page-container mt-6">
          <MarketTabs active={tab} basePath={basePath} />
        </div>

        <div className="page-container mt-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HERO_SYMBOLS.map((symbol) => (
              <IndexHeroTile
                key={symbol}
                symbol={symbol}
                name={HERO_LABELS[symbol] ?? symbol}
                tickerLabel={HERO_TICKERS[symbol] ?? symbol}
              />
            ))}
          </div>
        </div>

        <div className="page-container mt-11">
          <TrendingTable
            locale={locale}
            tab={tab}
            universe={universe}
            title={title}
          />
        </div>

        <div className="page-container mt-11">
          <MarketMovers />
        </div>

        <div className="page-container mt-10 pb-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CompactList
              heading={t('trendingCrypto.heading')}
              note={t('trendingCrypto.note')}
              universe={TRENDING_CRYPTO}
            />
            <CompactList
              heading={t('popularEtfs.heading')}
              note={t('popularEtfs.note')}
              universe={POPULAR_ETFS}
            />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
