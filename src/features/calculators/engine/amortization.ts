import {
  allFinite,
  asFraction,
  fromCents,
  isRepresentableMoney,
  isValidRatePercent,
  roundMoney,
  toCents,
} from './guards';
import { ok, refuse, type Outcome } from './types';

export const PAYMENT_FREQUENCIES = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
} as const;

export type PaymentFrequency = keyof typeof PAYMENT_FREQUENCIES;

export interface AmortizationInput {
  readonly principal: number;
  /** Nominal annual rate, as a percentage. */
  readonly ratePercent: number;
  readonly years: number;
  readonly frequency: PaymentFrequency;
  /** One-off charges rolled into the cost of borrowing, not into the balance. */
  readonly fees: number;
}

export interface AmortizationRow {
  readonly period: number;
  readonly payment: number;
  readonly interest: number;
  readonly principal: number;
  readonly balance: number;
}

export interface AmortizationResult {
  readonly payment: number;
  readonly totalInterest: number;
  readonly totalFees: number;
  readonly totalRepaid: number;
  /** Total cost as a percentage of the amount borrowed. */
  readonly costOfBorrowingPercent: number;
  /** The rate that would produce the same total once fees are included. */
  readonly effectiveRatePercent: number;
  readonly schedule: readonly AmortizationRow[];
}

/**
 * A repayment schedule, computed in whole cents.
 *
 * **The principal column sums to the principal, exactly.** That is not a
 * nicety: a reader who adds up the column expects it to match the figure at
 * the top, and floating-point drift over 360 rows is visible in euros. So
 * everything runs in integer cents and the final payment absorbs whatever
 * remains — which is also what a bank does.
 *
 * Fees are reported beside the interest rather than added to the balance.
 * Rolling them in would quietly charge interest on them, which some lenders
 * do and this calculator should not assume.
 */
export function computeAmortization(
  input: AmortizationInput,
): Outcome<AmortizationResult> {
  const { principal, ratePercent, years, frequency, fees } = input;

  if (!allFinite(principal, ratePercent, years, fees))
    return refuse('nonFinite');
  if (principal < 0 || fees < 0) return refuse('negativeAmount');
  if (!isValidRatePercent(ratePercent)) return refuse('rateOutOfRange');
  if (years <= 0 || years > 50) return refuse('termOutOfRange');
  if (!isRepresentableMoney(principal)) return refuse('overflow');
  if (principal === 0) return refuse('divideByZero');

  const perYear = PAYMENT_FREQUENCIES[frequency];
  const periods = Math.round(years * perYear);
  if (periods <= 0) return refuse('termOutOfRange');

  const periodRate = asFraction(ratePercent) / perYear;

  const principalCents = toCents(principal);

  // A zero-rate loan is straight-line repayment. The annuity formula divides
  // by the rate, so it has to be handled rather than approximated with 0.0001.
  const paymentCents =
    periodRate === 0
      ? Math.round(principalCents / periods)
      : Math.round(
          (principalCents * periodRate) / (1 - (1 + periodRate) ** -periods),
        );

  if (!Number.isFinite(paymentCents)) return refuse('overflow');

  const schedule: AmortizationRow[] = [];

  let balanceCents = principalCents;
  let interestTotalCents = 0;

  for (let period = 1; period <= periods; period += 1) {
    const interestCents = Math.round(balanceCents * periodRate);

    // The last payment clears whatever is left, cent for cent, instead of
    // leaving a stray balance the rounding created.
    const isLast = period === periods;
    const principalPortion = isLast
      ? balanceCents
      : Math.min(paymentCents - interestCents, balanceCents);

    const actualPayment = principalPortion + interestCents;

    balanceCents -= principalPortion;
    interestTotalCents += interestCents;

    schedule.push({
      period,
      payment: fromCents(actualPayment),
      interest: fromCents(interestCents),
      principal: fromCents(principalPortion),
      balance: fromCents(Math.max(balanceCents, 0)),
    });

    if (balanceCents <= 0) break;
  }

  const totalInterest = fromCents(interestTotalCents);
  const totalRepaid = roundMoney(principal + totalInterest + fees);
  const totalCost = totalInterest + fees;

  return ok({
    payment: fromCents(paymentCents),
    totalInterest: roundMoney(totalInterest),
    totalFees: roundMoney(fees),
    totalRepaid,
    costOfBorrowingPercent: roundMoney((totalCost / principal) * 100),
    // What the rate would have to be, with no fees, to cost the same over the
    // same term. This is the number that makes two offers comparable.
    effectiveRatePercent: roundMoney((totalCost / principal / years) * 100),
    schedule,
  });
}

export interface MortgageInput extends AmortizationInput {
  readonly propertyPrice: number;
  readonly downPayment: number;
  /** Annual property tax. */
  readonly propertyTax: number;
  /** Annual insurance. */
  readonly insurance: number;
  /** Anything else charged monthly — service charge, management fee. */
  readonly otherMonthly: number;
}

export interface MortgageResult extends AmortizationResult {
  readonly loanAmount: number;
  /** Principal and interest only. */
  readonly monthlyPrincipalInterest: number;
  /** Everything the household actually pays each month. */
  readonly monthlyTotal: number;
  readonly loanToValuePercent: number;
}

/**
 * A mortgage: the loan, plus the costs that come with owning the thing.
 *
 * Two figures are reported rather than one, because the gap between them is
 * where budgets break. The bank quotes principal and interest; the household
 * pays that plus tax, insurance and service charges, and the difference is
 * routinely a fifth of the total.
 */
export function computeMortgage(input: MortgageInput): Outcome<MortgageResult> {
  const { propertyPrice, downPayment, propertyTax, insurance, otherMonthly } =
    input;

  if (
    !allFinite(propertyPrice, downPayment, propertyTax, insurance, otherMonthly)
  ) {
    return refuse('nonFinite');
  }
  if (propertyPrice < 0 || downPayment < 0) return refuse('negativeAmount');
  if (propertyTax < 0 || insurance < 0 || otherMonthly < 0) {
    return refuse('negativeAmount');
  }
  // Paying more down than the property costs is a typo.
  if (downPayment > propertyPrice) return refuse('negativeAmount');

  const loanAmount = roundMoney(propertyPrice - downPayment);
  if (loanAmount <= 0) return refuse('divideByZero');

  const base = computeAmortization({ ...input, principal: loanAmount });
  if (!base.ok) return base;

  const perYear = PAYMENT_FREQUENCIES[input.frequency];
  // Normalised to a month so the two figures are comparable even when the
  // loan is billed quarterly.
  const monthlyPrincipalInterest = roundMoney(
    (base.value.payment * perYear) / 12,
  );

  const monthlyExtras = roundMoney(
    propertyTax / 12 + insurance / 12 + otherMonthly,
  );

  return ok({
    ...base.value,
    loanAmount,
    monthlyPrincipalInterest,
    monthlyTotal: roundMoney(monthlyPrincipalInterest + monthlyExtras),
    loanToValuePercent:
      propertyPrice === 0 ? 0 : roundMoney((loanAmount / propertyPrice) * 100),
  });
}
