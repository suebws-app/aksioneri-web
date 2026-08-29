import { z } from 'zod';
import {
  computeRetirement,
  type RetirementInput,
  type RetirementResult,
} from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const defaults: RetirementInput = {
  currentAge: 35,
  retirementAge: 65,
  currentSavings: 10_000,
  monthlyContribution: 250,
  returnPercent: 6,
  inflationPercent: 2,
  desiredMonthlyIncome: 800,
  retirementYears: 20,
  existingPensionMonthly: 200,
};

const fields: readonly FieldSpec<RetirementInput>[] = [
  {
    kind: 'number',
    name: 'currentAge',
    param: 'age',
    min: 16,
    max: 90,
    step: 1,
  },
  {
    kind: 'number',
    name: 'retirementAge',
    param: 'retireat',
    min: 40,
    max: 100,
    step: 1,
  },
  {
    kind: 'currency',
    name: 'monthlyContribution',
    param: 'monthly',
    min: 0,
    max: 1e7,
    step: 50,
  },
  {
    kind: 'currency',
    name: 'desiredMonthlyIncome',
    param: 'income',
    min: 0,
    max: 1e7,
    step: 100,
  },
  {
    kind: 'currency',
    name: 'currentSavings',
    param: 'savings',
    min: 0,
    max: 1e10,
    step: 1_000,
    advanced: true,
  },
  {
    kind: 'percent',
    name: 'returnPercent',
    param: 'rate',
    min: -20,
    max: 30,
    step: 0.1,
    advanced: true,
  },
  {
    kind: 'percent',
    name: 'inflationPercent',
    param: 'inflation',
    min: 0,
    max: 50,
    step: 0.1,
    advanced: true,
  },
  {
    kind: 'number',
    name: 'retirementYears',
    param: 'duration',
    min: 1,
    max: 60,
    step: 1,
    unitKey: 'units.years',
    advanced: true,
  },
  {
    kind: 'currency',
    name: 'existingPensionMonthly',
    param: 'pension',
    min: 0,
    max: 1e7,
    step: 50,
    advanced: true,
  },
];

const schema = (t: Translate) =>
  z
    .object({
      currentAge: z
        .number({ message: t('errors.number') })
        .min(16, { message: t('errors.ageRange') })
        .max(90, { message: t('errors.ageRange') }),
      retirementAge: z
        .number({ message: t('errors.number') })
        .min(40, { message: t('errors.ageRange') })
        .max(100, { message: t('errors.ageRange') }),
      currentSavings: z
        .number({ message: t('errors.number') })
        .min(0, { message: t('errors.notNegative') }),
      monthlyContribution: z
        .number({ message: t('errors.number') })
        .min(0, { message: t('errors.notNegative') }),
      returnPercent: z
        .number({ message: t('errors.number') })
        .gt(-100, { message: t('errors.rateRange') })
        .max(30, { message: t('errors.rateRange') }),
      inflationPercent: z
        .number({ message: t('errors.number') })
        .min(0, { message: t('errors.notNegative') })
        .max(50, { message: t('errors.rateRange') }),
      desiredMonthlyIncome: z
        .number({ message: t('errors.number') })
        .min(0, { message: t('errors.notNegative') }),
      retirementYears: z
        .number({ message: t('errors.number') })
        .gt(0, { message: t('errors.yearsRange', { max: 60 }) })
        .max(60, { message: t('errors.yearsRange', { max: 60 }) }),
      existingPensionMonthly: z
        .number({ message: t('errors.number') })
        .min(0, { message: t('errors.notNegative') }),
    })
    .refine((v) => v.retirementAge > v.currentAge, {
      message: t('errors.retireAfterNow'),
      path: ['retirementAge'],
    }) satisfies z.ZodType<RetirementInput>;

export const retirement: CalculatorDefinition<
  RetirementInput,
  RetirementResult
> = {
  slug: 'retirement',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeRetirement(input),

  toResultSpec: (result) => ({
    primary: {
      labelKey: 'gap',
      value: result.gap,
      format: 'moneyWhole',
      projected: true,
    },
    secondary: [
      {
        labelKey: 'projectedPot',
        value: result.projectedPot,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'realPot',
        value: result.realPot,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'requiredPot',
        value: result.requiredPot,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'sustainableIncome',
        value: result.sustainableMonthlyIncome,
        format: 'money',
        projected: true,
      },
      {
        labelKey: 'requiredContribution',
        value: result.requiredMonthlyContribution,
        format: 'money',
        projected: true,
      },
      {
        labelKey: 'yearsToRetirement',
        value: result.yearsToRetirement,
        format: 'plain',
      },
    ],
    table: {
      columnKeys: ['rate', 'projectedPot', 'realPot', 'sustainableIncome'],
      rows: result.scenarios.map((scenario) => [
        {
          labelKey: 'rate',
          value: scenario.ratePercent,
          format: 'percent' as const,
        },
        {
          labelKey: 'projectedPot',
          value: scenario.projectedPot,
          format: 'moneyWhole' as const,
        },
        {
          labelKey: 'realPot',
          value: scenario.realPot,
          format: 'moneyWhole' as const,
        },
        {
          labelKey: 'sustainableIncome',
          value: scenario.sustainableMonthlyIncome,
          format: 'money' as const,
        },
      ]),
      previewRows: 3,
    },
  }),

  toChartSpec: (result) => ({
    kind: 'line',
    xLabelKey: 'chart.xAxis',
    x: result.schedule.map((row) => row.age),
    series: [
      {
        idKey: 'chart.balance',
        values: result.schedule.map((r) => r.balance),
        emphasis: true,
      },
    ],
  }),

  marketData: { kind: 'none' },
  category: 'retirement',
  messageKey: 'retirement',
  disclaimer: 'investment',
  newsPhrases: [
    'pension',
    'dalje në pension',
    'kursim pensional',
    'trusti pensional',
    'pension',
    'retirement',
    'pension fund',
    'retirement savings',
  ],
  relatedSlugs: [
    'compound-interest',
    'dollar-cost-averaging',
    'inflation-adjustment',
  ],
  faqCount: 4,
  embeddableIn: ['macro', 'economy'],
  order: 9,
};
