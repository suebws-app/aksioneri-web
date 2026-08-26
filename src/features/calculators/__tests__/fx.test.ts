import { describe, expect, it } from 'vitest';
import { computeFx } from '../engine/fx';
import type { ComputeContext } from '../engine';

const ctx: ComputeContext = {
  today: '2026-08-26',
  currency: 'EUR',
  // Units per one euro, exactly as the ECB publishes.
  rates: { USD: 1.1662, GBP: 0.8555, JPY: 171.2 },
  dataDate: '2026-08-25',
  dataSource: 'ecb',
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

describe('computeFx', () => {
  it('converts from the euro', () => {
    const result = value(
      computeFx({ amount: 1_000, from: 'EUR', to: 'USD' }, ctx),
    );

    expect(result.rate).toBeCloseTo(1.1662, 6);
    expect(result.converted).toBeCloseTo(1_166.2, 2);
  });

  it('converts to the euro', () => {
    const result = value(
      computeFx({ amount: 1_166.2, from: 'USD', to: 'EUR' }, ctx),
    );

    expect(result.converted).toBeCloseTo(1_000, 1);
  });

  it('crosses two non-euro currencies through the euro', () => {
    const result = value(
      computeFx({ amount: 1_000, from: 'USD', to: 'GBP' }, ctx),
    );

    // 0.8555 / 1.1662
    expect(result.rate).toBeCloseTo(0.733579, 5);
  });

  it('round-trips a cross back to where it started', () => {
    const there = value(
      computeFx({ amount: 1_000, from: 'USD', to: 'JPY' }, ctx),
    );
    const back = value(
      computeFx({ amount: there.converted, from: 'JPY', to: 'USD' }, ctx),
    );

    expect(back.converted).toBeCloseTo(1_000, 0);
  });

  it('reports an inverse rate that matches', () => {
    const result = value(computeFx({ amount: 1, from: 'EUR', to: 'USD' }, ctx));

    expect(result.rate * result.inverseRate).toBeCloseTo(1, 4);
  });

  it('returns the amount unchanged for a currency against itself', () => {
    const result = value(
      computeFx({ amount: 250, from: 'USD', to: 'USD' }, ctx),
    );

    expect(result.rate).toBe(1);
    expect(result.converted).toBe(250);
  });

  it('handles the identity even when that currency is missing from the table', () => {
    const result = value(
      computeFx({ amount: 250, from: 'XXX', to: 'XXX' }, ctx),
    );

    expect(result.converted).toBe(250);
  });

  it('converts zero to zero', () => {
    expect(
      value(computeFx({ amount: 0, from: 'EUR', to: 'USD' }, ctx)).converted,
    ).toBe(0);
  });

  it('refuses when no rates were supplied at all', () => {
    // Drives the page's "data unavailable, enter it yourself" state.
    expect(
      reason(
        computeFx(
          { amount: 100, from: 'EUR', to: 'USD' },
          {
            today: '2026-08-26',
            currency: 'EUR',
          },
        ),
      ),
    ).toBe('noData');
  });

  it('refuses an unknown currency rather than guessing a rate', () => {
    expect(
      reason(computeFx({ amount: 100, from: 'EUR', to: 'ZWL' }, ctx)),
    ).toBe('noData');
    expect(
      reason(computeFx({ amount: 100, from: 'ZWL', to: 'EUR' }, ctx)),
    ).toBe('noData');
  });

  it('refuses a zero rate rather than dividing by it', () => {
    const broken: ComputeContext = { ...ctx, rates: { USD: 0 } };

    expect(
      reason(computeFx({ amount: 100, from: 'USD', to: 'EUR' }, broken)),
    ).toBe('divideByZero');
  });

  it('refuses non-finite and unrepresentable amounts', () => {
    expect(
      reason(computeFx({ amount: Number.NaN, from: 'EUR', to: 'USD' }, ctx)),
    ).toBe('nonFinite');
    expect(
      reason(computeFx({ amount: 1e20, from: 'EUR', to: 'USD' }, ctx)),
    ).toBe('overflow');
  });
});
