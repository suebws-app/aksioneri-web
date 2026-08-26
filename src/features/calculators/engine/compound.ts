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

/** How often interest is credited. */
export const COMPOUNDING_PERIODS = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
} as const;

export type CompoundingFrequency = keyof typeof COMPOUNDING_PERIODS;

export interface CompoundInput {
  /** Amount invested at the start. */
  readonly initial: number;
  /** Added at the end of every month. */
  readonly monthly: number;
  /** Nominal annual rate, as a percentage. */
  readonly ratePercent: number;
  readonly years: number;
  readonly compounding: CompoundingFrequency;
  /** Annual inflation, as a percentage. Used only for the real-terms figure. */
  readonly inflationPercent: number;
}

/** One year-end snapshot, for the chart and the table. */
export interface CompoundYear {
  readonly year: number;
  /** Initial plus every contribution paid in by this point. */
  readonly contributed: number;
  /** Balance minus contributed — the part that was earned. */
  readonly growth: number;
  readonly balance: number;
  /** `balance` in today's money. */
  readonly realBalance: number;
}

export interface CompoundResult {
  readonly finalBalance: number;
  readonly totalContributions: number;
  readonly totalInterest: number;
  readonly inflationAdjustedBalance: number;
  /**
   * Real gain as a percentage of what was paid in.
   *
   * The honest headline for a long projection: nominal growth of 180% at 3%
   * inflation over thirty years is a different story from 180% at zero.
   */
  readonly effectiveGainPercent: number;
  readonly schedule: readonly CompoundYear[];
}

/**
 * Compound growth with regular monthly contributions.
 *
 * Simulated month by month rather than closed-form. The annuity formula would
 * be shorter, but it cannot produce the year-by-year series the chart and the
 * data table need, and having one code path means the headline figure and the
 * last row of the table cannot disagree — which they will, eventually, if the
 * total is computed one way and the schedule another.
 *
 * Contributions accumulate in cents so that `totalContributions` is exact and
 * `totalInterest` is a true residual. The balance stays a double through the
 * loop: rounding a compounding balance every month would compound the
 * rounding error alongside the interest, so it is rounded once, on the way
 * out.
 *
 * Contributions are made at the end of each month (an ordinary annuity). A
 * reader whose salary arrives on the 1st is a month better off than this
 * shows; that is the conservative direction, and the assumption is stated in
 * the page's explanation.
 */
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

  // Whole months. A fractional year in the input is rounded to the nearest
  // month rather than silently truncated, so 10.5 years is 126 months.
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
      // A rate near the upper bound over a century can genuinely leave the
      // representable range. Refusing beats printing 1e21 as if it meant
      // something.
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
  // A residual, not a second sum: whatever is not contribution is growth, so
  // the three figures on the result card always reconcile.
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

/**
 * The balance a lump sum reaches with no contributions — the textbook
 * `A = P(1 + r/n)^(nt)`.
 *
 * Kept separate from the simulation because other calculators need the bare
 * factor, and because it is the closed form the unit tests check the
 * simulation against.
 */
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
