'use client';

import { useQuery } from '@tanstack/react-query';
import { ChangeValue } from '@/components/ChangeValue';
import { Link } from '@/i18n/navigation';
import { Sparkline } from '@/components/Sparkline';
import type { AssetDetail, SupportedSymbol } from '@/lib/api/markets';
import { assetQuery } from '@/lib/query/marketsQueries';
import { cn } from '@/lib/utils/cn';

/**
 * Client-side sparkline for a single instrument.
 *
 * The sidebar variant on the markets homepage. Header (name + last + change)
 * is rendered above the line and updates in place as the poll returns — no
 * separate flash animation because the value change is the animation.
 */
export function MarketMiniChartLive({
  symbol,
  initial,
  className,
}: {
  symbol: SupportedSymbol;
  initial: AssetDetail;
  className?: string;
}) {
  const { data } = useQuery(assetQuery(symbol, initial));
  const asset = data ?? initial;

  return (
    <section className={cn('flex flex-col gap-2.5', className)}>
      <Link
        href={`/markets/${asset.symbol}`}
        className="hover:text-accent flex items-baseline justify-between"
      >
        <span className="text-ink text-[15px] font-medium">{asset.name}</span>
        <span className="flex items-baseline gap-2">
          <span className="text-ink-secondary font-mono text-sm">
            {asset.price}
          </span>
          <ChangeValue percent={asset.changePercent} className="text-xs" />
        </span>
      </Link>
      <Sparkline values={asset.series} className="h-[140px]" />
      <div className="text-ink-ghost flex justify-between font-mono text-[10.5px]">
        {asset.sessionTimes.map((time) => (
          <span key={time}>{time}</span>
        ))}
      </div>
    </section>
  );
}
