import { z } from 'zod';
import { computeReturn, type ReturnInput, type ReturnResult } from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

const defaults: ReturnInput = {
  invested: 10_000,
  currentValue: 18_500,
  dividends: 900,
  fees: 120,
  purchaseDate: '2020-01-01',
  saleDate: '2026-01-01',
  inflationPercent: 2,
};

const fields: readonly FieldSpec<ReturnInput>[] = [
  {
    kind: 'currency',
    name: 'invested',
    param: 'invested',
    min: 0,
    max: 1e12,
    step: 100,
  },
  {
    kind: 'currency',
    name: 'currentValue',
    param: 'value',
    min: 0,
    max: 1e12,
    step: 100,
  },
  { kind: 'date', name: 'purchaseDate', param: 'from' },
  { kind: 'date', name: 'saleDate', param: 'to' },
  {
    kind: 'currency',
    name: 'dividends',
    param: 'dividends',
    min: 0,
    max: 1e10,
    step: 50,
    advanced: true,
  },
  {
    kind: 'currency',
    name: 'fees',
    param: 'fees',
    min: 0,
    max: 1e10,
    step: 10,
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
    invested: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    currentValue: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    dividends: z
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
  }) satisfies z.ZodType<ReturnInput>;

export const investmentReturn: CalculatorDefinition<ReturnInput, ReturnResult> =
  {
    slug: 'cagr',
    schema,
    defaults,
    fields,
    urlCodec: createUrlCodec(fields),
    compute: (input) => computeReturn(input),

    toResultSpec: (result) => ({
      primary: {
        labelKey: 'profit',
        value: result.profit,
        format: 'moneyWhole',
      },
      secondary: [
        {
          labelKey: 'returnPercent',
          value: result.returnPercent,
          format: 'percentChange',
        },
        {
          labelKey: 'cagr',
          value: result.cagrPercent,
          format: 'percentChange',
        },
        {
          labelKey: 'realCagr',
          value: result.realCagrPercent,
          format: 'percentChange',
        },
        {
          labelKey: 'totalDividends',
          value: result.totalDividends,
          format: 'moneyWhole',
        },
        {
          labelKey: 'totalFees',
          value: result.totalFees,
          format: 'moneyWhole',
        },
        { labelKey: 'years', value: result.years, format: 'plain' },
      ],
    }),

    marketData: { kind: 'none' },
    category: 'investing',
    messageKey: 'investmentReturn',
    disclaimer: 'investment',
    // Albanian **and** English. The wire arrives in English and is only
    // translated when the OpenAI-backed worker is enabled, so an
    // Albanian-only vocabulary matches nothing on an untranslated story —
    // the exact failure `features/learn/matchNews.ts` documents, where
    // matching a lesson's Albanian terms against the wire "found nothing
    // at all".
    newsPhrases: [
      'kthimi i investimit',
      'fitim kapital',
      'aksione',
      'portofol',
      'CAGR',
      'investment return',
      'capital gain',
      'total return',
      'portfolio',
      'annualised return',
    ],
    relatedSlugs: [
      'compound-interest',
      'dollar-cost-averaging',
      'percentage-return',
    ],
    faqCount: 3,
    embeddableIn: ['stocks', 'macro', 'economy'],
    order: 2,
  };
