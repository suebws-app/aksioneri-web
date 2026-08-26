import { describe, expect, it } from 'vitest';
import {
  axisLabels,
  axisStep,
  LABELS_TARGET,
  niceTicks,
  bandPath,
  linePath,
  maxOf,
  PADDING,
  PLOT,
  stack,
  xAt,
  yAt,
} from '../charts/geometry';
import { summariseChart } from '../charts/summary';
import type { ChartSpec } from '../types';

describe('xAt', () => {
  it('spans the plot from the first index to the last', () => {
    expect(xAt(0, 5)).toBe(PADDING.left);
    expect(xAt(4, 5)).toBeCloseTo(PADDING.left + PLOT.width, 6);
  });

  it('pins a single point to the left edge instead of dividing by zero', () => {
    // A one-year projection is a legitimate input.
    expect(xAt(0, 1)).toBe(PADDING.left);
    expect(Number.isFinite(xAt(0, 1))).toBe(true);
  });

  it('never divides by zero on an empty series', () => {
    expect(Number.isFinite(xAt(0, 0))).toBe(true);
  });
});

describe('yAt', () => {
  it('puts the minimum at the bottom and the maximum at the top', () => {
    expect(yAt(0, 0, 100)).toBeCloseTo(PADDING.top + PLOT.height, 6);
    expect(yAt(100, 0, 100)).toBeCloseTo(PADDING.top, 6);
  });

  it('draws a flat series along the bottom rather than producing NaN', () => {
    // An all-zero or constant series has no range; the guard keeps it finite.
    const y = yAt(5, 5, 5);
    expect(Number.isFinite(y)).toBe(true);
    expect(y).toBeCloseTo(PADDING.top + PLOT.height, 6);
  });
});

describe('stack', () => {
  it('accumulates each series onto the ones before it', () => {
    const tops = stack([{ values: [1, 2, 3] }, { values: [10, 20, 30] }]);

    expect(tops[0]).toEqual([1, 2, 3]);
    expect(tops[1]).toEqual([11, 22, 33]);
  });

  it('makes the top band equal the sum of every series', () => {
    // If this drifts, the chart shows a total that disagrees with the result
    // card printed beside it.
    const series = [
      { values: [3, 5] },
      { values: [7, 11] },
      { values: [1, 2] },
    ];
    const tops = stack(series);

    expect(tops.at(-1)).toEqual([11, 18]);
  });

  it('handles an empty series list', () => {
    expect(stack([])).toEqual([]);
  });

  it('treats a short series as zero rather than NaN', () => {
    const tops = stack([{ values: [1, 2, 3] }, { values: [10] }]);
    expect(tops[1]).toEqual([11, 2, 3]);
  });
});

describe('maxOf', () => {
  it('takes the largest value across every row', () => {
    expect(
      maxOf([
        [1, 9],
        [4, 2],
      ]),
    ).toBe(9);
  });

  it('ignores non-finite values instead of poisoning the scale', () => {
    expect(maxOf([[1, Number.NaN, 5]])).toBe(5);
  });

  it('is zero for no data', () => {
    expect(maxOf([])).toBe(0);
  });
});

describe('paths', () => {
  it('starts with a move and continues with lines', () => {
    const path = linePath([
      { x: 0, y: 1 },
      { x: 2, y: 3 },
    ]);

    expect(path.startsWith('M')).toBe(true);
    expect(path).toContain('L');
    expect(path).not.toContain('NaN');
  });

  it('closes a band and walks the lower edge backwards', () => {
    const upper = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    const lower = [
      { x: 0, y: 10 },
      { x: 10, y: 10 },
    ];

    const path = bandPath(upper, lower);

    expect(path.endsWith('Z')).toBe(true);
    // Reversed: the return leg must reach x=10 before x=0, or the fill
    // renders as a bowtie.
    expect(path.indexOf('L10.00 10.00')).toBeLessThan(
      path.indexOf('L0.00 10.00'),
    );
  });

  it('returns an empty path for no points', () => {
    expect(bandPath([], [])).toBe('');
  });
});

describe('axisLabels', () => {
  const years = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
  const shown = (n: number) => axisLabels(years(n)).map((l) => l.value);

  it('labels every year up to twenty', () => {
    expect(shown(20)).toEqual(years(20));
  });

  it('labels every second year past twenty', () => {
    expect(shown(30)).toEqual([
      2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
    ]);
  });

  it('steps by three past forty and by four past sixty', () => {
    expect(axisStep(50)).toBe(3);
    expect(axisStep(70)).toBe(4);
  });

  it('always labels the final period', () => {
    // Stepping forwards from year one would label 1, 3, 5 … 29 on a
    // thirty-year chart — leaving nothing under the year the reader came for.
    for (const n of [20, 21, 30, 47, 70, 100, 360]) {
      expect(shown(n).at(-1)).toBe(n);
    }
  });

  it('never labels more than the axis can hold', () => {
    for (const n of [21, 40, 61, 100, 360]) {
      expect(axisLabels(years(n)).length).toBeLessThanOrEqual(LABELS_TARGET);
    }
  });

  it('leaves enough room between labels that they cannot overlap', () => {
    // The real constraint, checked rather than assumed: label spacing in
    // viewBox units against the widest label the series can produce, at the
    // font size the chart uses for that density. Monospace, so width is
    // simply characters × advance.
    const MONO_ADVANCE = 0.6;

    for (const n of [20, 21, 30, 50, 70, 100, 360]) {
      const labels = axisLabels(years(n));
      const fontSize = labels.length > 30 ? 9 : labels.length > 20 ? 9.5 : 11;

      const gap =
        labels.length > 1
          ? ((labels[1]?.index ?? 0) - (labels[0]?.index ?? 0)) *
            (PLOT.width / Math.max(n - 1, 1))
          : PLOT.width;

      const widest = Math.max(...labels.map((l) => String(l.value).length));
      const labelWidth = widest * fontSize * MONO_ADVANCE;

      expect(
        gap,
        `${String(n)} periods: ${String(labels.length)} labels`,
      ).toBeGreaterThan(labelWidth);
    }
  });

  it('returns nothing for no data', () => {
    expect(axisLabels([])).toEqual([]);
  });
});

describe('niceTicks', () => {
  it('rounds the scale to figures a person would say', () => {
    // The peak of the default compound projection. An axis labelled 50.170
    // reads as an artefact; 50.000 reads as a scale.
    const { ticks } = niceTicks(300_851);

    expect(ticks).toContain(0);
    for (const tick of ticks) {
      expect(tick % 50_000).toBe(0);
    }
  });

  it('does not waste the top of the plot on empty headroom', () => {
    // The regression: 300,851 produced an axis to 400,000, leaving a third
    // of the chart blank, because the step ladder jumped 5× → 10×.
    for (const max of [300_851, 63_000, 87_654, 222_400, 1_200]) {
      const { axisMax } = niceTicks(max);
      expect(axisMax / max).toBeLessThanOrEqual(1.25);
    }
  });

  it('puts the axis maximum at or above the data, never below', () => {
    for (const max of [1, 999, 1_234, 87_654, 300_851, 9_999_999]) {
      const { axisMax } = niceTicks(max);
      expect(axisMax).toBeGreaterThanOrEqual(max);
    }
  });

  it('keeps the label count readable', () => {
    for (const max of [500, 12_345, 300_851, 4_500_000]) {
      const { ticks } = niceTicks(max);
      expect(ticks.length).toBeGreaterThanOrEqual(2);
      expect(ticks.length).toBeLessThanOrEqual(9);
    }
  });

  it('produces exact labels, not floating-point noise', () => {
    // A 2.5e4 step accumulates error if simply added in a loop.
    const { ticks } = niceTicks(120_000);
    for (const tick of ticks) {
      expect(Number.isInteger(tick)).toBe(true);
    }
  });

  it('degrades safely for no data', () => {
    expect(niceTicks(0).ticks).toEqual([0]);
    expect(niceTicks(Number.NaN).axisMax).toBe(1);
    expect(niceTicks(-5).ticks).toEqual([0]);
  });
});

describe('summariseChart', () => {
  const spec: ChartSpec = {
    kind: 'stackedArea',
    xLabelKey: 'chart.xAxis',
    x: [1, 2, 3],
    series: [
      { idKey: 'chart.contributions', values: [100, 200, 300] },
      { idKey: 'chart.growth', values: [5, 20, 60] },
    ],
  };

  const strings = {
    intro: 'Kontributet krahas rritjes.',
    seriesLabel: (id: string) => id.split('.')[1] ?? id,
    formatValue: (value: number) => `${String(value)} €`,
    xLabel: 'viti',
    endLabel: 'Në fund',
  };

  it('states the span and the closing figure of every series', () => {
    const summary = summariseChart(spec, strings);

    expect(summary).toContain('viti 1–3');
    expect(summary).toContain('contributions 300 €');
    expect(summary).toContain('growth 60 €');
  });

  it('degrades to the intro when there is no data', () => {
    const empty: ChartSpec = { ...spec, x: [], series: [] };
    expect(summariseChart(empty, strings)).toBe(strings.intro);
  });
});
