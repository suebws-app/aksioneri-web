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
  readonly ratePercent: number;
  readonly years: number;
  readonly frequency: PaymentFrequency;
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
  readonly costOfBorrowingPercent: number;
  readonly effectiveRatePercent: number;
  readonly schedule: readonly AmortizationRow[];
}

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

  const paymentCents =
    periodRate === 0
      ? Math.round(principalCents / periods)
      : Math.round(
          (principalCents * periodRate) / (1 - (1 + periodRate) ** -periods),
        );

  if (!Number.isFinite(paymentCents)) return refuse('overflow');

  const schedule: AmortizationRow[] = [];
  const paymentsCents: number[] = [];

  let balanceCents = principalCents;
  let interestTotalCents = 0;

  for (let period = 1; period <= periods; period += 1) {
    const interestCents = Math.round(balanceCents * periodRate);

    const isLast = period === periods;
    const principalPortion = isLast
      ? balanceCents
      : Math.min(paymentCents - interestCents, balanceCents);

    const actualPayment = principalPortion + interestCents;

    balanceCents -= principalPortion;
    interestTotalCents += interestCents;
    paymentsCents.push(actualPayment);

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

  const feesCents = toCents(fees);
  if (feesCents >= principalCents) return refuse('rateOutOfRange');

  return ok({
    payment: fromCents(paymentCents),
    totalInterest: roundMoney(totalInterest),
    totalFees: roundMoney(fees),
    totalRepaid,
    costOfBorrowingPercent: roundMoney((totalCost / principal) * 100),
    effectiveRatePercent: roundMoney(
      effectiveAnnualRatePercent(
        principalCents - feesCents,
        paymentsCents,
        perYear,
      ),
    ),
    schedule,
  });
}

function effectiveAnnualRatePercent(
  netAdvanceCents: number,
  paymentsCents: readonly number[],
  perYear: number,
): number {
  const npv = (rate: number): number => {
    let discount = 1;
    let total = 0;
    for (const payment of paymentsCents) {
      discount /= 1 + rate;
      total += payment * discount;
    }
    return total - netAdvanceCents;
  };

  if (npv(0) <= 0) return 0;

  let lo = 0;
  let hi = 1;
  while (npv(hi) > 0) hi *= 2;

  for (let i = 0; i < 100 && hi - lo > 1e-9; i += 1) {
    const mid = (lo + hi) / 2;
    if (npv(mid) > 0) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  const periodRate = (lo + hi) / 2;
  return ((1 + periodRate) ** perYear - 1) * 100;
}

export interface MortgageInput extends AmortizationInput {
  readonly propertyPrice: number;
  readonly downPayment: number;
  readonly propertyTax: number;
  readonly insurance: number;
  readonly otherMonthly: number;
}

export interface MortgageResult extends AmortizationResult {
  readonly loanAmount: number;
  readonly monthlyPrincipalInterest: number;
  readonly monthlyTotal: number;
  readonly loanToValuePercent: number;
}

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
  if (downPayment > propertyPrice) return refuse('negativeAmount');

  const loanAmount = roundMoney(propertyPrice - downPayment);
  if (loanAmount <= 0) return refuse('divideByZero');

  const base = computeAmortization({ ...input, principal: loanAmount });
  if (!base.ok) return base;

  const perYear = PAYMENT_FREQUENCIES[input.frequency];
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
