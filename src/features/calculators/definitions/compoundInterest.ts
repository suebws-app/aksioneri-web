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

/**
 * Defaults a reader can recognise themselves in.
 *
 * €10,000 opening, €500 a month, 7% and twenty years. The 7% is the long-run
 * nominal average of a broad developed-market equity index, not a house
 * forecast, and the page says so; 2% inflation is the ECB's target rather
 * than a prediction. Defaults on a calculator are read as advice whether or
 * not they are meant that way, so they should be defensible in print.
 */
const defaults: CompoundInput = {
  initial: 10_000,
  monthly: 500,
  ratePercent: 7,
  years: 20,
  compounding: 'monthly',
  inflationPercent: 2,
};

/**
 * The order fields appear in, and where the fold sits.
 *
 * The first three are the whole calculation for most readers. Compounding
 * frequency and inflation are real inputs with real effects, but a reader who
 * has never chosen a compounding frequency should not have to before seeing a
 * number — so they sit behind "advanced options" with sensible values already
 * applied, per the spec's progressive-disclosure requirement.
 *
 * `param` keeps the URL readable: `?initial=10000&monthly=500&rate=7&years=20`
 * is what the spec asks for and what survives being pasted into a sentence.
 */
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

/**
 * Client-side validation.
 *
 * Deliberately looser than the engine's guards: this catches what a reader
 * can fix by editing the field, and says so in Albanian. Everything else —
 * overflow, a rate that destroys more than exists — is the engine's refusal
 * to make, because those need to hold wherever `compute` is called from,
 * including places that never ran a zod schema.
 */
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
  // The context is unused: compound growth needs no market data, which is
  // also what `marketData: { kind: 'none' }` tells the page.
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

  /**
   * Contributions and growth, stacked.
   *
   * Stacked rather than two lines because the question the chart answers is
   * "how much of this did I put in?", and that is a question about
   * composition. The crossover — the year growth overtakes contributions — is
   * the single most legible thing about compounding, and a stack puts it
   * where a reader cannot miss it.
   */
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
  // Albanian **and** English. The wire arrives in English and is only
  // translated when the OpenAI-backed worker is enabled, so an
  // Albanian-only vocabulary matches nothing on an untranslated story —
  // the exact failure `features/learn/matchNews.ts` documents, where
  // matching a lesson's Albanian terms against the wire "found nothing
  // at all".
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
