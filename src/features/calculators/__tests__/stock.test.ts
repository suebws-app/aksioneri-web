import { describe, expect, it } from 'vitest';
import { computeStock, type StockInput } from '../engine/stock';

const base: StockInput = {
  shares: 100,
  purchasePrice: 150,
  currentPrice: 210,
  dividendPerShare: 2.5,
  fees: 20,
  purchaseDate: '2023-01-02',
  saleDate: '2026-01-02',
  inflationPercent: 2,
};

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

describe('computeStock', () => {
  it('counts fees as part of what the position cost', () => {
    expect(value(computeStock(base)).cost).toBe(15_020);
  });

  it('splits profit between price movement and dividends', () => {
    const result = value(computeStock(base));

    expect(result.priceProfit).toBe(6_000);
    expect(result.dividendIncome).toBe(250);
    // 21,000 + 250 − 15,020
    expect(result.totalProfit).toBe(6_230);
  });

  it('reconciles the parts against the total', () => {
    const result = value(computeStock(base));

    expect(
      result.currentValue + result.dividendIncome - result.cost,
    ).toBeCloseTo(result.totalProfit, 2);
  });

  it('computes a break-even price below the purchase price once dividends are counted', () => {
    // (15,020 − 250) / 100
    const result = value(computeStock(base));

    expect(result.breakEvenPrice).toBe(147.7);
    expect(result.breakEvenPrice).toBeLessThan(base.purchasePrice);
  });

  it('puts break-even above the purchase price when there are no dividends', () => {
    // Fees alone push it up: (15,020) / 100.
    const result = value(computeStock({ ...base, dividendPerShare: 0 }));

    expect(result.breakEvenPrice).toBe(150.2);
    expect(result.breakEvenPrice).toBeGreaterThan(base.purchasePrice);
  });

  it('annualises over the holding period', () => {
    const result = value(computeStock(base));

    expect(result.totalReturnPercent).toBeCloseTo(41.48, 1);
    // Three years, so well below the total.
    expect(result.annualisedPercent).toBeGreaterThan(10);
    expect(result.annualisedPercent).toBeLessThan(14);
  });

  it('reports a real return below the nominal one', () => {
    const result = value(computeStock(base));

    expect(result.realAnnualisedPercent).toBeLessThan(result.annualisedPercent);
  });

  it('handles a loss without breaking the root', () => {
    const result = value(computeStock({ ...base, currentPrice: 90 }));

    expect(result.totalProfit).toBeLessThan(0);
    expect(Number.isFinite(result.annualisedPercent)).toBe(true);
  });

  it('reports −100% for a wipeout rather than NaN', () => {
    const result = value(
      computeStock({ ...base, currentPrice: 0, dividendPerShare: 0 }),
    );

    expect(result.annualisedPercent).toBe(-100);
  });

  it('refuses a position of no shares', () => {
    expect(reason(computeStock({ ...base, shares: 0 }))).toBe('divideByZero');
  });

  it('refuses negative quantities and prices', () => {
    expect(reason(computeStock({ ...base, shares: -1 }))).toBe(
      'negativeAmount',
    );
    expect(reason(computeStock({ ...base, purchasePrice: -1 }))).toBe(
      'negativeAmount',
    );
    expect(reason(computeStock({ ...base, fees: -1 }))).toBe('negativeAmount');
  });

  it('refuses a sale before the purchase', () => {
    expect(reason(computeStock({ ...base, saleDate: '2020-01-01' }))).toBe(
      'termOutOfRange',
    );
  });

  it('refuses an unparseable date', () => {
    expect(reason(computeStock({ ...base, purchaseDate: 'yesterday' }))).toBe(
      'nonFinite',
    );
  });
});
