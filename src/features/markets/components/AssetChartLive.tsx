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

/**
 * Chart card on the asset page: line + hover tooltip + range switcher.
 *
 * The design shows six range buttons — 1D/1W/1M/6M/1Y/5Y. Each maps to a
 * BiQuote OHLC interval and bar limit; clicking swaps the series into the
 * sparkline without reloading the page. 5Y is downsampled from daily to
 * weekly bars client-side, because BiQuote publishes intervals up to `1d`
 * and 5 years of daily bars exceeds its per-response cap.
 *
 * SSR seeds the 1D view from `asset.series` (Yahoo intraday) so the first
 * paint has real numbers even before the OHLC call resolves. Every other
 * range fetches on click; TanStack Query caches per-(symbol, range) so
 * bouncing between them is free after the first visit.
 */
export type Range = '1D' | '1W' | '1M' | '6M' | '1Y' | '5Y';

const RANGES: Range[] = ['1D', '1W', '1M', '6M', '1Y', '5Y'];

interface RangeConfig {
  interval: CandleInterval;
  limit: number;
  /**
   * When set, aggregate the returned bars into buckets of this many bars
   * client-side. 5Y uses this to fold daily bars into weekly ones.
   */
  aggregate?: number;
  /** Roughly how long a bar of this interval stays fresh. */
  staleTimeMs: number;
}

const RANGE_CONFIG: Record<Range, RangeConfig> = {
  '1D': { interval: '5m', limit: 78, staleTimeMs: 30_000 },
  '1W': { interval: '1h', limit: 168, staleTimeMs: 60_000 },
  '1M': { interval: '4h', limit: 180, staleTimeMs: 5 * 60_000 },
  '6M': { interval: '1d', limit: 180, staleTimeMs: 60 * 60_000 },
  '1Y': { interval: '1d', limit: 365, staleTimeMs: 60 * 60_000 },
  // BiQuote caps `limit` at 1000 and offers no weekly interval, so 5Y
  // pulls the maximum daily window (~2.7y) and folds every five bars
  // into one to stay under the point budget the chart draws well.
  '5Y': { interval: '1d', limit: 1000, aggregate: 5, staleTimeMs: 60 * 60_000 },
};

export interface AssetChartLiveProps {
  symbol: string;
  /**
   * Server-rendered fallback for 1D — the closes from Yahoo's intraday
   * `asset.series`. Bridges the gap between first paint and the OHLC
   * fetch settling.
   */
  initialSeries: number[];
  /**
   * Session tick labels ('09:30', …) for the axis strip under the chart.
   * Only used on 1D; other ranges render their own bracket labels.
   */
  sessionTimes: string[];
  /**
   * Decimal places on the price display — inferred by the caller from
   * the SSR'd formatted string so the tooltip matches the header.
   */
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

  // Once the OHLC call resolves, take those bars over the SSR fallback.
  // Before that (or on error), fall back to `initialSeries` for 1D so
  // the chart never blanks out; other ranges render an empty state
  // until the fetch lands.
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
        {/* Range abbreviations (1D/1W/…) are universal in finance so
            they stay untranslated in every locale. */}
        <ul className="flex flex-wrap gap-1.5 text-[13px]" role="tablist">
          {RANGES.map((r) => (
            <li key={r}>
              <button
                type="button"
                role="tab"
                aria-selected={r === range}
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
            </li>
          ))}
        </ul>
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
          {/* A fetch that lands empty on a quiet weekend for one range
              is not an error, just no data — separate copy for both. */}
          {query.isPending ? t('loading') : t('empty')}
        </div>
      )}
    </section>
  );
}

/**
 * Turns raw OHLC bars into the arrays the sparkline reads: closing prices,
 * per-bar timestamps for the tooltip, and a handful of x-axis labels
 * spread across the range. `aggregate` folds every N bars into one — used
 * by 5Y to render weekly candles from BiQuote's daily feed.
 */
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

/**
 * Folds every `size` bars into one, using the first bar's `openTime` and
 * `open`, the last bar's `close`, and the running high/low. Volume sums.
 * Ignores the trailing partial bucket so the last point is always a full
 * period — otherwise a monday-sampled 5-day window would render one
 * strong daily tail dragging the whole line.
 */
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

/**
 * Three-tier date formatting so the axis and tooltip read correctly on
 * every range without a per-range branch at the call site.
 *
 * - < 2 days   → `HH:mm`               (intraday, time of day is enough)
 * - 2d – 90d   → `dd MMM` on the axis, `dd MMM HH:mm` in the tooltip
 * - > 90 days  → `MMM yyyy` on the axis, `dd MMM yyyy` in the tooltip
 *                (a 5-year chart labelled just "Aug" is ambiguous by year;
 *                the year suffix disambiguates the tooltip too)
 */
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

/**
 * Tooltip variant — same tiers, one notch more detail than the axis so
 * the reader gets both the coarse label (which month, which year) and
 * the precise instant they hovered on.
 */
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

/**
 * A handful of x-axis labels spread evenly across the series. Fixed at
 * six ticks to match the design's grid; a shorter series gets fewer.
 */
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
