import { cn } from '@/lib/utils/cn';
import type { ChartSpec } from '../types';
import {
  axisLabels,
  bandPath,
  linePath,
  maxOf,
  niceTicks,
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
  formatY,
  className,
}: {
  spec: ChartSpec;
  formatX: (value: number) => string;
  /** Compact money, for the value scale down the left edge. */
  formatY: (value: number) => string;
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
  const dataMax = stacked
    ? maxOf(stacked)
    : maxOf(spec.series.map((series) => series.values));

  // Scale to the top gridline, not to the data. Otherwise the peak sits on
  // the frame with no label next to it and cannot be read off the axis.
  const { ticks: valueTicks, axisMax: max } = niceTicks(dataMax);

  const labels = axisLabels(spec.x);

  // Denser axis, smaller type. At 40 labels there are ~16 units between them,
  // which only works at 9.
  const xFontSize = labels.length > 30 ? 9 : labels.length > 20 ? 9.5 : 11;

  // Markers stay on every period for as long as they are distinguishable —
  // the axis collapsing into ranges must not thin the data. At 80 points they
  // sit ~8 units apart, which is the floor for a 2.6-radius dot with a gap.
  const showMarkers = count <= 80;

  return (
    <svg
      viewBox={`0 0 ${String(VIEWBOX.width)} ${String(VIEWBOX.height)}`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn('h-[260px] w-full', className)}
    >
      {/* The value scale. Hairline rules rather than a heavy grid: enough to
          carry the eye across to a label, faint enough that the shape of the
          data still reads first. */}
      {valueTicks.map((value) => {
        const y = yAt(value, 0, max);
        const isBase = value === 0;

        return (
          <g key={value}>
            <line
              x1={PADDING.left}
              y1={y}
              x2={PADDING.left + PLOT.width}
              y2={y}
              stroke={isBase ? 'var(--line-strong)' : 'var(--line-soft)'}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={PADDING.left - 10}
              y={y + 3.5}
              textAnchor="end"
              fill="var(--ink-faint)"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
            >
              {formatY(value)}
            </text>
          </g>
        );
      })}

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
                {showMarkers
                  ? upper.map((point, i) => (
                      <circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="2.6"
                        fill="var(--surface)"
                        stroke={seriesColor(index)}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))
                  : null}
              </g>
            );
          })
        : spec.series.map((series, index) => {
            const points = toPoints(series.values, max);

            return (
              <g key={series.idKey}>
                <path
                  d={linePath(points)}
                  fill="none"
                  stroke={seriesColor(index)}
                  strokeWidth={series.emphasis ? 2.5 : 1.5}
                  strokeDasharray={seriesDash(index)}
                  vectorEffect="non-scaling-stroke"
                />
                {showMarkers
                  ? points.map((point, i) => (
                      <circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="2.6"
                        fill="var(--surface)"
                        stroke={seriesColor(index)}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))
                  : null}
              </g>
            );
          })}

      {labels.map((label) => (
        <text
          key={label.index}
          x={xAt(label.index, count)}
          y={VIEWBOX.height - 8}
          // The first and last labels would otherwise hang off the plot.
          textAnchor={
            label.index === 0
              ? 'start'
              : label.index === count - 1
                ? 'end'
                : 'middle'
          }
          fill="var(--ink-faint)"
          fontSize={xFontSize}
          fontFamily="var(--font-mono)"
        >
          {formatX(label.value)}
        </text>
      ))}
    </svg>
  );
}
