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

/** Day counts per year, for turning two dates into a fraction of a year. */
const DAYS_PER_YEAR = 365.25;

const MS_PER_DAY = 86_400_000;

/**
 * Whole days between two ISO calendar dates.
 *
 * Both parsed at UTC midnight, the same discipline `formatDate.ts` applies:
 * a local-midnight parse shifts by an hour twice a year and a holding period
 * silently gains or loses a day.
 */
export function daysBetween(from: string, to: string): number | null {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);

  if (Number.isNaN(start) || Number.isNaN(end)) return null;

  return Math.round((end - start) / MS_PER_DAY);
}

/**
 * Years between two dates, as a fraction.
 *
 * 365.25 rather than 365: over a ten-year holding period the leap days are
 * two and a half of them, and ignoring them overstates the annualised return
 * by enough to matter at the second decimal.
 */
export function yearsBetween(from: string, to: string): number | null {
  const days = daysBetween(from, to);
  return days === null ? null : days / DAYS_PER_YEAR;
}

export interface ReturnInput {
  /** What was paid, in total, including any later contributions. */
  readonly invested: number;
  /** What it is worth now, or what it sold for. */
  readonly currentValue: number;
  /** Cash received along the way. */
  readonly dividends: number;
  /** Commissions, spreads, platform charges. */
  readonly fees: number;
  readonly purchaseDate: string;
  readonly saleDate: string;
  readonly inflationPercent: number;
}

export interface ReturnResult {
  /** Money kept, after dividends and fees. */
  readonly profit: number;
  /** Profit as a percentage of what was invested. */
  readonly returnPercent: number;
  /** Compound annual growth rate, as a percentage. */
  readonly cagrPercent: number;
  readonly totalDividends: number;
  readonly totalFees: number;
  /** CAGR after inflation — the only figure that says what was really gained. */
  readonly realCagrPercent: number;
  readonly years: number;
}

/**
 * What an investment actually returned.
 *
 * Total return, not price return: dividends are added and fees subtracted
 * before anything else, because a headline that ignores either is the most
 * common way a return gets overstated.
 *
 * CAGR is the smoothed annual rate that would have produced the same ending
 * value — not the average of the yearly returns, which is a different and
 * always-larger number. For holdings under a year it is still reported, but
 * it means "the rate this pace implies if it continued", and the page says so.
 */
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

  // A return on nothing is undefined, not infinite.
  if (invested === 0) return refuse('divideByZero');

  const years = yearsBetween(input.purchaseDate, input.saleDate);
  if (years === null) return refuse('nonFinite');
  // A sale before the purchase is a typo, not a negative holding period.
  if (years <= 0) return refuse('termOutOfRange');

  const endingValue = currentValue + dividends - fees;
  const profit = roundMoney(endingValue - invested);
  const returnPercent = roundMoney((profit / invested) * 100);

  // A wipeout leaves nothing to take a root of; −100% a year is the answer
  // and the formula cannot express it.
  const growth = endingValue / invested;
  const cagrPercent =
    growth <= 0 ? -100 : roundMoney((growth ** (1 / years) - 1) * 100);

  // Deflating the ending value first, rather than subtracting inflation from
  // the nominal rate: the subtraction is an approximation that drifts as
  // soon as either number is large.
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

/**
 * Percentage change between two numbers.
 *
 * Its own calculator because the mistake it prevents is so common: a rate
 * moving from 2% to 3% has risen by **one percentage point** and by **fifty
 * percent**, and the two are not interchangeable. Both are returned, and the
 * page labels them differently.
 */
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

/**
 * What a sum is worth after a stretch of constant inflation.
 *
 * The rate-based form. The index-based form — real CPI or HICP series —
 * arrives with the rates module; until then this is honest as long as the
 * page presents the rate as the reader's assumption, which it does.
 */
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

  // Two different questions, and readers conflate them: what the same basket
  // will cost later, and what today's money will buy by then.
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
