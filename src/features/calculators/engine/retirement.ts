import {
  allFinite,
  asFraction,
  deflate,
  isRepresentableMoney,
  isValidRatePercent,
  roundMoney,
} from './guards';
import { ok, refuse, type Outcome } from './types';

/**
 * The three futures every projection should show.
 *
 * A single number invites a reader to treat a projection as a plan. Three
 * make the range visible, which is the honest presentation — and the spread
 * between them is usually more informative than any one of them.
 *
 * Offsets are applied to whatever return the reader assumes, so a cautious
 * reader who enters 4% still sees a cautious band around it.
 */
export const SCENARIOS = {
  conservative: -3,
  base: 0,
  optimistic: +3,
} as const;

export type ScenarioName = keyof typeof SCENARIOS;

export interface RetirementInput {
  readonly currentAge: number;
  readonly retirementAge: number;
  readonly currentSavings: number;
  readonly monthlyContribution: number;
  readonly returnPercent: number;
  readonly inflationPercent: number;
  /** Income wanted per month, in today's money. */
  readonly desiredMonthlyIncome: number;
  /** How many years the pot has to last. */
  readonly retirementYears: number;
  /** State or occupational pension expected per month, in today's money. */
  readonly existingPensionMonthly: number;
}

export interface ScenarioOutcome {
  readonly name: ScenarioName;
  readonly ratePercent: number;
  readonly projectedPot: number;
  /** Pot expressed in today's money. */
  readonly realPot: number;
  readonly sustainableMonthlyIncome: number;
}

export interface RetirementResult {
  readonly yearsToRetirement: number;
  readonly projectedPot: number;
  readonly realPot: number;
  /** What the pot must be to fund the gap for the whole retirement. */
  readonly requiredPot: number;
  /** Positive is a surplus, negative a shortfall. */
  readonly gap: number;
  readonly sustainableMonthlyIncome: number;
  /** What would have to be saved monthly to close a shortfall. */
  readonly requiredMonthlyContribution: number;
  readonly scenarios: readonly ScenarioOutcome[];
  readonly schedule: readonly { year: number; age: number; balance: number }[];
}

/** Accumulate a pot: a starting balance plus monthly contributions. */
function accumulate(
  start: number,
  monthly: number,
  annualRatePercent: number,
  years: number,
): number {
  const monthlyRate = asFraction(annualRatePercent) / 12;
  const months = Math.round(years * 12);

  if (monthlyRate === 0) return start + monthly * months;

  const growth = (1 + monthlyRate) ** months;
  return start * growth + monthly * ((growth - 1) / monthlyRate);
}

/**
 * The pot needed today to pay `monthly` for `years`, while still earning.
 *
 * The present value of an annuity, in **real** terms: the return used is the
 * real return, because the income has to keep pace with prices for the whole
 * retirement. Using the nominal return here is the single most common way a
 * retirement calculator overstates what a pot will buy.
 */
function annuityPresentValue(
  monthly: number,
  realAnnualRatePercent: number,
  years: number,
): number {
  const monthlyRate = asFraction(realAnnualRatePercent) / 12;
  const months = Math.round(years * 12);

  if (monthlyRate <= 0) return monthly * months;

  return monthly * ((1 - (1 + monthlyRate) ** -months) / monthlyRate);
}

export function computeRetirement(
  input: RetirementInput,
): Outcome<RetirementResult> {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    returnPercent,
    inflationPercent,
    desiredMonthlyIncome,
    retirementYears,
    existingPensionMonthly,
  } = input;

  if (
    !allFinite(
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      returnPercent,
      inflationPercent,
      desiredMonthlyIncome,
      retirementYears,
      existingPensionMonthly,
    )
  ) {
    return refuse('nonFinite');
  }

  if (currentSavings < 0 || monthlyContribution < 0)
    return refuse('negativeAmount');
  if (desiredMonthlyIncome < 0 || existingPensionMonthly < 0) {
    return refuse('negativeAmount');
  }
  if (
    !isValidRatePercent(returnPercent) ||
    !isValidRatePercent(inflationPercent)
  ) {
    return refuse('rateOutOfRange');
  }
  if (currentAge < 16 || currentAge > 100) return refuse('termOutOfRange');
  // Already retired is a different calculation, not this one.
  if (retirementAge <= currentAge || retirementAge > 100) {
    return refuse('termOutOfRange');
  }
  if (retirementYears <= 0 || retirementYears > 60)
    return refuse('termOutOfRange');
  if (!isRepresentableMoney(currentSavings)) return refuse('overflow');

  const yearsToRetirement = retirementAge - currentAge;

  const projectedPot = accumulate(
    currentSavings,
    monthlyContribution,
    returnPercent,
    yearsToRetirement,
  );

  if (!isRepresentableMoney(projectedPot)) return refuse('overflow');

  // Fisher, not subtraction: (1+r)/(1+i)−1. At 7% and 2% the difference from
  // "5%" is small; at 30% and 20% it is not, and the formula should not stop
  // working when the numbers get interesting.
  const realReturnPercent =
    ((1 + asFraction(returnPercent)) / (1 + asFraction(inflationPercent)) - 1) *
    100;

  const monthlyGap = Math.max(desiredMonthlyIncome - existingPensionMonthly, 0);
  const requiredPot = annuityPresentValue(
    monthlyGap,
    realReturnPercent,
    retirementYears,
  );

  const realPot = deflate(projectedPot, inflationPercent, yearsToRetirement);

  // The pot is compared in today's money, because the income target was
  // stated in today's money. Comparing a nominal pot with a real requirement
  // is the mistake this ordering exists to prevent.
  const gap = roundMoney(realPot - requiredPot);

  const sustainableMonthlyIncome = (() => {
    const monthlyRate = asFraction(realReturnPercent) / 12;
    const months = Math.round(retirementYears * 12);
    if (monthlyRate <= 0) return realPot / months;
    return (realPot * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
  })();

  // What monthly saving would close the shortfall, holding everything else.
  const requiredMonthlyContribution = (() => {
    if (gap >= 0) return 0;

    const nominalRequired =
      requiredPot * (1 + asFraction(inflationPercent)) ** yearsToRetirement;
    const monthlyRate = asFraction(returnPercent) / 12;
    const months = Math.round(yearsToRetirement * 12);

    const grown =
      monthlyRate === 0
        ? currentSavings
        : currentSavings * (1 + monthlyRate) ** months;

    const shortfall = nominalRequired - grown;
    if (shortfall <= 0) return 0;

    if (monthlyRate === 0) return shortfall / months;

    const factor = ((1 + monthlyRate) ** months - 1) / monthlyRate;
    return shortfall / factor;
  })();

  const scenarios: ScenarioOutcome[] = (
    Object.keys(SCENARIOS) as ScenarioName[]
  ).map((name) => {
    const ratePercent = returnPercent + SCENARIOS[name];
    const pot = accumulate(
      currentSavings,
      monthlyContribution,
      ratePercent,
      yearsToRetirement,
    );
    const scenarioReal = deflate(pot, inflationPercent, yearsToRetirement);

    const scenarioRealReturn =
      ((1 + asFraction(ratePercent)) / (1 + asFraction(inflationPercent)) - 1) *
      100;

    const monthlyRate = asFraction(scenarioRealReturn) / 12;
    const months = Math.round(retirementYears * 12);
    const income =
      monthlyRate <= 0
        ? scenarioReal / months
        : (scenarioReal * monthlyRate) / (1 - (1 + monthlyRate) ** -months);

    return {
      name,
      ratePercent: roundMoney(ratePercent),
      projectedPot: roundMoney(pot),
      realPot: roundMoney(scenarioReal),
      sustainableMonthlyIncome: roundMoney(income),
    };
  });

  const schedule: { year: number; age: number; balance: number }[] = [];
  for (let year = 1; year <= yearsToRetirement; year += 1) {
    schedule.push({
      year,
      age: currentAge + year,
      balance: roundMoney(
        accumulate(currentSavings, monthlyContribution, returnPercent, year),
      ),
    });
  }

  return ok({
    yearsToRetirement,
    projectedPot: roundMoney(projectedPot),
    realPot: roundMoney(realPot),
    requiredPot: roundMoney(requiredPot),
    gap,
    sustainableMonthlyIncome: roundMoney(sustainableMonthlyIncome),
    requiredMonthlyContribution: roundMoney(requiredMonthlyContribution),
    scenarios,
    schedule,
  });
}
