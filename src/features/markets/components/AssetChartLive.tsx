'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import {
  fetchCandles,
  type CandleInterval,
  type OhlcBar,
} from '@/lib/api/markets';
import { InteractiveSparkline } from './InteractiveSparkline';

export type Range = '1D' | '1W' | '1M' | '6M' | '1Y' | '5Y';

const RANGES: Range[] = ['1D', '1W', '1M', '6M', '1Y', '5Y'];

interface RangeConfig {
  interval: CandleInterval;
  limit: number;
  aggregate?: number;
  staleTimeMs: number;
}

const RANGE_CONFIG: Record<Range, RangeConfig> = {
  '1D': { interval: '5m', limit: 78, staleTimeMs: 30_000 },
  '1W': { interval: '1h', limit: 168, staleTimeMs: 60_000 },
  '1M': { interval: '4h', limit: 180, staleTimeMs: 5 * 60_000 },
  '6M': { interval: '1d', limit: 180, staleTimeMs: 60 * 60_000 },
  '1Y': { interval: '1d', limit: 365, staleTimeMs: 60 * 60_000 },
  '5Y': { interval: '1d', limit: 1000, aggregate: 5, staleTimeMs: 60 * 60_000 },
};

export interface AssetChartLiveProps {
  symbol: string;
  initialSeries: number[];
  sessionTimes: string[];
  digits?: number;
}

export function AssetChartLive({
  symbol,
  initialSeries,
  sessionTimes,
  digits = 2,
}: AssetChartLiveProps) {
  const [range, setRange] = useState<Range>('1D');
  const locale = useLocale();
  const t = useTranslations('markets.chart');

  const config = RANGE_CONFIG[range];

  const query = useQuery({
    queryKey: ['markets', 'candles', symbol, range] as const,
    queryFn: () => fetchCandles(symbol, config.interval, config.limit),
    staleTime: config.staleTimeMs,
    refetchOnWindowFocus: false,
  });

  const bars = query.data?.bars ?? [];
  const useAggregatedBars = bars.length > 0;

  const { values, times, endLabels } = useAggregatedBars
    ? seriesFromBars(bars, config.aggregate, locale)
    : range === '1D'
      ? {
          values: initialSeries,
          times: undefined as number[] | undefined,
          endLabels: sessionTimes,
        }
      : { values: [] as number[], times: undefined, endLabels: [] };

  const priceFormatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  return (
    <section className="border-line bg-surface mb-8 rounded-sm border p-6.5 sm:px-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap gap-1.5 text-[13px]"
          role="group"
          aria-label={t('rangeLabel')}
        >
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={r === range}
              onClick={() => setRange(r)}
              className={cn(
                'rounded-[3px] px-3.5 py-2 transition-colors',
                r === range
                  ? 'bg-ink text-paper'
                  : 'border-line-strong text-ink-muted hover:text-ink border',
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {values.length >= 2 ? (
        <>
          <InteractiveSparkline
            values={values}
            times={times}
            formatValue={(v) => priceFormatter.format(v)}
            formatTime={tooltipFormatterFor(times, locale)}
            className="h-75"
          />
          {endLabels.length > 0 ? (
            <div className="text-ink-ghost mt-3 flex justify-between font-mono text-[11px]">
              {endLabels.map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="text-ink-faint flex h-75 items-center justify-center text-sm">
          {query.isPending ? t('loading') : t('empty')}
        </div>
      )}
    </section>
  );
}

function seriesFromBars(
  rawBars: OhlcBar[],
  aggregate: number | undefined,
  locale: string,
): { values: number[]; times: number[]; endLabels: string[] } {
  const bars =
    aggregate && aggregate > 1 ? downsample(rawBars, aggregate) : rawBars;
  const values = bars.map((b) => b.close);
  const times = bars.map((b) => b.openTime);
  const endLabels = axisLabels(times, locale);
  return { values, times, endLabels };
}

function downsample(bars: OhlcBar[], size: number): OhlcBar[] {
  const out: OhlcBar[] = [];
  for (let i = 0; i + size <= bars.length; i += size) {
    const window = bars.slice(i, i + size);
    const first = window[0] as OhlcBar;
    const last = window[window.length - 1] as OhlcBar;
    out.push({
      openTime: first.openTime,
      open: first.open,
      high: Math.max(...window.map((b) => b.high)),
      low: Math.min(...window.map((b) => b.low)),
      close: last.close,
      volume: window.reduce(
        (sum, b) => (b.volume === null ? sum : sum + b.volume),
        0,
      ),
    });
  }
  return out;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const QUARTER_MS = 90 * DAY_MS;

function axisFormatterFor(spanMs: number, locale: string): Intl.DateTimeFormat {
  if (spanMs < 2 * DAY_MS) {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  if (spanMs < QUARTER_MS) {
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
    });
  }
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  });
}

export function tooltipFormatterFor(
  times: number[] | undefined,
  locale: string,
): (unixMs: number) => string {
  if (!times || times.length < 2) {
    return (unixMs) =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(unixMs);
  }
  const spanMs = (times[times.length - 1] as number) - (times[0] as number);
  const format =
    spanMs < 2 * DAY_MS
      ? new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
        })
      : spanMs < QUARTER_MS
        ? new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })
        : new Intl.DateTimeFormat(locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
  return (unixMs) => format.format(unixMs);
}

function axisLabels(times: number[], locale: string): string[] {
  if (times.length === 0) return [];
  const target = Math.min(6, times.length);
  const step = (times.length - 1) / (target - 1 || 1);
  const spanMs = (times[times.length - 1] as number) - (times[0] as number);
  const format = axisFormatterFor(spanMs, locale);

  return Array.from({ length: target }, (_, i) =>
    format.format(new Date(times[Math.round(i * step)] as number)),
  );
}
