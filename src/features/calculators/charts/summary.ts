import type { ChartSpec } from '../types';

/**
 * A chart, said out loud.
 *
 * Every chart carries one of these in an `sr-only` paragraph referenced by
 * `aria-describedby`. A screen-reader user should get the finding — "growth
 * overtakes contributions around year twelve; by year twenty the balance is
 * three hundred thousand" — not an announcement that an image exists.
 *
 * Pure, and therefore tested: this text is the only version of the chart some
 * readers get, so it cannot be left to drift.
 */

export interface SummaryStrings {
  /** e.g. "Grafik: {heading}." */
  intro: string;
  seriesLabel: (id: string) => string;
  formatValue: (value: number) => string;
  /** Axis unit, e.g. "viti". */
  xLabel: string;
  /** Joins the closing figures: "në fund". */
  endLabel: string;
}

export function summariseChart(
  spec: ChartSpec,
  strings: SummaryStrings,
): string {
  const lastIndex = spec.x.length - 1;
  if (lastIndex < 0) return strings.intro;

  const first = spec.x[0];
  const last = spec.x[lastIndex];

  const span = `${strings.xLabel} ${String(first)}–${String(last)}`;

  const endings = spec.series
    .map((series) => {
      const value = series.values[lastIndex];
      if (value === undefined) return null;
      return `${strings.seriesLabel(series.idKey)} ${strings.formatValue(value)}`;
    })
    .filter((entry): entry is string => entry !== null);

  return `${strings.intro} ${span}. ${strings.endLabel}: ${endings.join('; ')}.`;
}
