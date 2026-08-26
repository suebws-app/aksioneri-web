import { z } from 'zod';
import { computeStock, type StockInput, type StockResult } from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const defaults: StockInput = {
  shares: 100,
  purchasePrice: 150,
  currentPrice: 210,
  dividendPerShare: 2.5,
  fees: 20,
  purchaseDate: '2023-01-02',
  saleDate: '2026-01-02',
  inflationPercent: 2,
};

const fields: readonly FieldSpec<StockInput>[] = [
  {
    kind: 'number',
    name: 'shares',
    param: 'shares',
    min: 0,
    max: 1e9,
    step: 1,
  },
  {
    kind: 'currency',
    name: 'purchasePrice',
    param: 'buy',
    min: 0,
    max: 1e7,
    step: 1,
  },
  {
    kind: 'currency',
    name: 'currentPrice',
    param: 'now',
    min: 0,
    max: 1e7,
    step: 1,
  },
  { kind: 'date', name: 'purchaseDate', param: 'from' },
  { kind: 'date', name: 'saleDate', param: 'to' },
  {
    kind: 'currency',
    name: 'dividendPerShare',
    param: 'dps',
    min: 0,
    max: 1e6,
    step: 0.1,
    advanced: true,
  },
  {
    kind: 'currency',
    name: 'fees',
    param: 'fees',
    min: 0,
    max: 1e7,
    step: 5,
    advanced: true,
  },
  {
    kind: 'percent',
    name: 'inflationPercent',
    param: 'inflation',
    min: 0,
    max: 100,
    step: 0.1,
    advanced: true,
  },
];

const schema = (t: Translate) =>
  z.object({
    shares: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.notNegative') }),
    purchasePrice: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    currentPrice: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    dividendPerShare: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    fees: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    purchaseDate: z.string(),
    saleDate: z.string(),
    inflationPercent: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(100, { message: t('errors.rateRange') }),
  }) satisfies z.ZodType<StockInput>;

/**
 * `marketData: none`, deliberately.
 *
 * The spec allows optionally pulling a live price for a ticker, and the API
 * can now do it (`/markets/search`, `/markets/asset/:symbol`). But the
 * calculation must not depend on it: a reader working out a past sale needs
 * historical prices they already know, and a calculator that refuses to work
 * without a live quote would be useless exactly when someone is doing their
 * tax return. Prices are typed; a lookup can prefill them later without
 * changing anything here.
 */
export const stockProfit: CalculatorDefinition<StockInput, StockResult> = {
  slug: 'stock-profit',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeStock(input),

  toResultSpec: (result) => ({
    primary: {
      labelKey: 'totalProfit',
      value: result.totalProfit,
      format: 'moneyWhole',
    },
    secondary: [
      {
        labelKey: 'totalReturn',
        value: result.totalReturnPercent,
        format: 'percentChange',
      },
      {
        labelKey: 'annualised',
        value: result.annualisedPercent,
        format: 'percentChange',
      },
      {
        labelKey: 'realAnnualised',
        value: result.realAnnualisedPercent,
        format: 'percentChange',
      },
      {
        labelKey: 'currentValue',
        value: result.currentValue,
        format: 'moneyWhole',
      },
      {
        labelKey: 'priceProfit',
        value: result.priceProfit,
        format: 'moneyWhole',
      },
      {
        labelKey: 'dividendIncome',
        value: result.dividendIncome,
        format: 'moneyWhole',
      },
      // The number that answers "am I actually up?", which no other
      // calculator in the suite reports.
      { labelKey: 'breakEven', value: result.breakEvenPrice, format: 'money' },
      { labelKey: 'cost', value: result.cost, format: 'moneyWhole' },
    ],
  }),

  marketData: { kind: 'none' },
  category: 'markets',
  messageKey: 'stockProfit',
  disclaimer: 'investment',
  // Albanian **and** English. The wire arrives in English and is only
  // translated when the OpenAI-backed worker is enabled, so an
  // Albanian-only vocabulary matches nothing on an untranslated story —
  // the exact failure `features/learn/matchNews.ts` documents, where
  // matching a lesson's Albanian terms against the wire "found nothing
  // at all".
  newsPhrases: [
    'aksione',
    'fitim nga aksionet',
    'bursë',
    'shitje aksionesh',
    'çmimi i aksionit',
    'shares',
    'stock',
    'share price',
    'equity',
    'stock market',
  ],
  relatedSlugs: ['cagr', 'dividend-reinvestment', 'percentage-return'],
  faqCount: 3,
  embeddableIn: ['stocks', 'markets'],
  order: 11,
};
