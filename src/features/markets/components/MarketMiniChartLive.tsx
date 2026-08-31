'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { ChangeValue } from '@/components/ChangeValue';
import { Link } from '@/i18n/navigation';
import {
  fetchCandles,
  type AssetDetail,
  type SupportedSymbol,
} from '@/lib/api/markets';
import { formatQuotePrice, quotePrecisionOf } from '@/lib/format/quotePrice';
import { assetQuery } from '@/lib/query/marketsQueries';
import { cn } from '@/lib/utils/cn';
import { toMarketPath } from '@/lib/utils/marketPath';
import { marketsSocket, type LiveQuote } from '@/lib/websockets/marketsSocket';
import { usePriceFlash } from '../usePriceFlash';
import { InteractiveSparkline } from './InteractiveSparkline';
import { tooltipFormatterFor } from './AssetChartLive';

export function MarketMiniChartLive({
  symbol,
  initial,
  className,
}: {
  symbol: SupportedSymbol;
  initial: AssetDetail;
  className?: string;
}) {
  const locale = useLocale();
  const { data } = useQuery(assetQuery(symbol, initial));
  const asset = data ?? initial;

  const [livePrice, setLivePrice] = useState(asset.price);
  const [liveChangePercent, setLiveChangePercent] = useState(
    asset.changePercent,
  );

  const precision = useMemo(
    () => quotePrecisionOf(initial.price),
    [initial.price],
  );
  const { digits } = precision;

  useEffect(() => {
    const dispose = marketsSocket.subscribe([symbol], (tick: LiveQuote) => {
      if (tick.price !== null) {
        setLivePrice(formatQuotePrice(tick.price, precision));
      }
      if (tick.changePercent !== null) setLiveChangePercent(tick.changePercent);
    });
    return dispose;
  }, [symbol, precision]);

  const candlesQuery = useQuery({
    queryKey: ['markets', 'candles', symbol, '1W'] as const,
    queryFn: () => fetchCandles(symbol, '1h', 168),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const { values, times, axisLabels } = useMemo(() => {
    const bars = candlesQuery.data?.bars ?? [];
    if (bars.length === 0) {
      return {
        values: asset.series,
        times: undefined as number[] | undefined,
        axisLabels: [] as string[],
      };
    }
    return {
      values: bars.map((b) => b.close),
      times: bars.map((b) => b.openTime),
      axisLabels: weeklyAxisLabels(
        bars.map((b) => b.openTime),
        locale,
      ),
    };
  }, [candlesQuery.data, asset.series, locale]);

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }),
    [locale, digits],
  );

  const flash = usePriceFlash(livePrice);

  return (
    <section className={cn('flex flex-col gap-2.5', className)}>
      <Link
        href={toMarketPath(asset.symbol)}
        className="hover:text-accent flex items-baseline justify-between"
      >
        <span className="text-ink text-[15px] font-medium">{asset.name}</span>
        <span className="flex items-baseline gap-2">
          <span
            className={cn(
              'font-mono text-sm transition-colors duration-500',
              flash === 'up'
                ? 'text-positive'
                : flash === 'down'
                  ? 'text-negative'
                  : 'text-ink-secondary',
            )}
          >
            {livePrice}
          </span>
          <ChangeValue percent={liveChangePercent} className="text-xs" />
        </span>
      </Link>
      <InteractiveSparkline
        values={values}
        times={times}
        formatValue={(v) => priceFormatter.format(v)}
        formatTime={tooltipFormatterFor(times, locale)}
        className="h-35"
      />
      {axisLabels.length > 0 ? (
        <div className="text-ink-ghost flex justify-between font-mono text-[10.5px]">
          {axisLabels.map((label, index) => (
            <span key={`${label}-${index}`}>{label}</span>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function weeklyAxisLabels(times: number[], locale: string): string[] {
  if (times.length === 0) return [];
  const target = Math.min(4, times.length);
  const step = (times.length - 1) / (target - 1 || 1);
  const format = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
  });
  return Array.from({ length: target }, (_, i) =>
    format.format(new Date(times[Math.round(i * step)] as number)),
  );
}
