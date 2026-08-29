import { z } from 'zod';
import {
  computeCompound,
  MAX_YEARS,
  type CompoundInput,
  type CompoundResult,
} from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const COMPOUNDING_OPTIONS = [
  'annually',
  'semiannually',
  'quarterly',
  'monthly',
  'daily',
] as const;

const defaults: CompoundInput = {
  initial: 10_000,
  monthly: 500,
  ratePercent: 7,
  years: 20,
  compounding: 'monthly',
  inflationPercent: 2,
};

const fields: readonly FieldSpec<CompoundInput>[] = [
  {
    kind: 'currency',
    name: 'initial',
    param: 'initial',
    min: 0,
    max: 1e12,
    step: 100,
  },
  {
    kind: 'currency',
    name: 'monthly',
    param: 'monthly',
    min: 0,
    max: 1e9,
    step: 50,
  },
  {
    kind: 'percent',
    name: 'ratePercent',
    param: 'rate',
    min: -50,
    max: 50,
    step: 0.1,
  },
  {
    kind: 'number',
    name: 'years',
    param: 'years',
    min: 1,
    max: MAX_YEARS,
    step: 1,
    unitKey: 'units.years',
  },
  {
    kind: 'select',
    name: 'compounding',
    param: 'freq',
    options: COMPOUNDING_OPTIONS,
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
    initial: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(1e12, { message: t('errors.tooLarge') }),
    monthly: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(1e9, { message: t('errors.tooLarge') }),
    ratePercent: z
      .number({ message: t('errors.number') })
      .gt(-100, { message: t('errors.rateRange') })
      .max(1000, { message: t('errors.rateRange') }),
    years: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.yearsRange', { max: MAX_YEARS }) })
      .max(MAX_YEARS, { message: t('errors.yearsRange', { max: MAX_YEARS }) }),
    compounding: z.enum(COMPOUNDING_OPTIONS),
    inflationPercent: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(100, { message: t('errors.rateRange') }),
  }) satisfies z.ZodType<CompoundInput>;

export const compoundInterest: CalculatorDefinition<
  CompoundInput,
  CompoundResult
> = {
  slug: 'compound-interest',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeCompound(input),

  toResultSpec: (result) => ({
    primary: {
      labelKey: 'finalBalance',
      value: result.finalBalance,
      format: 'moneyWhole',
      projected: true,
    },
    secondary: [
      {
        labelKey: 'totalContributions',
        value: result.totalContributions,
        format: 'moneyWhole',
      },
      {
        labelKey: 'totalInterest',
        value: result.totalInterest,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'inflationAdjusted',
        value: result.inflationAdjustedBalance,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'effectiveGain',
        value: result.effectiveGainPercent,
        format: 'percentChange',
        projected: true,
      },
    ],
    table: {
      columnKeys: ['year', 'contributed', 'growth', 'balance', 'realBalance'],
      rows: result.schedule.map((row) => [
        { labelKey: 'year', value: row.year, format: 'plain' as const },
        {
          labelKey: 'contributed',
          value: row.contributed,
          format: 'moneyWhole' as const,
        },
        {
          labelKey: 'growth',
          value: row.growth,
          format: 'moneyWhole' as const,
        },
        {
          labelKey: 'balance',
          value: row.balance,
          format: 'moneyWhole' as const,
        },
        {
          labelKey: 'realBalance',
          value: row.realBalance,
          format: 'moneyWhole' as const,
        },
      ]),
      previewRows: 5,
    },
  }),

  toChartSpec: (result) => ({
    kind: 'stackedArea',
    xLabelKey: 'chart.xAxis',
    x: result.schedule.map((row) => row.year),
    series: [
      {
        idKey: 'chart.contributions',
        values: result.schedule.map((row) => row.contributed),
      },
      {
        idKey: 'chart.growth',
        values: result.schedule.map((row) => row.growth),
      },
    ],
  }),

  marketData: { kind: 'none' },

  category: 'investing',
  messageKey: 'compoundInterest',
  disclaimer: 'investment',
  newsPhrases: [
    'interes i përbërë',
    'kursim',
    'investim afatgjatë',
    'norma e interesit',
    'depozitë',
    'compound interest',
    'savings',
    'interest rate',
    'deposit',
    'long-term investment',
  ],
  relatedSlugs: ['dollar-cost-averaging', 'retirement', 'inflation-adjustment'],
  faqCount: 4,
  embeddableIn: ['macro', 'economy', 'stocks'],
  order: 1,
};
