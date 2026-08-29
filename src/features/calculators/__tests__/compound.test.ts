import { describe, expect, it } from 'vitest';
import {
  computeCompound,
  futureValue,
  type CompoundInput,
} from '../engine/compound';

const base: CompoundInput = {
  initial: 10_000,
  monthly: 500,
  ratePercent: 7,
  years: 20,
  compounding: 'monthly',
  inflationPercent: 0,
};

const input = (overrides: Partial<CompoundInput> = {}): CompoundInput => ({
  ...base,
  ...overrides,
});

function value<T>(
  outcome: { ok: true; value: T } | { ok: false; reason: string },
): T {
  if (!outcome.ok)
    throw new Error(`expected ok, got refusal: ${outcome.reason}`);
  return outcome.value;
}

describe('futureValue', () => {
  it('matches the closed form A = P(1 + r/n)^(nt)', () => {
    expect(value(futureValue(10_000, 7, 10, 'monthly'))).toBeCloseTo(
      20_096.61,
      2,
    );
    expect(value(futureValue(10_000, 7, 10, 'annually'))).toBeCloseTo(
      19_671.51,
      2,
    );
    expect(value(futureValue(10_000, 7, 10, 'quarterly'))).toBeCloseTo(
      20_015.97,
      2,
    );
  });

  it('ranks the compounding frequencies correctly', () => {
    const annually = value(futureValue(10_000, 7, 10, 'annually'));
    const semiannually = value(futureValue(10_000, 7, 10, 'semiannually'));
    const quarterly = value(futureValue(10_000, 7, 10, 'quarterly'));
    const monthly = value(futureValue(10_000, 7, 10, 'monthly'));
    const daily = value(futureValue(10_000, 7, 10, 'daily'));

    expect(annually).toBeLessThan(semiannually);
    expect(semiannually).toBeLessThan(quarterly);
    expect(quarterly).toBeLessThan(monthly);
    expect(monthly).toBeLessThan(daily);
  });

  it('returns the principal unchanged at a zero rate', () => {
    expect(value(futureValue(10_000, 0, 30, 'monthly'))).toBe(10_000);
  });
});

describe('computeCompound', () => {
  it('agrees with the closed form when there are no contributions', () => {
    const result = value(computeCompound(input({ monthly: 0, years: 10 })));
    const closedForm = value(futureValue(10_000, 7, 10, 'monthly'));

    expect(result.finalBalance).toBeCloseTo(closedForm, 1);
  });

  it('matches Excel FV for a contributing plan', () => {
    const result = value(computeCompound(input()));

    expect(result.finalBalance).toBeCloseTo(300_850.72, 0);
  });

  it('reconciles: contributions + interest = final balance, exactly', () => {
    const result = value(computeCompound(input()));

    expect(result.totalContributions + result.totalInterest).toBeCloseTo(
      result.finalBalance,
      2,
    );
  });

  it('counts contributions exactly, with no floating-point drift', () => {
    const result = value(
      computeCompound(input({ initial: 0, monthly: 0.1, years: 10 })),
    );

    expect(result.totalContributions).toBe(12);
  });

  it('produces one schedule row per year', () => {
    const result = value(computeCompound(input({ years: 20 })));

    expect(result.schedule).toHaveLength(20);
    expect(result.schedule.at(-1)?.year).toBe(20);
    expect(result.schedule.at(-1)?.balance).toBeCloseTo(result.finalBalance, 2);
  });

  it('keeps every schedule row internally consistent', () => {
    const result = value(computeCompound(input()));

    for (const row of result.schedule) {
      expect(row.contributed + row.growth).toBeCloseTo(row.balance, 2);
    }
  });

  it('grows only by contributions at a zero rate', () => {
    const result = value(computeCompound(input({ ratePercent: 0, years: 10 })));

    expect(result.finalBalance).toBe(10_000 + 500 * 120);
    expect(result.totalInterest).toBe(0);
  });

  it('handles a negative rate without refusing', () => {
    const result = value(
      computeCompound(input({ ratePercent: -3, monthly: 0, years: 10 })),
    );

    expect(result.finalBalance).toBeLessThan(10_000);
    expect(result.totalInterest).toBeLessThan(0);
  });

  it('discounts to today’s money when inflation is set', () => {
    const withInflation = value(
      computeCompound(input({ inflationPercent: 3, years: 20 })),
    );
    const without = value(
      computeCompound(input({ inflationPercent: 0, years: 20 })),
    );

    expect(withInflation.finalBalance).toBeCloseTo(without.finalBalance, 2);
    expect(withInflation.inflationAdjustedBalance).toBeLessThan(
      withInflation.finalBalance,
    );
    expect(withInflation.inflationAdjustedBalance).toBeCloseTo(
      withInflation.finalBalance / 1.03 ** 20,
      1,
    );
  });

  it('reports the real gain against what was paid in', () => {
    const result = value(computeCompound(input({ inflationPercent: 0 })));

    const expected =
      ((result.inflationAdjustedBalance - result.totalContributions) /
        result.totalContributions) *
      100;

    expect(result.effectiveGainPercent).toBeCloseTo(expected, 2);
  });

  it('handles a very large principal', () => {
    const result = value(
      computeCompound(input({ initial: 1e12, monthly: 0, years: 10 })),
    );

    expect(result.finalBalance).toBeGreaterThan(1e12);
    expect(Number.isFinite(result.finalBalance)).toBe(true);
  });
});

describe('computeCompound refusals', () => {
  const reason = (overrides: Partial<CompoundInput>): string => {
    const outcome = computeCompound(input(overrides));
    if (outcome.ok) throw new Error('expected a refusal');
    return outcome.reason;
  };

  it('refuses non-finite input rather than returning NaN', () => {
    expect(reason({ initial: Number.NaN })).toBe('nonFinite');
    expect(reason({ ratePercent: Number.POSITIVE_INFINITY })).toBe('nonFinite');
  });

  it('refuses negative amounts', () => {
    expect(reason({ initial: -1 })).toBe('negativeAmount');
    expect(reason({ monthly: -1 })).toBe('negativeAmount');
  });

  it('refuses a rate that destroys more than exists', () => {
    expect(reason({ ratePercent: -100 })).toBe('rateOutOfRange');
    expect(reason({ ratePercent: -150 })).toBe('rateOutOfRange');
  });

  it('refuses a term outside the horizon it is honest over', () => {
    expect(reason({ years: 0 })).toBe('termOutOfRange');
    expect(reason({ years: -5 })).toBe('termOutOfRange');
    expect(reason({ years: 101 })).toBe('termOutOfRange');
  });

  it('refuses an unrepresentable result instead of printing 1e21', () => {
    expect(reason({ initial: 1e13, ratePercent: 900, years: 100 })).toBe(
      'overflow',
    );
  });

  it('never returns NaN for any refusal case', () => {
    const hostile: Partial<CompoundInput>[] = [
      { initial: Number.NaN },
      { monthly: Number.NaN },
      { ratePercent: Number.NaN },
      { years: Number.NaN },
      { inflationPercent: Number.NaN },
    ];

    for (const overrides of hostile) {
      const outcome = computeCompound(input(overrides));
      expect(outcome.ok).toBe(false);
    }
  });
});
