import { useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import { SectionHeading } from '@/components/SectionHeading';
import type { MarketMovers as Movers } from '../marketsTypes';

/** Gainers, losers and most-watched, in three ruled columns. */
export function MarketMovers({ movers }: { movers: Movers }) {
  const t = useTranslations('markets.movers');

  return (
    <section>
      <SectionHeading title={t('heading')} action={{ label: t('session') }} />

      <div className="mt-5.5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
        <div className="lg:pr-6">
          <h3 className="text-ink-faint mb-3.5 text-[11px] font-semibold tracking-[0.11em] uppercase">
            {t('gainers')}
          </h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            {movers.gainers.map((mover) => (
              <li key={mover.name} className="flex justify-between gap-2.5">
                <span className="text-ink">{mover.name}</span>
                <ChangeValue
                  percent={mover.changePercent}
                  className="text-sm"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-line lg:border-l lg:px-6">
          <h3 className="text-ink-faint mb-3.5 text-[11px] font-semibold tracking-[0.11em] uppercase">
            {t('losers')}
          </h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            {movers.losers.map((mover) => (
              <li key={mover.name} className="flex justify-between gap-2.5">
                <span className="text-ink">{mover.name}</span>
                <ChangeValue
                  percent={mover.changePercent}
                  className="text-sm"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-line lg:border-l lg:pl-6">
          <h3 className="text-ink-faint mb-3.5 text-[11px] font-semibold tracking-[0.11em] uppercase">
            {t('mostWatched')}
          </h3>
          <ul className="text-ink flex flex-col gap-3 text-[15px]">
            {movers.mostWatched.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
