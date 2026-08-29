import { z } from 'zod';
import {
  computeDividend,
  type DividendInput,
  type DividendResult,
} from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const REINVEST = ['yes', 'no'] as const;

const defaults: DividendInput = {
  investment: 25_000,
  sharePrice: 50,
  dividendPerShare: 2,
  growthPercent: 5,
  years: 20,
  reinvest: 'yes',
  priceGrowthPercent: 4,
};

const fields: readonly FieldSpec<DividendInput>[] = [
  {
    kind: 'currency',
    name: 'investment',
    param: 'amount',
    min: 0,
    max: 1e10,
    step: 1_000,
  },
  {
    kind: 'currency',
    name: 'sharePrice',
    param: 'price',
    min: 0.01,
    max: 1e6,
    step: 1,
  },
  {
    kind: 'currency',
    name: 'dividendPerShare',
    param: 'dps',
    min: 0,
    max: 1e5,
    step: 0.1,
  },
  { kind: 'segmented', name: 'reinvest', param: 'drip', options: REINVEST },
  {
    kind: 'percent',
    name: 'growthPercent',
    param: 'growth',
    min: 0,
    max: 50,
    step: 0.5,
    advanced: true,
  },
  {
    kind: 'percent',
    name: 'priceGrowthPercent',
    param: 'pricegrowth',
    min: -20,
    max: 50,
    step: 0.5,
    advanced: true,
  },
  {
    kind: 'number',
    name: 'years',
    param: 'years',
    min: 1,
    max: 60,
    step: 1,
    unitKey: 'units.years',
    advanced: true,
  },
];

const schema = (t: Translate) =>
  z.object({
    investment: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    sharePrice: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.notNegative') }),
    dividendPerShare: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    growthPercent: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(50, { message: t('errors.rateRange') }),
    years: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.yearsRange', { max: 60 }) })
      .max(60, { message: t('errors.yearsRange', { max: 60 }) }),
    reinvest: z.enum(REINVEST),
    priceGrowthPercent: z
      .number({ message: t('errors.number') })
      .min(-20, { message: t('errors.rateRange') })
      .max(50, { message: t('errors.rateRange') }),
  }) satisfies z.ZodType<DividendInput>;

export const dividend: CalculatorDefinition<DividendInput, DividendResult> = {
  slug: 'dividend-reinvestment',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeDividend(input),

  toResultSpec: (result) => ({
    primary: {
      labelKey: 'annualIncome',
      value: result.annualIncome,
      format: 'money',
    },
    secondary: [
      {
        labelKey: 'monthlyIncome',
        value: result.monthlyIncome,
        format: 'money',
      },
      {
        labelKey: 'currentYield',
        value: result.currentYieldPercent,
        format: 'percent',
      },
      {
        labelKey: 'yieldOnCost',
        value: result.yieldOnCostPercent,
        format: 'percent',
        projected: true,
      },
      {
        labelKey: 'futureIncome',
        value: result.futureAnnualIncome,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'totalDividends',
        value: result.totalDividends,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'portfolioValue',
        value: result.portfolioValue,
        format: 'moneyWhole',
        projected: true,
      },
    ],
    table: {
      columnKeys: [
        'year',
        'shares',
        'income',
        'cumulativeIncome',
        'portfolioValue',
      ],
      rows: result.schedule.map((row) => [
        { labelKey: 'year', value: row.year, format: 'plain' as const },
        { labelKey: 'shares', value: row.shares, format: 'plain' as const },
        {
          labelKey: 'income',
          value: row.income,
          format: 'moneyWhole' as const,
        },
        {
          labelKey: 'cumulativeIncome',
          value: row.cumulativeIncome,
          format: 'moneyWhole' as const,
        },
        {
          labelKey: 'portfolioValue',
          value: row.portfolioValue,
          format: 'moneyWhole' as const,
        },
      ]),
      previewRows: 5,
    },
  }),

  toChartSpec: (result) => ({
    kind: 'line',
    xLabelKey: 'chart.xAxis',
    x: result.schedule.map((row) => row.year),
    series: [
      {
        idKey: 'chart.income',
        values: result.schedule.map((r) => r.income),
        emphasis: true,
      },
      {
        idKey: 'chart.cumulative',
        values: result.schedule.map((r) => r.cumulativeIncome),
      },
    ],
  }),

  marketData: { kind: 'none' },
  category: 'investing',
  messageKey: 'dividend',
  disclaimer: 'investment',
  newsPhrases: [
    'dividend',
    'yield',
    'të ardhura pasive',
    'aksione dividendi',
    'dividend',
    'dividend yield',
    'payout',
    'income investing',
  ],
  relatedSlugs: ['compound-interest', 'cagr', 'retirement'],
  faqCount: 4,
  embeddableIn: ['stocks', 'markets', 'economy'],
  order: 6,
};
