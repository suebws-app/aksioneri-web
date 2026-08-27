import { describe, expect, it } from 'vitest';
import {
  computeAmortization,
  computeMortgage,
  type AmortizationInput,
  type MortgageInput,
} from '../engine/amortization';
import { toCents } from '../engine/guards';

const loan: AmortizationInput = {
  principal: 200_000,
  ratePercent: 4,
  years: 30,
  frequency: 'monthly',
  fees: 0,
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

describe('computeAmortization', () => {
  it('matches the standard payment formula', () => {
    // PMT(0.04/12, 360, -200000) → 954.83
    expect(value(computeAmortization(loan)).payment).toBeCloseTo(954.83, 2);
  });

  it('matches the standard total interest', () => {
    expect(value(computeAmortization(loan)).totalInterest).toBeCloseTo(
      143_739.01,
      0,
    );
  });

  it('sums the principal column to the principal EXACTLY, in cents', () => {
    // The property a reader can check with a calculator, and the reason the
    // whole schedule runs in integer cents.
    const result = value(computeAmortization(loan));

    const sum = result.schedule.reduce(
      (total, row) => total + toCents(row.principal),
      0,
    );

    expect(sum).toBe(toCents(200_000));
  });

  it('clears the balance to exactly zero on the final row', () => {
    const result = value(computeAmortization(loan));
    expect(result.schedule.at(-1)?.balance).toBe(0);
  });

  it('makes every row internally consistent', () => {
    const result = value(computeAmortization(loan));

    for (const row of result.schedule) {
      expect(row.interest + row.principal).toBeCloseTo(row.payment, 2);
    }
  });

  it('emits one row per period', () => {
    expect(value(computeAmortization(loan)).schedule).toHaveLength(360);
  });

  it('reports the nominal effective-annual equivalent when there are no fees', () => {
    // With no fees the IRR of the cash flows is the nominal monthly rate,
    // so the annualised figure is (1 + 0.04/12)^12 − 1 = 4.0742% — checked
    // two independent ways (bisection over the cent-exact schedule, and
    // Newton on the closed-form annuity), both landing on 4.07 at 2 dp.
    expect(value(computeAmortization(loan)).effectiveRatePercent).toBeCloseTo(
      4.07,
      2,
    );
  });

  it('reports a zero effective rate for a free loan', () => {
    const result = value(
      computeAmortization({
        ...loan,
        principal: 12_000,
        ratePercent: 0,
        years: 2,
        fees: 0,
      }),
    );
    expect(result.effectiveRatePercent).toBe(0);
  });

  it('prices upfront fees into the effective rate', () => {
    // 2,000 in fees on a 200,000 advance: the borrower receives 198,000
    // and pays the same 954.83 × 360 schedule. Solving
    // 198,000 = Σ 954.83 / (1+r)^i gives r ≈ 0.0034029 monthly, i.e.
    // (1.0034029)^12 − 1 = 4.1607% — hand-checked via Newton on the
    // closed-form annuity as well as bisection.
    const withFees = value(computeAmortization({ ...loan, fees: 2_000 }));
    expect(withFees.effectiveRatePercent).toBeCloseTo(4.16, 2);
  });

  it('prices fees on an otherwise free loan as a positive rate', () => {
    // 120 upfront on a 12,000 zero-interest 24-month loan: 11,880 received,
    // 500 × 24 repaid. IRR ≈ 0.0806% monthly → 0.97% annual.
    const result = value(
      computeAmortization({
        ...loan,
        principal: 12_000,
        ratePercent: 0,
        years: 2,
        fees: 120,
      }),
    );
    expect(result.effectiveRatePercent).toBeCloseTo(0.97, 2);
    expect(result.effectiveRatePercent).toBeGreaterThan(0);
  });

  it('refuses fees that consume the whole advance', () => {
    // A "loan" whose upfront fees equal or exceed the principal hands the
    // borrower nothing — there is no rate to state.
    expect(
      reason(
        computeAmortization({
          ...loan,
          principal: 1_000,
          fees: 1_000,
        }),
      ),
    ).toBe('rateOutOfRange');
  });

  it('repays straight-line at a zero rate', () => {
    const result = value(
      computeAmortization({
        ...loan,
        principal: 12_000,
        ratePercent: 0,
        years: 2,
      }),
    );

    expect(result.payment).toBe(500);
    expect(result.totalInterest).toBe(0);
    expect(result.schedule).toHaveLength(24);
  });

  it('holds the cent-exact property across many random loans', () => {
    // A seeded generator, so a failure is reproducible — Math.random would
    // make this test lie differently every run.
    let seed = 42;
    const next = () => {
      seed = (seed * 1_103_515_245 + 12_345) % 2_147_483_648;
      return seed / 2_147_483_648;
    };

    for (let i = 0; i < 100; i += 1) {
      const principal = Math.round(next() * 500_000) + 1_000;
      const ratePercent = Math.round(next() * 1500) / 100;
      const years = Math.max(1, Math.round(next() * 30));

      const result = value(
        computeAmortization({
          principal,
          ratePercent,
          years,
          frequency: 'monthly',
          fees: 0,
        }),
      );

      const sum = result.schedule.reduce(
        (total, row) => total + toCents(row.principal),
        0,
      );

      expect(
        sum,
        `principal ${String(principal)} @ ${String(ratePercent)}%`,
      ).toBe(toCents(principal));
      expect(result.schedule.at(-1)?.balance).toBe(0);
    }
  });

  it('counts fees in the cost of borrowing but not in the balance', () => {
    const withFees = value(computeAmortization({ ...loan, fees: 2_000 }));
    const without = value(computeAmortization(loan));

    // Fees must not attract interest.
    expect(withFees.totalInterest).toBeCloseTo(without.totalInterest, 2);
    expect(withFees.totalRepaid).toBeCloseTo(without.totalRepaid + 2_000, 2);
    expect(withFees.costOfBorrowingPercent).toBeGreaterThan(
      without.costOfBorrowingPercent,
    );
    expect(withFees.effectiveRatePercent).toBeGreaterThan(
      without.effectiveRatePercent,
    );
  });

  it('costs more over a longer term at the same rate', () => {
    const long = value(computeAmortization(loan));
    const short = value(computeAmortization({ ...loan, years: 15 }));

    expect(short.payment).toBeGreaterThan(long.payment);
    expect(short.totalInterest).toBeLessThan(long.totalInterest);
  });

  it('refuses impossible loans instead of returning NaN', () => {
    expect(reason(computeAmortization({ ...loan, principal: 0 }))).toBe(
      'divideByZero',
    );
    expect(reason(computeAmortization({ ...loan, principal: -1 }))).toBe(
      'negativeAmount',
    );
    expect(reason(computeAmortization({ ...loan, years: 0 }))).toBe(
      'termOutOfRange',
    );
    expect(reason(computeAmortization({ ...loan, years: 51 }))).toBe(
      'termOutOfRange',
    );
    expect(
      reason(computeAmortization({ ...loan, ratePercent: Number.NaN })),
    ).toBe('nonFinite');
  });
});

const mortgage: MortgageInput = {
  ...loan,
  principal: 0, // replaced by propertyPrice − downPayment
  propertyPrice: 250_000,
  downPayment: 50_000,
  propertyTax: 1_200,
  insurance: 600,
  otherMonthly: 50,
};

describe('computeMortgage', () => {
  it('derives the loan from price minus deposit', () => {
    const result = value(computeMortgage(mortgage));

    expect(result.loanAmount).toBe(200_000);
    expect(result.monthlyPrincipalInterest).toBeCloseTo(954.83, 2);
  });

  it('reports the true monthly outgoing, not just the bank payment', () => {
    const result = value(computeMortgage(mortgage));

    // 954.83 + 100 tax + 50 insurance + 50 other
    expect(result.monthlyTotal).toBeCloseTo(1_154.83, 2);
    expect(result.monthlyTotal).toBeGreaterThan(
      result.monthlyPrincipalInterest,
    );
  });

  it('computes loan-to-value', () => {
    expect(value(computeMortgage(mortgage)).loanToValuePercent).toBe(80);
  });

  it('refuses a deposit larger than the property', () => {
    expect(reason(computeMortgage({ ...mortgage, downPayment: 300_000 }))).toBe(
      'negativeAmount',
    );
  });

  it('refuses a fully paid property, which is not a mortgage', () => {
    expect(reason(computeMortgage({ ...mortgage, downPayment: 250_000 }))).toBe(
      'divideByZero',
    );
  });
});
