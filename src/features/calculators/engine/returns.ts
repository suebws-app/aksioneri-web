import {
  allFinite,
  asFraction,
  deflate,
  isRepresentableMoney,
  isValidRatePercent,
  isValidYears,
  roundMoney,
} from './guards';
import { ok, refuse, type Outcome } from './types';

const DAYS_PER_YEAR = 365.25;

const MS_PER_DAY = 86_400_000;

export function daysBetween(from: string, to: string): number | null {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);

  if (Number.isNaN(start) || Number.isNaN(end)) return null;

  return Math.round((end - start) / MS_PER_DAY);
}

export function yearsBetween(from: string, to: string): number | null {
  const days = daysBetween(from, to);
  return days === null ? null : days / DAYS_PER_YEAR;
}

export interface ReturnInput {
  readonly invested: number;
  readonly currentValue: number;
  readonly dividends: number;
  readonly fees: number;
  readonly purchaseDate: string;
  readonly saleDate: string;
  readonly inflationPercent: number;
}

export interface ReturnResult {
  readonly profit: number;
  readonly returnPercent: number;
  readonly cagrPercent: number;
  readonly totalDividends: number;
  readonly totalFees: number;
  readonly realCagrPercent: number;
  readonly years: number;
}

export function computeReturn(input: ReturnInput): Outcome<ReturnResult> {
  const { invested, currentValue, dividends, fees, inflationPercent } = input;

  if (!allFinite(invested, currentValue, dividends, fees, inflationPercent)) {
    return refuse('nonFinite');
  }
  if (invested < 0 || currentValue < 0 || dividends < 0 || fees < 0) {
    return refuse('negativeAmount');
  }
  if (!isValidRatePercent(inflationPercent)) return refuse('rateOutOfRange');
  if (!isRepresentableMoney(invested) || !isRepresentableMoney(currentValue)) {
    return refuse('overflow');
  }

  if (invested === 0) return refuse('divideByZero');

  const years = yearsBetween(input.purchaseDate, input.saleDate);
  if (years === null) return refuse('nonFinite');
  if (years <= 0) return refuse('termOutOfRange');

  const endingValue = currentValue + dividends - fees;
  const profit = roundMoney(endingValue - invested);
  const returnPercent = roundMoney((profit / invested) * 100);

  const growth = endingValue / invested;
  const cagrPercent =
    growth <= 0 ? -100 : roundMoney((growth ** (1 / years) - 1) * 100);

  const realEnding = deflate(endingValue, inflationPercent, years);
  const realGrowth = realEnding / invested;
  const realCagrPercent =
    realGrowth <= 0 ? -100 : roundMoney((realGrowth ** (1 / years) - 1) * 100);

  return ok({
    profit,
    returnPercent,
    cagrPercent,
    totalDividends: roundMoney(dividends),
    totalFees: roundMoney(fees),
    realCagrPercent,
    years: Math.round(years * 100) / 100,
  });
}

export interface SimpleChangeInput {
  readonly from: number;
  readonly to: number;
}

export function computeChange(
  input: SimpleChangeInput,
): Outcome<{ changePercent: number; changePoints: number; multiple: number }> {
  const { from, to } = input;

  if (!allFinite(from, to)) return refuse('nonFinite');
  if (from === 0) return refuse('divideByZero');

  return ok({
    changePercent: roundMoney(((to - from) / Math.abs(from)) * 100),
    changePoints: roundMoney(to - from),
    multiple: roundMoney(to / from),
  });
}

export function computeInflation(input: {
  readonly amount: number;
  readonly ratePercent: number;
  readonly years: number;
}): Outcome<{
  futureCost: number;
  purchasingPower: number;
  cumulativePercent: number;
  lostValue: number;
}> {
  const { amount, ratePercent, years } = input;

  if (!allFinite(amount, ratePercent, years)) return refuse('nonFinite');
  if (amount < 0) return refuse('negativeAmount');
  if (!isValidRatePercent(ratePercent)) return refuse('rateOutOfRange');
  if (!isValidYears(years)) return refuse('termOutOfRange');

  const factor = (1 + asFraction(ratePercent)) ** years;

  const futureCost = amount * factor;
  const purchasingPower = amount / factor;

  if (!isRepresentableMoney(futureCost)) return refuse('overflow');

  return ok({
    futureCost: roundMoney(futureCost),
    purchasingPower: roundMoney(purchasingPower),
    cumulativePercent: roundMoney((factor - 1) * 100),
    lostValue: roundMoney(amount - purchasingPower),
  });
}
