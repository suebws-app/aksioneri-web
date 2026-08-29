import type { ChartSpec } from '../types';

export interface SummaryStrings {
  intro: string;
  seriesLabel: (id: string) => string;
  formatValue: (value: number) => string;
  xLabel: string;
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
