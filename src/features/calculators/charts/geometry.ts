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

/**
 * Room for the axis labels, inside the viewBox.
 *
 * The left gutter carries the value scale. Without it the chart showed a
 * shape but no magnitudes — a reader could see growth overtaking
 * contributions and had no way to tell whether the end was 30,000 or 300,000.
 */
export const PADDING = { top: 14, right: 12, bottom: 26, left: 92 } as const;

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
 * Gridline values for the vertical axis.
 *
 * Rounded to something a person would actually say — 50,000 rather than
 * 48,317. The step is the smallest of 1/2/2.5/5 × 10ⁿ that produces at most
 * `target` intervals, which is the standard way to get a scale whose labels
 * read as deliberate rather than as an artefact of the data.
 *
 * Returns the axis maximum too, since the plot must be scaled to the top
 * gridline rather than to the raw maximum — otherwise the highest value sits
 * exactly on the frame edge with no label beside it.
 */
export function niceTicks(
  max: number,
  maxTicks = 8,
): { ticks: number[]; axisMax: number } {
  if (!Number.isFinite(max) || max <= 0) return { ticks: [0], axisMax: 1 };

  // Ascending candidates, and the **smallest** one that still fits is taken.
  // Picking by "target interval count" instead looked right and wasn't: a
  // peak of 300,851 divided by six gives 50,142, which rounds up past the
  // 5× rung to 10×, producing an axis to 400,000 for data reaching 300,000.
  // A third of the plot was empty. Choosing the finest step that stays under
  // the label budget keeps the headroom tight.
  const LADDER = [1, 2, 2.5, 5] as const;

  let magnitude = 10 ** Math.floor(Math.log10(max / maxTicks));

  for (let decade = 0; decade < 12; decade += 1) {
    for (const rung of LADDER) {
      const step = rung * magnitude;
      const intervals = Math.ceil(max / step);

      // `intervals + 1` labels, counting the zero.
      if (intervals + 1 <= maxTicks) {
        const axisMax = intervals * step;
        const ticks: number[] = [];

        for (let i = 0; i <= intervals; i += 1) {
          // Multiplying beats accumulating: a 2.5e4 step added in a loop
          // drifts, and the labels have to be exact.
          ticks.push(i * step);
        }

        return { ticks, axisMax };
      }
    }
    magnitude *= 10;
  }

  return { ticks: [0, max], axisMax: max };
}

/**
 * Which x-positions get a printed label.
 *
 * Five labels across a twenty-year projection left the reader counting
 * gridlines to work out which year a point was — the axis has to be readable
 * per period, not merely span-labelled. So every period is labelled up to the
 * budget below, and only past it does the axis thin out.
 *
 * 40 is the ceiling, set by arithmetic rather than taste: the plot is 634
 * units wide, so 40 labels sit ~16 units apart, and a two-digit label at the
 * dense font size is about 11 units. Past that they touch. A 360-period
 * amortisation therefore still thins out — 360 labels are a grey smear — but
 * every projection up to forty years labels every single year.
 */
export function axisTicks(count: number, maxLabels = 40): number[] {
  if (count <= 0) return [];
  if (count <= maxLabels) return Array.from({ length: count }, (_, i) => i);

  const step = (count - 1) / (maxLabels - 1);
  const indices = Array.from({ length: maxLabels }, (_, i) =>
    Math.round(i * step),
  );

  return [...new Set(indices)];
}

/** Everything both the drawing and the hover layer need, computed once. */
export interface ChartLayout {
  count: number;
  /** Top of the value scale — the highest gridline, not the highest datum. */
  axisMax: number;
  valueTicks: number[];
  xTicks: number[];
  /** Per series, in declaration order. Stacked charts give the band tops. */
  seriesPoints: Point[][];
  /** True when the series are stacked, so the last one is the running total. */
  stacked: boolean;
  /** Markers are legible up to this many points; beyond it they merge. */
  showMarkers: boolean;
}

/**
 * The single source of geometry for a chart.
 *
 * Extracted so the hover layer and the drawing cannot disagree. Computing the
 * positions twice — once to draw, once to hit-test — is how a crosshair ends
 * up a pixel or two off the line it is supposed to be pointing at, and the
 * error only shows at some sizes.
 */
export function layoutChart(spec: {
  kind: string;
  x: readonly number[];
  series: readonly { values: readonly number[] }[];
}): ChartLayout {
  const count = spec.x.length;
  const isStacked = spec.kind === 'stackedArea';

  const stackedTops = isStacked ? stack(spec.series) : null;

  // A stacked chart is scaled by its running total, a line chart by its
  // tallest series: scaling a stack by one series pushes the top band out of
  // the plot.
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

/**
 * Where a point sits as a percentage of the rendered box.
 *
 * The SVG uses `preserveAspectRatio="none"`, so viewBox units map linearly
 * onto the element's width and height. That makes an HTML overlay able to sit
 * exactly on top of an SVG feature without measuring anything.
 */
export const asPercent = (point: Point): { left: number; top: number } => ({
  left: (point.x / VIEWBOX.width) * 100,
  top: (point.y / VIEWBOX.height) * 100,
});

/** Fraction of the element's width where the plot area starts and ends. */
export const PLOT_FRACTION = {
  start: PADDING.left / VIEWBOX.width,
  end: (PADDING.left + PLOT.width) / VIEWBOX.width,
} as const;

/**
 * Nearest data index for a pointer position given as a fraction of the
 * element's width. Clamped, so dragging past either edge holds the end point
 * rather than losing the readout.
 */
export function indexAtFraction(fraction: number, count: number): number {
  if (count <= 1) return 0;

  const span = PLOT_FRACTION.end - PLOT_FRACTION.start;
  const t = (fraction - PLOT_FRACTION.start) / span;

  return Math.max(0, Math.min(count - 1, Math.round(t * (count - 1))));
}

/** One label under the axis. */
export interface AxisLabel {
  /** Data index the label sits over. */
  index: number;
  value: number;
}

/**
 * How many periods to step between axis labels.
 *
 * The axis holds about twenty labels comfortably, so the step is whatever
 * keeps it near that: every year up to twenty, then every second year to
 * forty, every third to sixty, every fourth to eighty.
 */
export const LABELS_TARGET = 20;

export const axisStep = (count: number): number =>
  Math.max(1, Math.ceil(count / LABELS_TARGET));

/**
 * Labels for the horizontal axis.
 *
 * **The plot always draws every period.** Only the labels thin — a thirty-year
 * projection labels every second year, and the points in between are still
 * drawn and still hoverable.
 *
 * Stepped **backwards from the last period**, so the end of the projection is
 * always labelled. Counting forwards from the first would leave a thirty-year
 * chart labelled 1, 3, 5 … 29, with nothing under the year the reader most
 * wants to read — the one their money ends at.
 */
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
