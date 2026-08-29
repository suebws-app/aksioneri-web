import { describe, expect, it } from 'vitest';
import {
  computeDividend,
  requiredInvestment,
  type DividendInput,
} from '../engine/dividend';
import { computeDca, type DcaInput } from '../engine/dca';
import { computeRetirement, type RetirementInput } from '../engine/retirement';

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

const dividend: DividendInput = {
  investment: 50_000,
  sharePrice: 50,
  dividendPerShare: 2,
  growthPercent: 5,
  years: 20,
  reinvest: 'yes',
  priceGrowthPercent: 4,
};

describe('computeDividend', () => {
  it('computes the first-year income and yield', () => {
    const result = value(computeDividend({ ...dividend, reinvest: 'no' }));

    expect(result.annualIncome).toBe(2_000);
    expect(result.monthlyIncome).toBeCloseTo(166.67, 2);
    expect(result.currentYieldPercent).toBe(4);
  });

  it('ends with more shares and more income when reinvesting', () => {
    const drip = value(computeDividend(dividend));
    const cash = value(computeDividend({ ...dividend, reinvest: 'no' }));

    expect(drip.schedule.at(-1)?.shares).toBeGreaterThan(1_000);
    expect(cash.schedule.at(-1)?.shares).toBe(1_000);
    expect(drip.totalDividends).toBeGreaterThan(cash.totalDividends);
    expect(drip.portfolioValue).toBeGreaterThan(cash.portfolioValue);
  });

  it('grows yield on cost well past the starting yield', () => {
    const result = value(computeDividend(dividend));

    expect(result.yieldOnCostPercent).toBeGreaterThan(
      result.currentYieldPercent,
    );
  });

  it('accumulates the cumulative column monotonically', () => {
    const result = value(computeDividend(dividend));

    let previous = 0;
    for (const row of result.schedule) {
      expect(row.cumulativeIncome).toBeGreaterThanOrEqual(previous);
      previous = row.cumulativeIncome;
    }
  });

  it('pays nothing at a zero dividend', () => {
    const result = value(computeDividend({ ...dividend, dividendPerShare: 0 }));

    expect(result.annualIncome).toBe(0);
    expect(result.totalDividends).toBe(0);
  });

  it('refuses a zero share price rather than issuing infinite shares', () => {
    expect(reason(computeDividend({ ...dividend, sharePrice: 0 }))).toBe(
      'divideByZero',
    );
  });

  it('answers the reverse question', () => {
    expect(value(requiredInvestment(1_000, 4))).toBe(300_000);
  });

  it('refuses a reverse calculation at zero yield', () => {
    expect(reason(requiredInvestment(1_000, 0))).toBe('divideByZero');
  });
});

const dca: DcaInput = {
  initial: 0,
  contribution: 500,
  frequency: 'monthly',
  ratePercent: 7,
  years: 20,
  inflationPercent: 2,
};

describe('computeDca', () => {
  it('counts contributions exactly', () => {
    expect(value(computeDca(dca)).totalContributions).toBe(500 * 240);
  });

  it('reconciles contributions and gain against the final value', () => {
    const result = value(computeDca(dca));
    expect(result.totalContributions + result.gain).toBeCloseTo(
      result.finalValue,
      2,
    );
  });

  it('reports a money-weighted return well below the assumed market rate', () => {
    const result = value(computeDca(dca));

    expect(result.annualisedReturnPercent).toBeLessThan(7);
    expect(result.annualisedReturnPercent).toBeGreaterThan(0);
  });

  it('beats an equivalent quarterly plan when paid monthly', () => {
    const monthly = value(computeDca(dca));
    const quarterly = value(
      computeDca({ ...dca, frequency: 'quarterly', contribution: 1_500 }),
    );

    expect(monthly.totalContributions).toBe(quarterly.totalContributions);
    expect(monthly.finalValue).toBeGreaterThan(quarterly.finalValue);
  });

  it('grows only by contributions at a zero rate', () => {
    const result = value(computeDca({ ...dca, ratePercent: 0 }));
    expect(result.finalValue).toBe(500 * 240);
    expect(result.gain).toBe(0);
  });

  it('discounts to today’s money', () => {
    const result = value(computeDca(dca));
    expect(result.realValue).toBeLessThan(result.finalValue);
  });

  it('refuses impossible input', () => {
    expect(reason(computeDca({ ...dca, contribution: -1 }))).toBe(
      'negativeAmount',
    );
    expect(reason(computeDca({ ...dca, years: 0 }))).toBe('termOutOfRange');
  });
});

const retirement: RetirementInput = {
  currentAge: 35,
  retirementAge: 65,
  currentSavings: 25_000,
  monthlyContribution: 400,
  returnPercent: 6,
  inflationPercent: 2,
  desiredMonthlyIncome: 1_500,
  retirementYears: 25,
  existingPensionMonthly: 300,
};

describe('computeRetirement', () => {
  it('projects a pot and its value in today’s money', () => {
    const result = value(computeRetirement(retirement));

    expect(result.yearsToRetirement).toBe(30);
    expect(result.projectedPot).toBeGreaterThan(0);
    expect(result.realPot).toBeLessThan(result.projectedPot);
  });

  it('nets the existing pension off the income it must fund', () => {
    const withPension = value(computeRetirement(retirement));
    const without = value(
      computeRetirement({ ...retirement, existingPensionMonthly: 0 }),
    );

    expect(withPension.requiredPot).toBeLessThan(without.requiredPot);
  });

  it('reports a surplus as positive and a shortfall as negative', () => {
    const rich = value(
      computeRetirement({ ...retirement, monthlyContribution: 3_000 }),
    );
    const poor = value(
      computeRetirement({
        ...retirement,
        monthlyContribution: 0,
        currentSavings: 0,
      }),
    );

    expect(rich.gap).toBeGreaterThan(0);
    expect(poor.gap).toBeLessThan(0);
  });

  it('asks for more contribution only when there is a shortfall', () => {
    const rich = value(
      computeRetirement({ ...retirement, monthlyContribution: 3_000 }),
    );
    const poor = value(
      computeRetirement({
        ...retirement,
        monthlyContribution: 0,
        currentSavings: 0,
      }),
    );

    expect(rich.requiredMonthlyContribution).toBe(0);
    expect(poor.requiredMonthlyContribution).toBeGreaterThan(0);
  });

  it('closes the gap when the required contribution is applied', () => {
    const poor = value(
      computeRetirement({
        ...retirement,
        monthlyContribution: 0,
        currentSavings: 0,
      }),
    );

    const fixed = value(
      computeRetirement({
        ...retirement,
        monthlyContribution: poor.requiredMonthlyContribution,
        currentSavings: 0,
      }),
    );

    expect(Math.abs(fixed.gap)).toBeLessThan(1_000);
  });

  it('orders the three scenarios', () => {
    const result = value(computeRetirement(retirement));
    const [conservative, base, optimistic] = result.scenarios;

    expect(result.scenarios).toHaveLength(3);
    expect(conservative?.projectedPot).toBeLessThan(base?.projectedPot ?? 0);
    expect(base?.projectedPot).toBeLessThan(optimistic?.projectedPot ?? 0);
  });

  it('emits one schedule row per year to retirement', () => {
    expect(value(computeRetirement(retirement)).schedule).toHaveLength(30);
  });

  it('refuses ages that do not describe a working life', () => {
    expect(
      reason(computeRetirement({ ...retirement, retirementAge: 30 })),
    ).toBe('termOutOfRange');
    expect(reason(computeRetirement({ ...retirement, currentAge: 10 }))).toBe(
      'termOutOfRange',
    );
    expect(
      reason(computeRetirement({ ...retirement, retirementYears: 0 })),
    ).toBe('termOutOfRange');
  });
});
