import {
  allFinite,
  asFraction,
  deflate,
  isRepresentableMoney,
  isValidRatePercent,
  roundMoney,
} from './guards';
import { ok, refuse, type Outcome } from './types';

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
  readonly desiredMonthlyIncome: number;
  readonly retirementYears: number;
  readonly existingPensionMonthly: number;
}

export interface ScenarioOutcome {
  readonly name: ScenarioName;
  readonly ratePercent: number;
  readonly projectedPot: number;
  readonly realPot: number;
  readonly sustainableMonthlyIncome: number;
}

export interface RetirementResult {
  readonly yearsToRetirement: number;
  readonly projectedPot: number;
  readonly realPot: number;
  readonly requiredPot: number;
  readonly gap: number;
  readonly sustainableMonthlyIncome: number;
  readonly requiredMonthlyContribution: number;
  readonly scenarios: readonly ScenarioOutcome[];
  readonly schedule: readonly { year: number; age: number; balance: number }[];
}

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

  const gap = roundMoney(realPot - requiredPot);

  const sustainableMonthlyIncome = (() => {
    const monthlyRate = asFraction(realReturnPercent) / 12;
    const months = Math.round(retirementYears * 12);
    if (monthlyRate <= 0) return realPot / months;
    return (realPot * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
  })();

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
