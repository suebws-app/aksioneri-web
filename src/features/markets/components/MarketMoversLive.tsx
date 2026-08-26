'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import { SectionHeading } from '@/components/SectionHeading';
import { Link } from '@/i18n/navigation';
import type { IndexSymbol, Mover, Movers } from '@/lib/api/markets';
import { moversQuery } from '@/lib/query/marketsQueries';

/**
 * Client-polling movers panel. Hydrates from `initial` (fetched server-side
 * so the first paint carries the real numbers), then refreshes every 30 s.
 */
export function MarketMoversLive({
  index,
  initial,
}: {
  index: IndexSymbol;
  initial: Movers;
}) {
  const t = useTranslations('markets.movers');
  const { data } = useQuery(moversQuery(index, initial));
  const movers = data ?? initial;

  return (
    <section>
      <SectionHeading title={t('heading')} action={{ label: t('session') }} />

      <div className="mt-5.5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
        <MoverColumn
          label={t('gainers')}
          movers={movers.gainers}
          showChange
          className="lg:pr-6"
        />
        <MoverColumn
          label={t('losers')}
          movers={movers.losers}
          showChange
          className="lg:border-line lg:border-l lg:px-6"
        />
        <MoverColumn
          label={t('mostWatched')}
          movers={movers.mostWatched}
          showChange={false}
          className="lg:border-line lg:border-l lg:pl-6"
        />
      </div>
    </section>
  );
}

/**
 * One column of the movers panel. Each row links to `/markets/:symbol` so a
 * click opens the constituent's own asset page — the API accepts raw
 * tickers and 404s on anything it cannot resolve.
 */
function MoverColumn({
  label,
  movers,
  showChange,
  className,
}: {
  label: string;
  movers: Mover[];
  showChange: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-ink-faint mb-3.5 text-[11px] font-semibold tracking-[0.11em] uppercase">
        {label}
      </h3>
      <ul className="flex flex-col gap-3 text-[15px]">
        {movers.map((mover) => (
          <li key={mover.symbol}>
            <Link
              href={`/markets/${mover.symbol}`}
              className="hover:text-accent flex justify-between gap-2.5"
            >
              <span className="text-ink">{mover.name}</span>
              {showChange ? (
                <ChangeValue
                  percent={mover.changePercent}
                  className="text-sm"
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
