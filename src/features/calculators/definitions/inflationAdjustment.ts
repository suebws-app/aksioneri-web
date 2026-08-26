import { z } from 'zod';
import { computeInflation, MAX_YEARS } from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

interface InflationInput {
  amount: number;
  ratePercent: number;
  years: number;
}

interface InflationResult {
  futureCost: number;
  purchasingPower: number;
  cumulativePercent: number;
  lostValue: number;
}

const defaults: InflationInput = { amount: 10_000, ratePercent: 3, years: 10 };

const fields: readonly FieldSpec<InflationInput>[] = [
  {
    kind: 'currency',
    name: 'amount',
    param: 'amount',
    min: 0,
    max: 1e12,
    step: 100,
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
    max: MAX_YEARS,
    step: 1,
    unitKey: 'units.years',
  },
];

const schema = (t: Translate) =>
  z.object({
    amount: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') }),
    ratePercent: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(100, { message: t('errors.rateRange') }),
    years: z
      .number({ message: t('errors.number') })
      .gt(0, { message: t('errors.yearsRange', { max: MAX_YEARS }) })
      .max(MAX_YEARS, { message: t('errors.yearsRange', { max: MAX_YEARS }) }),
  }) satisfies z.ZodType<InflationInput>;

/**
 * Rate-based for now. The index-based form — real HICP and Kosovo CPI series
 * from the rates module — replaces the rate field with a pair of years once
 * that data exists; until then the rate is presented as the reader's own
 * assumption, which the page states plainly rather than implying it is
 * measured data.
 */
export const inflationAdjustment: CalculatorDefinition<
  InflationInput,
  InflationResult
> = {
  slug: 'inflation-adjustment',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeInflation(input),

  toResultSpec: (result) => ({
    primary: {
      labelKey: 'purchasingPower',
      value: result.purchasingPower,
      format: 'moneyWhole',
      projected: true,
    },
    secondary: [
      {
        labelKey: 'futureCost',
        value: result.futureCost,
        format: 'moneyWhole',
        projected: true,
      },
      {
        labelKey: 'cumulative',
        value: result.cumulativePercent,
        format: 'percentChange',
        projected: true,
      },
      {
        labelKey: 'lostValue',
        value: result.lostValue,
        format: 'moneyWhole',
        projected: true,
      },
    ],
  }),

  marketData: { kind: 'none' },
  category: 'economy',
  messageKey: 'inflationAdjustment',
  disclaimer: 'general',
  // Albanian **and** English. The wire arrives in English and is only
  // translated when the OpenAI-backed worker is enabled, so an
  // Albanian-only vocabulary matches nothing on an untranslated story —
  // the exact failure `features/learn/matchNews.ts` documents, where
  // matching a lesson's Albanian terms against the wire "found nothing
  // at all".
  newsPhrases: [
    'inflacion',
    'çmimet',
    'fuqia blerëse',
    'IÇK',
    'kosto e jetesës',
    'inflation',
    'consumer prices',
    'purchasing power',
    'cost of living',
    'hicp',
    'cpi',
  ],
  relatedSlugs: ['compound-interest', 'retirement', 'percentage-return'],
  faqCount: 3,
  embeddableIn: ['economy', 'macro', 'europe'],
  order: 4,
};
