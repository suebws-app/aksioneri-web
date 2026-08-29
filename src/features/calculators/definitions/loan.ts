import { z } from 'zod';
import {
  computeAmortization,
  type AmortizationInput,
  type AmortizationResult,
} from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const FREQUENCIES = ['monthly', 'quarterly', 'annually'] as const;

const defaults: AmortizationInput = {
  principal: 15_000,
  ratePercent: 8.5,
  years: 5,
  frequency: 'monthly',
  fees: 150,
};

const fields: readonly FieldSpec<AmortizationInput>[] = [
  {
    kind: 'currency',
    name: 'principal',
    param: 'amount',
    min: 1,
    max: 1e10,
    step: 500,
  },
  {
    kind: 'percent',
    name: 'ratePercent',
    param: 'rate',
    min: 0,
    max: 100,
    step: 0.1,
  },
  {
    kind: 'number',
    name: 'years',
    param: 'years',
    min: 1,
    max: 50,
    step: 1,
    unitKey: 'units.years',
  },
  {
    kind: 'currency',
    name: 'fees',
    param: 'fees',
    min: 0,
    max: 1e8,
    step: 50,
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
    principal: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.notNegative') }),
    ratePercent: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(100, { message: t('errors.rateRange') }),
    years: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.yearsRange', { max: 50 }) })
      .max(50, { message: t('errors.yearsRange', { max: 50 }) }),
    frequency: z.enum(FREQUENCIES),
    fees: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
  }) satisfies z.ZodType<AmortizationInput>;

export const loan: CalculatorDefinition<AmortizationInput, AmortizationResult> =
  {
    slug: 'loan-amortization',
    schema,
    defaults,
    fields,
    urlCodec: createUrlCodec(fields),
    compute: (input) => computeAmortization(input),

    toResultSpec: (result) => ({
      primary: { labelKey: 'payment', value: result.payment, format: 'money' },
      secondary: [
        {
          labelKey: 'totalInterest',
          value: result.totalInterest,
          format: 'moneyWhole',
        },
        {
          labelKey: 'totalFees',
          value: result.totalFees,
          format: 'moneyWhole',
        },
        {
          labelKey: 'totalRepaid',
          value: result.totalRepaid,
          format: 'moneyWhole',
        },
        {
          labelKey: 'costOfBorrowing',
          value: result.costOfBorrowingPercent,
          format: 'percent',
        },
      ],
      table: {
        columnKeys: ['period', 'payment', 'interest', 'principal', 'balance'],
        rows: result.schedule.map((row) => [
          { labelKey: 'period', value: row.period, format: 'plain' as const },
          { labelKey: 'payment', value: row.payment, format: 'money' as const },
          {
            labelKey: 'interest',
            value: row.interest,
            format: 'money' as const,
          },
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
    messageKey: 'loan',
    disclaimer: 'loan',
    newsPhrases: [
      'kredi',
      'norma e interesit',
      'këst',
      'hua',
      'bankë',
      'loan',
      'borrowing',
      'interest rate',
      'instalment',
      'consumer credit',
      'apr',
    ],
    relatedSlugs: ['mortgage', 'compound-interest'],
    faqCount: 3,
    embeddableIn: ['macro', 'europe', 'economy'],
    order: 5,
  };
