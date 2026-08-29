export const VIEWBOX = { width: 720, height: 260 } as const;

export const PADDING = { top: 14, right: 12, bottom: 26, left: 92 } as const;

export const PLOT = {
  width: VIEWBOX.width - PADDING.left - PADDING.right,
  height: VIEWBOX.height - PADDING.top - PADDING.bottom,
} as const;

export interface Point {
  x: number;
  y: number;
}

export const xAt = (index: number, count: number): number =>
  count <= 1 ? PADDING.left : PADDING.left + (index / (count - 1)) * PLOT.width;

export const yAt = (value: number, min: number, max: number): number => {
  const range = max - min || 1;
  return PADDING.top + PLOT.height - ((value - min) / range) * PLOT.height;
};

export function stack(
  series: readonly { values: readonly number[] }[],
): number[][] {
  const length = series[0]?.values.length ?? 0;
  const tops: number[][] = [];

  let running = new Array<number>(length).fill(0);

  for (const entry of series) {
    running = running.map((total, index) => total + (entry.values[index] ?? 0));
    tops.push([...running]);
  }

  return tops;
}

export const maxOf = (rows: readonly (readonly number[])[]): number =>
  rows.reduce(
    (highest, row) =>
      Math.max(
        highest,
        ...row.map((value) => (Number.isFinite(value) ? value : 0)),
      ),
    0,
  );

export const linePath = (points: readonly Point[]): string =>
  points
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    )
    .join(' ');

export const bandPath = (
  upper: readonly Point[],
  lower: readonly Point[],
): string => {
  if (upper.length === 0) return '';

  const back = [...lower].reverse();
  const returnLeg = back
    .map((point) => `L${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ');

  return `${linePath(upper)} ${returnLeg} Z`;
};

export function niceTicks(
  max: number,
  maxTicks = 8,
): { ticks: number[]; axisMax: number } {
  if (!Number.isFinite(max) || max <= 0) return { ticks: [0], axisMax: 1 };

  const LADDER = [1, 2, 2.5, 5] as const;

  let magnitude = 10 ** Math.floor(Math.log10(max / maxTicks));

  for (let decade = 0; decade < 12; decade += 1) {
    for (const rung of LADDER) {
      const step = rung * magnitude;
      const intervals = Math.ceil(max / step);

      if (intervals + 1 <= maxTicks) {
        const axisMax = intervals * step;
        const ticks: number[] = [];

        for (let i = 0; i <= intervals; i += 1) {
          ticks.push(i * step);
        }

        return { ticks, axisMax };
      }
    }
    magnitude *= 10;
  }

  return { ticks: [0, max], axisMax: max };
}

export function axisTicks(count: number, maxLabels = 40): number[] {
  if (count <= 0) return [];
  if (count <= maxLabels) return Array.from({ length: count }, (_, i) => i);

  const step = (count - 1) / (maxLabels - 1);
  const indices = Array.from({ length: maxLabels }, (_, i) =>
    Math.round(i * step),
  );

  return [...new Set(indices)];
}

export interface ChartLayout {
  count: number;
  axisMax: number;
  valueTicks: number[];
  xTicks: number[];
  seriesPoints: Point[][];
  stacked: boolean;
  showMarkers: boolean;
}

export function layoutChart(spec: {
  kind: string;
  x: readonly number[];
  series: readonly { values: readonly number[] }[];
}): ChartLayout {
  const count = spec.x.length;
  const isStacked = spec.kind === 'stackedArea';

  const stackedTops = isStacked ? stack(spec.series) : null;

  const dataMax = stackedTops
    ? maxOf(stackedTops)
    : maxOf(spec.series.map((series) => series.values));

  const { ticks: valueTicks, axisMax } = niceTicks(dataMax);

  const rows = stackedTops ?? spec.series.map((series) => [...series.values]);

  return {
    count,
    axisMax,
    valueTicks,
    xTicks: axisTicks(count),
    seriesPoints: rows.map((values) =>
      values.map((value, index) => ({
        x: xAt(index, count),
        y: yAt(value, 0, axisMax),
      })),
    ),
    stacked: isStacked,
    showMarkers: count <= 26,
  };
}

export const asPercent = (point: Point): { left: number; top: number } => ({
  left: (point.x / VIEWBOX.width) * 100,
  top: (point.y / VIEWBOX.height) * 100,
});

export const PLOT_FRACTION = {
  start: PADDING.left / VIEWBOX.width,
  end: (PADDING.left + PLOT.width) / VIEWBOX.width,
} as const;

export function indexAtFraction(fraction: number, count: number): number {
  if (count <= 1) return 0;

  const span = PLOT_FRACTION.end - PLOT_FRACTION.start;
  const t = (fraction - PLOT_FRACTION.start) / span;

  return Math.max(0, Math.min(count - 1, Math.round(t * (count - 1))));
}

export interface AxisLabel {
  index: number;
  value: number;
}

export const LABELS_TARGET = 20;

export const axisStep = (count: number): number =>
  Math.max(1, Math.ceil(count / LABELS_TARGET));

export function axisLabels(values: readonly number[]): AxisLabel[] {
  const count = values.length;
  if (count === 0) return [];

  const step = axisStep(count);
  const labels: AxisLabel[] = [];

  for (let index = count - 1; index >= 0; index -= step) {
    const value = values[index];
    if (value === undefined) continue;
    labels.push({ index, value });
  }

  return labels.reverse();
}
