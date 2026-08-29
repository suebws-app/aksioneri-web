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

export const SERIES_COLOR = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
] as const;

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

  const dataMax = stacked
    ? maxOf(stacked)
    : maxOf(spec.series.map((series) => series.values));

  const { ticks: valueTicks, axisMax: max } = niceTicks(dataMax);

  const labels = axisLabels(spec.x);

  const xFontSize = labels.length > 30 ? 9 : labels.length > 20 ? 9.5 : 11;

  const showMarkers = count <= 80;

  return (
    <svg
      viewBox={`0 0 ${String(VIEWBOX.width)} ${String(VIEWBOX.height)}`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn('h-[260px] w-full', className)}
    >
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
