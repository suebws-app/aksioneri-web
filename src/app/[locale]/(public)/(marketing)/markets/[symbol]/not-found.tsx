import { useTranslations } from 'next-intl';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { MarketPageSearch } from '@/features/markets/components/MarketPageSearch';
import { NavSearch } from '@/features/search';
import { Link } from '@/i18n/navigation';
import { toMarketPath } from '@/lib/utils/marketPath';

const FEATURED_TICKERS = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'TSLA'];

export default function AssetNotFound() {
  const t = useTranslations('markets.assetNotFound');

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />

      <main id="main-content" className="flex-1">
        <div className="page-container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-ink-faint font-mono text-6xl tracking-widest">
              404
            </p>
            <h1 className="text-ink mt-3 font-serif text-3xl leading-tight font-medium text-balance">
              {t('heading')}
            </h1>
            <p className="text-ink-body mx-auto mt-4 max-w-120">{t('body')}</p>

            <div className="mt-8 flex justify-center">
              <MarketPageSearch />
            </div>

            <div className="mt-10">
              <h2 className="text-ink-faint mb-4 text-[11px] font-semibold tracking-[0.12em] uppercase">
                {t('featuredHeading')}
              </h2>
              <ul className="flex flex-wrap justify-center gap-2">
                {FEATURED_TICKERS.map((ticker) => (
                  <li key={ticker}>
                    <Link
                      href={toMarketPath(ticker)}
                      className="border-line hover:border-accent hover:text-accent bg-surface text-ink-muted inline-block rounded-sm border px-3.5 py-1.5 font-mono text-[13px] transition-colors"
                    >
                      {ticker}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/markets"
                className="text-accent inline-block font-medium underline underline-offset-4"
              >
                {t('backToMarkets')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
