import {
  allFinite,
  deflate,
  isRepresentableMoney,
  isValidRatePercent,
  roundMoney,
} from './guards';
import { yearsBetween } from './returns';
import { ok, refuse, type Outcome } from './types';

export interface StockInput {
  readonly shares: number;
  readonly purchasePrice: number;
  readonly currentPrice: number;
  readonly dividendPerShare: number;
  readonly fees: number;
  readonly purchaseDate: string;
  readonly saleDate: string;
  readonly inflationPercent: number;
}

export interface StockResult {
  readonly cost: number;
  readonly currentValue: number;
  readonly priceProfit: number;
  readonly dividendIncome: number;
  readonly totalProfit: number;
  readonly totalReturnPercent: number;
  readonly annualisedPercent: number;
  readonly realAnnualisedPercent: number;
  readonly breakEvenPrice: number;
  readonly years: number;
}

export function computeStock(input: StockInput): Outcome<StockResult> {
  const {
    shares,
    purchasePrice,
    currentPrice,
    dividendPerShare,
    fees,
    inflationPercent,
  } = input;

  if (
    !allFinite(
      shares,
      purchasePrice,
      currentPrice,
      dividendPerShare,
      fees,
      inflationPercent,
    )
  ) {
    return refuse('nonFinite');
  }
  if (shares < 0 || purchasePrice < 0 || currentPrice < 0) {
    return refuse('negativeAmount');
  }
  if (dividendPerShare < 0 || fees < 0) return refuse('negativeAmount');
  if (!isValidRatePercent(inflationPercent)) return refuse('rateOutOfRange');

  const cost = shares * purchasePrice + fees;
  if (shares === 0 || cost === 0) return refuse('divideByZero');
  if (!isRepresentableMoney(cost)) return refuse('overflow');

  const years = yearsBetween(input.purchaseDate, input.saleDate);
  if (years === null) return refuse('nonFinite');
  if (years <= 0) return refuse('termOutOfRange');

  const currentValue = shares * currentPrice;
  const dividendIncome = shares * dividendPerShare;

  const priceProfit = currentValue - shares * purchasePrice;
  const totalProfit = currentValue + dividendIncome - cost;

  const totalReturnPercent = (totalProfit / cost) * 100;

  const growth = (currentValue + dividendIncome) / cost;
  const annualisedPercent =
    growth <= 0 ? -100 : (growth ** (1 / years) - 1) * 100;

  const realGrowth =
    deflate(currentValue + dividendIncome, inflationPercent, years) / cost;
  const realAnnualisedPercent =
    realGrowth <= 0 ? -100 : (realGrowth ** (1 / years) - 1) * 100;

  const breakEvenPrice = (cost - dividendIncome) / shares;

  return ok({
    cost: roundMoney(cost),
    currentValue: roundMoney(currentValue),
    priceProfit: roundMoney(priceProfit),
    dividendIncome: roundMoney(dividendIncome),
    totalProfit: roundMoney(totalProfit),
    totalReturnPercent: roundMoney(totalReturnPercent),
    annualisedPercent: roundMoney(annualisedPercent),
    realAnnualisedPercent: roundMoney(realAnnualisedPercent),
    breakEvenPrice: roundMoney(breakEvenPrice),
    years: Math.round(years * 100) / 100,
  });
}
