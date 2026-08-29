import { compoundInterest } from './definitions/compoundInterest';
import { currencyConverter } from './definitions/currencyConverter';
import { dca } from './definitions/dca';
import { dividend } from './definitions/dividend';
import { inflationAdjustment } from './definitions/inflationAdjustment';
import { investmentReturn } from './definitions/investmentReturn';
import { loan } from './definitions/loan';
import { mortgage } from './definitions/mortgage';
import { percentageReturn } from './definitions/percentageReturn';
import { stockProfit } from './definitions/stockProfit';
import { retirement } from './definitions/retirement';
import type {
  AnyCalculator,
  CalculatorCategory,
  CalculatorSlug,
} from './types';

const REGISTRY: Partial<Record<CalculatorSlug, AnyCalculator>> = {
  'compound-interest': compoundInterest as unknown as AnyCalculator,
  cagr: investmentReturn as unknown as AnyCalculator,
  mortgage: mortgage as unknown as AnyCalculator,
  'inflation-adjustment': inflationAdjustment as unknown as AnyCalculator,
  'loan-amortization': loan as unknown as AnyCalculator,
  'dividend-reinvestment': dividend as unknown as AnyCalculator,
  'dollar-cost-averaging': dca as unknown as AnyCalculator,
  'percentage-return': percentageReturn as unknown as AnyCalculator,
  retirement: retirement as unknown as AnyCalculator,
  'currency-converter': currencyConverter as unknown as AnyCalculator,
  'stock-profit': stockProfit as unknown as AnyCalculator,
};

export const getCalculators = (): AnyCalculator[] =>
  Object.values(REGISTRY).sort((a, b) => a.order - b.order);

export const getCalculatorSlugs = (): CalculatorSlug[] =>
  getCalculators().map((calculator) => calculator.slug);

export const getCalculator = (slug: string): AnyCalculator | null =>
  REGISTRY[slug as CalculatorSlug] ?? null;

export const getCalculatorsByCategory = (
  category: CalculatorCategory,
): AnyCalculator[] =>
  getCalculators().filter((calculator) => calculator.category === category);

export const getRelatedCalculators = (
  calculator: AnyCalculator,
): AnyCalculator[] =>
  calculator.relatedSlugs
    .map((slug) => getCalculator(slug))
    .filter((related): related is AnyCalculator => related !== null);
