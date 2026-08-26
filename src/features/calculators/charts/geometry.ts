/**
 * Chart geometry: pure functions from numbers to SVG coordinates.
 *
 * Separated from the components so it can be unit-tested directly. Every
 * charting bug worth catching — a stack that does not sum, a flat series that
 * divides by zero, a single point that produces a NaN path — is a bug in
 * arithmetic, and arithmetic does not need a DOM to test.
 *
 * The kit exists rather than a charting library because the repo already
 * draws its own SVG (`InteractiveSparkline`), and because a canvas library
 * renders nothing on the server: these pages live or die on the HTML that a
 * crawler, and a reader whose JavaScript did not load, receive.
 */

/** The coordinate space every chart is drawn in, before CSS scales it. */
export const VIEWBOX = { width: 720, height: 260 } as const;

/** Room for the axis labels, inside the viewBox. */
export const PADDING = { top: 12, right: 8, bottom: 26, left: 8 } as const;

export const PLOT = {
  width: VIEWBOX.width - PADDING.left - PADDING.right,
  height: VIEWBOX.height - PADDING.top - PADDING.bottom,
} as const;

export interface Point {
  x: number;
  y: number;
}

/**
 * Maps an index onto the horizontal axis.
 *
 * A single-point series would divide by zero, so it is pinned to the left
 * edge instead — a one-year projection is a legitimate input, not an error.
 */
export const xAt = (index: number, count: number): number =>
  count <= 1 ? PADDING.left : PADDING.left + (index / (count - 1)) * PLOT.width;

/**
 * Maps a value onto the vertical axis, inverted for SVG's downward y.
 *
 * A flat series — every value identical, all-zero included — has no range;
 * `|| 1` keeps the division finite and draws it as a straight line along the
 * bottom, which is the honest picture. `Sparkline.tsx` guards the same way.
 */
export const yAt = (value: number, min: number, max: number): number => {
  const range = max - min || 1;
  return PADDING.top + PLOT.height - ((value - min) / range) * PLOT.height;
};

/** Running totals per index — the stack. */
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

/** An open polyline through the points. */
export const linePath = (points: readonly Point[]): string =>
  points
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    )
    .join(' ');

/**
 * A closed band between two edges — one layer of a stacked area.
 *
 * The lower edge is walked backwards so the path closes without crossing
 * itself, which is what makes the fill render as a band rather than a bowtie.
 */
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

/**
 * Which x-positions get a printed label.
 *
 * Forty year-labels along a 720-unit axis collide into a grey smear, so at
 * most five are drawn — always including the first and the last, which are
 * the two a reader actually reads.
 */
export function axisTicks(count: number, maxLabels = 5): number[] {
  if (count <= 0) return [];
  if (count <= maxLabels) return Array.from({ length: count }, (_, i) => i);

  const step = (count - 1) / (maxLabels - 1);
  const indices = Array.from({ length: maxLabels }, (_, i) =>
    Math.round(i * step),
  );

  return [...new Set(indices)];
}
