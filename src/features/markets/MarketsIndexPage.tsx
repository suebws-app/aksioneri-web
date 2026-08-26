import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/SectionHeading';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';
import { QuoteTableLive } from './components/QuoteTableLive';
import { MarketTicker } from './components/MarketTicker';
import type { Quote } from '@/lib/api/markets';

/**
 * The full instrument list.
 *
 * The homepage is the markets *overview* — a lead index, movers, news — and
 * shows only the top handful of quotes. This is the plain index behind its
 * "view all" link, which pointed at a route that did not exist.
 *
 * Every group's table is rendered by `QuoteTableLive`, which subscribes to
 * the markets WebSocket for its symbols and patches the shared TanStack
 * cache on every tick — so the whole page auto-updates, no timestamp
 * needed. Adding a new instrument means:
 *   1. Add its symbol to `SUPPORTED_SYMBOLS` in the API
 *      (`markets.symbols.ts`) with a `SYMBOL_META` entry (precision,
 *      session, provider mapping).
 *   2. Mirror it in `SUPPORTED_SYMBOLS` in `lib/api/markets.ts`.
 *   3. Add it to the right `GROUPS` bucket in `markets/page.tsx`.
 * No changes here — the table renders whatever quotes it receives.
 */
export interface MarketsIndexPageProps {
  /** Every instrument, grouped for display. */
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

      <main className="flex-1">
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
