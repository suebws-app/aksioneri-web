import { useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import { Sparkline } from '@/components/Sparkline';
import type { IndexSnapshot } from '../marketsTypes';

/** The lead index with its intraday line, in the homepage sidebar. */
export function IndexChart({ snapshot }: { snapshot: IndexSnapshot }) {
  const t = useTranslations('markets');

  return (
    <section className="pt-6">
      <div className="mb-1 flex items-baseline justify-between">
        <h3 className="text-ink text-[13px] font-semibold">
          {t('indexToday', { name: snapshot.name })}
        </h3>
        <ChangeValue percent={snapshot.changePercent} className="text-[13px]" />
      </div>

      <p className="text-ink mb-2.5 font-mono text-2xl">{snapshot.price}</p>

      <Sparkline values={snapshot.series} className="h-32" />

      <div className="text-ink-ghost mt-1.5 flex justify-between font-mono text-[11px]">
        {snapshot.sessionTimes.map((time) => (
          <span key={time}>{time}</span>
        ))}
      </div>
    </section>
  );
}
