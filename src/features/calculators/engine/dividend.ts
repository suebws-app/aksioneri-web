import {
  allFinite,
  asFraction,
  isRepresentableMoney,
  isValidRatePercent,
  isValidYears,
  roundMoney,
} from './guards';
import { ok, refuse, type Outcome } from './types';

export interface DividendInput {
  readonly investment: number;
  readonly sharePrice: number;
  readonly dividendPerShare: number;
  readonly growthPercent: number;
  readonly years: number;
  readonly reinvest: 'yes' | 'no';
  readonly priceGrowthPercent: number;
}

export interface DividendYear {
  readonly year: number;
  readonly shares: number;
  readonly income: number;
  readonly cumulativeIncome: number;
  readonly portfolioValue: number;
}

export interface DividendResult {
  readonly annualIncome: number;
  readonly monthlyIncome: number;
  readonly currentYieldPercent: number;
  readonly yieldOnCostPercent: number;
  readonly futureAnnualIncome: number;
  readonly totalDividends: number;
  readonly portfolioValue: number;
  readonly schedule: readonly DividendYear[];
}

export function computeDividend(input: DividendInput): Outcome<DividendResult> {
  const {
    investment,
    sharePrice,
    dividendPerShare,
    growthPercent,
    years,
    reinvest,
    priceGrowthPercent,
  } = input;

  if (
    !allFinite(
      investment,
      sharePrice,
      dividendPerShare,
      growthPercent,
      years,
      priceGrowthPercent,
    )
  ) {
    return refuse('nonFinite');
  }
  if (investment < 0 || sharePrice < 0 || dividendPerShare < 0) {
    return refuse('negativeAmount');
  }
  if (
    !isValidRatePercent(growthPercent) ||
    !isValidRatePercent(priceGrowthPercent)
  ) {
    return refuse('rateOutOfRange');
  }
  if (!isValidYears(years)) return refuse('termOutOfRange');
  if (sharePrice === 0) return refuse('divideByZero');
  if (!isRepresentableMoney(investment)) return refuse('overflow');

  const dividendGrowth = 1 + asFraction(growthPercent);
  const priceGrowth = 1 + asFraction(priceGrowthPercent);

  let shares = investment / sharePrice;
  let perShare = dividendPerShare;
  let price = sharePrice;
  let cumulative = 0;

  const schedule: DividendYear[] = [];

  for (let year = 1; year <= Math.round(years); year += 1) {
    const income = shares * perShare;
    cumulative += income;

    if (reinvest === 'yes') {
      price *= priceGrowth;
      shares += income / price;
    } else {
      price *= priceGrowth;
    }

    perShare *= dividendGrowth;

    const portfolioValue = shares * price;
    if (!Number.isFinite(portfolioValue)) return refuse('overflow');

    schedule.push({
      year,
      shares: Math.round(shares * 10_000) / 10_000,
      income: roundMoney(income),
      cumulativeIncome: roundMoney(cumulative),
      portfolioValue: roundMoney(portfolioValue),
    });
  }

  const firstYearIncome = (investment / sharePrice) * dividendPerShare;
  const last = schedule.at(-1);

  return ok({
    annualIncome: roundMoney(firstYearIncome),
    monthlyIncome: roundMoney(firstYearIncome / 12),
    currentYieldPercent: roundMoney((dividendPerShare / sharePrice) * 100),
    yieldOnCostPercent:
      investment === 0
        ? 0
        : roundMoney(((last?.income ?? 0) / investment) * 100),
    futureAnnualIncome: roundMoney(last?.income ?? 0),
    totalDividends: roundMoney(cumulative),
    portfolioValue: roundMoney(last?.portfolioValue ?? investment),
    schedule,
  });
}

export function requiredInvestment(
  monthlyTarget: number,
  yieldPercent: number,
): Outcome<number> {
  if (!allFinite(monthlyTarget, yieldPercent)) return refuse('nonFinite');
  if (monthlyTarget < 0) return refuse('negativeAmount');
  if (yieldPercent <= 0) return refuse('divideByZero');

  const required = (monthlyTarget * 12) / asFraction(yieldPercent);
  if (!isRepresentableMoney(required)) return refuse('overflow');

  return ok(roundMoney(required));
}
