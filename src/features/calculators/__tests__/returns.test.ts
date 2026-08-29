import { describe, expect, it } from 'vitest';
import {
  computeChange,
  computeInflation,
  computeReturn,
  daysBetween,
  yearsBetween,
  type ReturnInput,
} from '../engine/returns';

function value<T>(
  o: { ok: true; value: T } | { ok: false; reason: string },
): T {
  if (!o.ok) throw new Error(`expected ok, got ${o.reason}`);
  return o.value;
}

const reason = (o: { ok: boolean; reason?: string }): string => {
  if (o.ok) throw new Error('expected a refusal');
  return o.reason ?? '';
};

const base: ReturnInput = {
  invested: 10_000,
  currentValue: 20_000,
  dividends: 0,
  fees: 0,
  purchaseDate: '2016-01-01',
  saleDate: '2026-01-01',
  inflationPercent: 0,
};

describe('date maths', () => {
  it('counts whole days between calendar dates', () => {
    expect(daysBetween('2026-01-01', '2026-01-31')).toBe(30);
  });

  it('counts the leap day in a leap year', () => {
    expect(daysBetween('2024-01-01', '2025-01-01')).toBe(366);
    expect(daysBetween('2025-01-01', '2026-01-01')).toBe(365);
  });

  it('handles a 29 February start date', () => {
    expect(daysBetween('2024-02-29', '2024-03-01')).toBe(1);
  });

  it('is unaffected by daylight saving', () => {
    expect(daysBetween('2026-03-28', '2026-03-30')).toBe(2);
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2);
  });

  it('uses 365.25 days per year, so leap days are not lost', () => {
    const years = yearsBetween('2016-01-01', '2026-01-01');
    expect(years).toBeCloseTo(10, 1);
  });

  it('returns null for an unparseable date instead of NaN', () => {
    expect(daysBetween('not-a-date', '2026-01-01')).toBeNull();
  });
});

describe('computeReturn', () => {
  it('computes profit and percentage return', () => {
    const result = value(computeReturn(base));

    expect(result.profit).toBe(10_000);
    expect(result.returnPercent).toBe(100);
  });

  it('computes CAGR for a doubling over ten years', () => {
    expect(value(computeReturn(base)).cagrPercent).toBeCloseTo(7.18, 1);
  });

  it('adds dividends and subtracts fees before anything else', () => {
    const result = value(
      computeReturn({ ...base, dividends: 1_000, fees: 250 }),
    );

    expect(result.profit).toBe(10_750);
    expect(result.totalDividends).toBe(1_000);
    expect(result.totalFees).toBe(250);
  });

  it('reports a real return below the nominal one when prices rise', () => {
    const result = value(computeReturn({ ...base, inflationPercent: 3 }));

    expect(result.realCagrPercent).toBeLessThan(result.cagrPercent);
    expect(result.realCagrPercent).toBeCloseTo(4.05, 1);
  });

  it('reports −100% for a total loss rather than NaN', () => {
    const result = value(computeReturn({ ...base, currentValue: 0 }));

    expect(result.returnPercent).toBe(-100);
    expect(result.cagrPercent).toBe(-100);
  });

  it('handles a loss without breaking the root', () => {
    const result = value(computeReturn({ ...base, currentValue: 5_000 }));

    expect(result.profit).toBe(-5_000);
    expect(result.cagrPercent).toBeLessThan(0);
    expect(Number.isFinite(result.cagrPercent)).toBe(true);
  });

  it('refuses a return on nothing', () => {
    expect(reason(computeReturn({ ...base, invested: 0 }))).toBe(
      'divideByZero',
    );
  });

  it('refuses a sale before the purchase', () => {
    expect(reason(computeReturn({ ...base, saleDate: '2015-01-01' }))).toBe(
      'termOutOfRange',
    );
  });

  it('refuses an unparseable date', () => {
    expect(reason(computeReturn({ ...base, saleDate: 'tomorrow' }))).toBe(
      'nonFinite',
    );
  });
});

describe('computeChange', () => {
  it('keeps percentage and percentage points distinct', () => {
    const result = value(computeChange({ from: 2, to: 3 }));

    expect(result.changePoints).toBe(1);
    expect(result.changePercent).toBe(50);
  });

  it('reports a fall as negative', () => {
    expect(value(computeChange({ from: 200, to: 150 })).changePercent).toBe(
      -25,
    );
  });

  it('handles a negative starting value without flipping the sign', () => {
    expect(value(computeChange({ from: -100, to: -50 })).changePercent).toBe(
      50,
    );
  });

  it('refuses a change from zero, which is undefined not infinite', () => {
    expect(reason(computeChange({ from: 0, to: 10 }))).toBe('divideByZero');
  });
});

describe('computeInflation', () => {
  it('computes what the same basket will cost later', () => {
    expect(
      value(computeInflation({ amount: 10_000, ratePercent: 3, years: 10 }))
        .futureCost,
    ).toBeCloseTo(13_439.16, 1);
  });

  it('computes what today’s money will buy later', () => {
    expect(
      value(computeInflation({ amount: 10_000, ratePercent: 3, years: 10 }))
        .purchasingPower,
    ).toBeCloseTo(7_440.94, 1);
  });

  it('reports cumulative inflation and the value lost', () => {
    const result = value(
      computeInflation({ amount: 10_000, ratePercent: 3, years: 10 }),
    );

    expect(result.cumulativePercent).toBeCloseTo(34.39, 1);
    expect(result.lostValue).toBeCloseTo(2_559.06, 1);
  });

  it('changes nothing at zero inflation', () => {
    const result = value(
      computeInflation({ amount: 10_000, ratePercent: 0, years: 10 }),
    );

    expect(result.futureCost).toBe(10_000);
    expect(result.purchasingPower).toBe(10_000);
    expect(result.cumulativePercent).toBe(0);
  });

  it('refuses impossible inputs', () => {
    expect(
      reason(computeInflation({ amount: -1, ratePercent: 3, years: 10 })),
    ).toBe('negativeAmount');
    expect(
      reason(computeInflation({ amount: 100, ratePercent: 3, years: 0 })),
    ).toBe('termOutOfRange');
    expect(
      reason(computeInflation({ amount: 100, ratePercent: -100, years: 5 })),
    ).toBe('rateOutOfRange');
  });
});
