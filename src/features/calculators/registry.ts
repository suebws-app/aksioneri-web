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

/**
 * Every calculator the site publishes.
 *
 * This is the only place a calculator is registered. The route, the sitemap,
 * the landing page, the "related calculators" rail and the article matcher
 * all read from here, so adding one is a line in this object — and forgetting
 * to add it anywhere else is not possible.
 *
 * Definitions are stored with their generics erased. No consumer knows a
 * calculator's input shape: the page reads `fields`, calls `compute` through
 * the definition, and formats what `toResultSpec` describes. Recovering the
 * types would buy nothing and would leak into every component signature.
 *
 * `Partial<Record<…>>` rather than `Record<…>` on purpose: `CalculatorSlug`
 * names all ten calculators the suite will have, and they arrive over several
 * milestones. A total record would refuse to compile until the last one
 * landed.
 */
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

/** Published calculators, in editorial order. */
export const getCalculators = (): AnyCalculator[] =>
  Object.values(REGISTRY).sort((a, b) => a.order - b.order);

export const getCalculatorSlugs = (): CalculatorSlug[] =>
  getCalculators().map((calculator) => calculator.slug);

/**
 * A calculator by slug, or `null`.
 *
 * Returns null rather than throwing so the route can call `notFound()` — a
 * bad slug is a 404, not a 500.
 */
export const getCalculator = (slug: string): AnyCalculator | null =>
  REGISTRY[slug as CalculatorSlug] ?? null;

export const getCalculatorsByCategory = (
  category: CalculatorCategory,
): AnyCalculator[] =>
  getCalculators().filter((calculator) => calculator.category === category);

/** Resolves `relatedSlugs`, dropping any calculator that has not shipped yet. */
export const getRelatedCalculators = (
  calculator: AnyCalculator,
): AnyCalculator[] =>
  calculator.relatedSlugs
    .map((slug) => getCalculator(slug))
    .filter((related): related is AnyCalculator => related !== null);
