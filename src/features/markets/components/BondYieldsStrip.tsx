import { getTranslations } from 'next-intl/server';
import { ChangeValue } from '@/components/ChangeValue';
import { SectionHeading } from '@/components/SectionHeading';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { getQuotesFor } from '@/lib/api/markets';
import { toMarketPath } from '@/lib/utils/marketPath';
import { TREASURY_YIELDS } from '../sectorMeta';

export interface BondYieldsStripProps {
  locale: Locale;
}

export async function BondYieldsStrip({ locale }: BondYieldsStripProps) {
  const [t, tBonds, quotes] = await Promise.all([
    getTranslations({ locale, namespace: 'markets' }),
    getTranslations({ locale, namespace: 'markets.bonds' }),
    getQuotesFor(TREASURY_YIELDS.map((b) => b.symbol)),
  ]);

  if (quotes.length === 0) return null;

  const byTicker = new Map(
    quotes.map((q) => [(q.providerSymbol ?? q.symbol).toUpperCase(), q]),
  );

  return (
    <section>
      <SectionHeading
        title={t('bondYields.heading')}
        action={{ label: t('bondYields.subtitle') }}
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TREASURY_YIELDS.map((bond) => {
          const quote = byTicker.get(bond.symbol.toUpperCase());
          const yieldValue = quote?.price ?? '—';
          return (
            <li key={bond.symbol}>
              <Link
                href={toMarketPath(bond.symbol)}
                className="border-line hover:border-accent bg-surface flex flex-col rounded-sm border p-4 transition-colors"
              >
                <span className="text-ink-faint text-[10.5px] font-semibold tracking-[0.09em] uppercase">
                  {tBonds(bond.key)}
                </span>
                <span className="text-ink mt-2 font-mono text-[19px]">
                  {yieldValue}
                  <span className="text-ink-faint text-[13px]"> %</span>
                </span>
                <ChangeValue
                  percent={quote?.changePercent ?? 0}
                  className="mt-1 text-[12.5px]"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
