import {
  allFinite,
  asFraction,
  deflate,
  fromCents,
  isRepresentableMoney,
  isValidRatePercent,
  isValidYears,
  monthlyGrowthFactor,
  roundMoney,
  toCents,
} from './guards';
import { ok, refuse, type Outcome } from './types';

export const COMPOUNDING_PERIODS = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
} as const;

export type CompoundingFrequency = keyof typeof COMPOUNDING_PERIODS;

export interface CompoundInput {
  readonly initial: number;
  readonly monthly: number;
  readonly ratePercent: number;
  readonly years: number;
  readonly compounding: CompoundingFrequency;
  readonly inflationPercent: number;
}

export interface CompoundYear {
  readonly year: number;
  readonly contributed: number;
  readonly growth: number;
  readonly balance: number;
  readonly realBalance: number;
}

export interface CompoundResult {
  readonly finalBalance: number;
  readonly totalContributions: number;
  readonly totalInterest: number;
  readonly inflationAdjustedBalance: number;
  readonly effectiveGainPercent: number;
  readonly schedule: readonly CompoundYear[];
}

export function computeCompound(input: CompoundInput): Outcome<CompoundResult> {
  const {
    initial,
    monthly,
    ratePercent,
    years,
    compounding,
    inflationPercent,
  } = input;

  if (!allFinite(initial, monthly, ratePercent, years, inflationPercent)) {
    return refuse('nonFinite');
  }
  if (initial < 0 || monthly < 0) return refuse('negativeAmount');
  if (
    !isValidRatePercent(ratePercent) ||
    !isValidRatePercent(inflationPercent)
  ) {
    return refuse('rateOutOfRange');
  }
  if (!isValidYears(years)) return refuse('termOutOfRange');
  if (!isRepresentableMoney(initial) || !isRepresentableMoney(monthly)) {
    return refuse('overflow');
  }

  const periodsPerYear = COMPOUNDING_PERIODS[compounding];
  const factor = monthlyGrowthFactor(ratePercent, periodsPerYear);

  const months = Math.round(years * 12);

  const initialCents = toCents(initial);
  const monthlyCents = toCents(monthly);

  let balance = initial;
  let contributedCents = initialCents;

  const schedule: CompoundYear[] = [];

  for (let month = 1; month <= months; month += 1) {
    balance = balance * factor + monthly;
    contributedCents += monthlyCents;

    if (
      !Number.isFinite(balance) ||
      Math.abs(balance) > Number.MAX_SAFE_INTEGER
    ) {
      return refuse('overflow');
    }

    if (month % 12 === 0 || month === months) {
      const elapsedYears = month / 12;
      const contributed = fromCents(contributedCents);

      schedule.push({
        year: Math.ceil(elapsedYears),
        contributed: roundMoney(contributed),
        growth: roundMoney(balance - contributed),
        balance: roundMoney(balance),
        realBalance: roundMoney(
          deflate(balance, inflationPercent, elapsedYears),
        ),
      });
    }
  }

  const finalBalance = roundMoney(balance);
  const totalContributions = fromCents(contributedCents);
  const totalInterest = roundMoney(finalBalance - totalContributions);
  const inflationAdjustedBalance = roundMoney(
    deflate(finalBalance, inflationPercent, years),
  );

  const effectiveGainPercent =
    totalContributions === 0
      ? 0
      : roundMoney(
          ((inflationAdjustedBalance - totalContributions) /
            totalContributions) *
            100,
        );

  return ok({
    finalBalance,
    totalContributions: roundMoney(totalContributions),
    totalInterest,
    inflationAdjustedBalance,
    effectiveGainPercent,
    schedule,
  });
}

export function futureValue(
  principal: number,
  ratePercent: number,
  years: number,
  compounding: CompoundingFrequency,
): Outcome<number> {
  if (!allFinite(principal, ratePercent, years)) return refuse('nonFinite');
  if (principal < 0) return refuse('negativeAmount');
  if (!isValidRatePercent(ratePercent)) return refuse('rateOutOfRange');
  if (!isValidYears(years)) return refuse('termOutOfRange');

  const n = COMPOUNDING_PERIODS[compounding];
  const value = principal * (1 + asFraction(ratePercent) / n) ** (n * years);

  if (!isRepresentableMoney(value)) return refuse('overflow');

  return ok(roundMoney(value));
}
