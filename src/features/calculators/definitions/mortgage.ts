import { z } from 'zod';
import {
  computeMortgage,
  type MortgageInput,
  type MortgageResult,
} from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const FREQUENCIES = ['monthly', 'quarterly', 'annually'] as const;

const defaults: MortgageInput = {
  propertyPrice: 150_000,
  downPayment: 30_000,
  principal: 0, // derived from price − deposit
  ratePercent: 4.5,
  years: 25,
  frequency: 'monthly',
  fees: 0,
  propertyTax: 300,
  insurance: 200,
  otherMonthly: 0,
};

const fields: readonly FieldSpec<MortgageInput>[] = [
  {
    kind: 'currency',
    name: 'propertyPrice',
    param: 'price',
    min: 1,
    max: 1e10,
    step: 5_000,
  },
  {
    kind: 'currency',
    name: 'downPayment',
    param: 'down',
    min: 0,
    max: 1e10,
    step: 1_000,
  },
  {
    kind: 'percent',
    name: 'ratePercent',
    param: 'rate',
    min: 0,
    max: 30,
    step: 0.05,
  },
  {
    kind: 'number',
    name: 'years',
    param: 'years',
    min: 1,
    max: 40,
    step: 1,
    unitKey: 'units.years',
  },
  {
    kind: 'currency',
    name: 'propertyTax',
    param: 'tax',
    min: 0,
    max: 1e7,
    step: 50,
    advanced: true,
  },
  {
    kind: 'currency',
    name: 'insurance',
    param: 'insurance',
    min: 0,
    max: 1e7,
    step: 50,
    advanced: true,
  },
  {
    kind: 'currency',
    name: 'otherMonthly',
    param: 'other',
    min: 0,
    max: 1e7,
    step: 25,
    advanced: true,
  },
  {
    kind: 'currency',
    name: 'fees',
    param: 'fees',
    min: 0,
    max: 1e8,
    step: 100,
    advanced: true,
  },
  {
    kind: 'select',
    name: 'frequency',
    param: 'freq',
    options: FREQUENCIES,
    advanced: true,
  },
];

const schema = (t: Translate) =>
  z.object({
    propertyPrice: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.notNegative') }),
    downPayment: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    principal: z.number({ message: t('errors.number') }),
    ratePercent: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(30, { message: t('errors.rateRange') }),
    years: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.yearsRange', { max: 40 }) })
      .max(40, { message: t('errors.yearsRange', { max: 40 }) }),
    frequency: z.enum(FREQUENCIES),
    fees: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    propertyTax: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    insurance: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    otherMonthly: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
  }) satisfies z.ZodType<MortgageInput>;

export const mortgage: CalculatorDefinition<MortgageInput, MortgageResult> = {
  slug: 'mortgage',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeMortgage(input),

  toResultSpec: (result) => ({
    // The household figure leads, not the bank's. The gap between the two is
    // where budgets break, so the larger and truer number is the headline.
    primary: {
      labelKey: 'monthlyTotal',
      value: result.monthlyTotal,
      format: 'money',
    },
    secondary: [
      {
        labelKey: 'principalInterest',
        value: result.monthlyPrincipalInterest,
        format: 'money',
      },
      {
        labelKey: 'loanAmount',
        value: result.loanAmount,
        format: 'moneyWhole',
      },
      {
        labelKey: 'totalInterest',
        value: result.totalInterest,
        format: 'moneyWhole',
      },
      {
        labelKey: 'totalRepaid',
        value: result.totalRepaid,
        format: 'moneyWhole',
      },
      {
        labelKey: 'loanToValue',
        value: result.loanToValuePercent,
        format: 'percent',
      },
    ],
    table: {
      columnKeys: ['period', 'payment', 'interest', 'principal', 'balance'],
      rows: result.schedule.map((row) => [
        { labelKey: 'period', value: row.period, format: 'plain' as const },
        { labelKey: 'payment', value: row.payment, format: 'money' as const },
        { labelKey: 'interest', value: row.interest, format: 'money' as const },
        {
          labelKey: 'principal',
          value: row.principal,
          format: 'money' as const,
        },
        {
          labelKey: 'balance',
          value: row.balance,
          format: 'moneyWhole' as const,
        },
      ]),
      previewRows: 6,
    },
  }),

  toChartSpec: (result) => ({
    kind: 'stackedArea',
    xLabelKey: 'chart.xAxis',
    x: result.schedule.map((row) => row.period),
    series: [
      {
        idKey: 'chart.principal',
        values: result.schedule.map((r) => r.principal),
      },
      {
        idKey: 'chart.interest',
        values: result.schedule.map((r) => r.interest),
      },
    ],
  }),

  marketData: { kind: 'none' },
  category: 'borrowing',
  messageKey: 'mortgage',
  disclaimer: 'loan',
  // Albanian **and** English. The wire arrives in English and is only
  // translated when the OpenAI-backed worker is enabled, so an
  // Albanian-only vocabulary matches nothing on an untranslated story —
  // the exact failure `features/learn/matchNews.ts` documents, where
  // matching a lesson's Albanian terms against the wire "found nothing
  // at all".
  newsPhrases: [
    'hipotekë',
    'kredi banesore',
    'norma e interesit',
    'BQE',
    'banesa',
    'euribor',
    'mortgage',
    'home loan',
    'housing loan',
    'interest rate',
    'euribor',
    'property price',
  ],
  relatedSlugs: ['loan-amortization', 'inflation-adjustment'],
  faqCount: 4,
  embeddableIn: ['macro', 'europe', 'economy'],
  order: 3,
};
