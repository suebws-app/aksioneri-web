import { cn } from '@/lib/utils/cn';
import type { ChartSpec } from '../types';
import {
  axisTicks,
  bandPath,
  linePath,
  maxOf,
  PADDING,
  PLOT,
  stack,
  VIEWBOX,
  xAt,
  yAt,
  type Point,
} from './geometry';

/**
 * The drawing itself. Server-rendered, no state, no refs, no effects.
 *
 * `aria-hidden`, deliberately: the accessible version of this chart is the
 * summary sentence and the data table beside it, both of which say more than
 * a screen reader could ever get from a path element.
 *
 * **Colour never carries meaning alone.** Each series gets a distinct dash
 * pattern as well as a distinct token, and the legend beside the chart repeats
 * both — the rule `ChangeValue.tsx` sets for the rest of the site. A reader
 * who cannot separate the two blues still has the dashes and the labels.
 */

/** Series colours, in order. Defined in `globals.css`, ≥3:1 against the surface. */
export const SERIES_COLOR = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
] as const;

/** Solid, then increasingly open dashes, so order is legible without colour. */
export const SERIES_DASH = ['', '6 3', '2 3', '9 3 2 3'] as const;

export const seriesColor = (index: number): string =>
  SERIES_COLOR[index % SERIES_COLOR.length] ?? SERIES_COLOR[0];

export const seriesDash = (index: number): string =>
  SERIES_DASH[index % SERIES_DASH.length] ?? '';

export function PlotSvg({
  spec,
  formatX,
  className,
}: {
  spec: ChartSpec;
  formatX: (value: number) => string;
  className?: string;
}) {
  const count = spec.x.length;
  if (count === 0) return null;

  const toPoints = (values: readonly number[], max: number): Point[] =>
    values.map((value, index) => ({
      x: xAt(index, count),
      y: yAt(value, 0, max),
    }));

  const baseline: Point[] = spec.x.map((_, index) => ({
    x: xAt(index, count),
    y: yAt(0, 0, 1),
  }));

  const stacked = spec.kind === 'stackedArea' ? stack(spec.series) : null;

  // A stacked chart is scaled by the total, a line chart by the tallest
  // series: stacking by the tallest series would push the top band off the
  // plot.
  const max = stacked
    ? maxOf(stacked)
    : maxOf(spec.series.map((series) => series.values));

  const ticks = axisTicks(count);

  return (
    <svg
      viewBox={`0 0 ${String(VIEWBOX.width)} ${String(VIEWBOX.height)}`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn('h-[220px] w-full', className)}
    >
      {/* Baseline. The only rule drawn: gridlines behind a two-band area
          chart add ink without adding information. */}
      <line
        x1={PADDING.left}
        y1={PADDING.top + PLOT.height}
        x2={PADDING.left + PLOT.width}
        y2={PADDING.top + PLOT.height}
        stroke="var(--line)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {stacked
        ? spec.series.map((series, index) => {
            const upper = toPoints(stacked[index] ?? [], max);
            const lower =
              index === 0 ? baseline : toPoints(stacked[index - 1] ?? [], max);

            return (
              <g key={series.idKey}>
                <path
                  d={bandPath(upper, lower)}
                  fill={seriesColor(index)}
                  fillOpacity={index === 0 ? 0.85 : 0.45}
                />
                <path
                  d={linePath(upper)}
                  fill="none"
                  stroke={seriesColor(index)}
                  strokeWidth="1.5"
                  strokeDasharray={seriesDash(index)}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })
        : spec.series.map((series, index) => (
            <path
              key={series.idKey}
              d={linePath(toPoints(series.values, max))}
              fill="none"
              stroke={seriesColor(index)}
              strokeWidth={series.emphasis ? 2.5 : 1.5}
              strokeDasharray={seriesDash(index)}
              vectorEffect="non-scaling-stroke"
            />
          ))}

      {ticks.map((index) => {
        const value = spec.x[index];
        if (value === undefined) return null;

        return (
          <text
            key={index}
            x={xAt(index, count)}
            y={VIEWBOX.height - 8}
            // The first and last labels would otherwise hang off the plot.
            textAnchor={
              index === 0 ? 'start' : index === count - 1 ? 'end' : 'middle'
            }
            fill="var(--ink-faint)"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            {formatX(value)}
          </text>
        );
      })}
    </svg>
  );
}
