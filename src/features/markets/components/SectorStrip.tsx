import { getTranslations } from 'next-intl/server';
import { ChangeValue } from '@/components/ChangeValue';
import { SectionHeading } from '@/components/SectionHeading';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { getQuotesFor } from '@/lib/api/markets';
import { toMarketPath } from '@/lib/utils/marketPath';
import { SECTOR_ETFS } from '../sectorMeta';

export interface SectorStripProps {
  locale: Locale;
}

export async function SectorStrip({ locale }: SectorStripProps) {
  const [t, tSectors, quotes] = await Promise.all([
    getTranslations({ locale, namespace: 'markets' }),
    getTranslations({ locale, namespace: 'markets.sectors' }),
    getQuotesFor(SECTOR_ETFS.map((s) => s.symbol)),
  ]);

  if (quotes.length === 0) return null;

  const byTicker = new Map(
    quotes.map((q) => [(q.providerSymbol ?? q.symbol).toUpperCase(), q]),
  );

  const sorted = SECTOR_ETFS.map((etf) => {
    const quote = byTicker.get(etf.symbol.toUpperCase());
    return { etf, quote };
  }).sort(
    (a, b) => (b.quote?.changePercent ?? 0) - (a.quote?.changePercent ?? 0),
  );

  return (
    <section>
      <SectionHeading
        title={t('sectorPerformance.heading')}
        action={{ label: t('sectorPerformance.subtitle') }}
      />
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sorted.map(({ etf, quote }) => (
          <li key={etf.symbol}>
            <Link
              href={toMarketPath(etf.symbol)}
              className="border-line hover:border-accent bg-surface flex flex-col rounded-sm border p-3 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-ink text-[13px] leading-tight font-medium">
                  {tSectors(etf.key)}
                </span>
                <span className="text-accent font-mono text-[10.5px] tracking-[0.06em]">
                  {etf.symbol}
                </span>
              </div>
              <div className="mt-2">
                <ChangeValue
                  percent={quote?.changePercent ?? 0}
                  className="text-[13.5px]"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
