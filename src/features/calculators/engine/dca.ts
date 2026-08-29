import {
  allFinite,
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

export const CONTRIBUTION_FREQUENCIES = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
} as const;

export type ContributionFrequency = keyof typeof CONTRIBUTION_FREQUENCIES;

export interface DcaInput {
  readonly initial: number;
  readonly contribution: number;
  readonly frequency: ContributionFrequency;
  readonly ratePercent: number;
  readonly years: number;
  readonly inflationPercent: number;
}

export interface DcaYear {
  readonly year: number;
  readonly contributed: number;
  readonly value: number;
  readonly gain: number;
}

export interface DcaResult {
  readonly totalContributions: number;
  readonly finalValue: number;
  readonly gain: number;
  readonly realValue: number;
  readonly annualisedReturnPercent: number;
  readonly schedule: readonly DcaYear[];
}

export function computeDca(input: DcaInput): Outcome<DcaResult> {
  const {
    initial,
    contribution,
    frequency,
    ratePercent,
    years,
    inflationPercent,
  } = input;

  if (!allFinite(initial, contribution, ratePercent, years, inflationPercent)) {
    return refuse('nonFinite');
  }
  if (initial < 0 || contribution < 0) return refuse('negativeAmount');
  if (
    !isValidRatePercent(ratePercent) ||
    !isValidRatePercent(inflationPercent)
  ) {
    return refuse('rateOutOfRange');
  }
  if (!isValidYears(years)) return refuse('termOutOfRange');
  if (!isRepresentableMoney(initial)) return refuse('overflow');

  const perYear = CONTRIBUTION_FREQUENCIES[frequency];
  const monthsBetween = 12 / perYear;

  const factor = monthlyGrowthFactor(ratePercent, 12);
  const months = Math.round(years * 12);

  let value = initial;
  let contributedCents = toCents(initial);

  const schedule: DcaYear[] = [];

  for (let month = 1; month <= months; month += 1) {
    value *= factor;

    if (month % monthsBetween === 0) {
      value += contribution;
      contributedCents += toCents(contribution);
    }

    if (!Number.isFinite(value)) return refuse('overflow');

    if (month % 12 === 0 || month === months) {
      const contributed = fromCents(contributedCents);
      schedule.push({
        year: Math.ceil(month / 12),
        contributed: roundMoney(contributed),
        value: roundMoney(value),
        gain: roundMoney(value - contributed),
      });
    }
  }

  const totalContributions = fromCents(contributedCents);
  const finalValue = roundMoney(value);

  const annualisedReturnPercent =
    totalContributions <= 0 || finalValue <= 0
      ? 0
      : roundMoney(
          ((finalValue / totalContributions) ** (1 / years) - 1) * 100,
        );

  return ok({
    totalContributions: roundMoney(totalContributions),
    finalValue,
    gain: roundMoney(finalValue - totalContributions),
    realValue: roundMoney(deflate(finalValue, inflationPercent, years)),
    annualisedReturnPercent,
    schedule,
  });
}
