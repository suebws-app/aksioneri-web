import { z } from 'zod';
import { computeFx, type FxInput, type FxResult } from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

/**
 * The currencies the converter offers.
 *
 * Mirrors `CONVERTIBLE_CURRENCIES` in `src/lib/api/rates.ts`, which mirrors
 * the API's own list. Adding one means adding it in all three — and in the
 * ECB's `EXR` dataflow, or the sync stores nothing for it.
 */
const CURRENCIES = [
  'EUR',
  'USD',
  'GBP',
  'CHF',
  'JPY',
  'SEK',
  'NOK',
  'DKK',
  'PLN',
  'CZK',
  'HUF',
  'RON',
  'BGN',
  'TRY',
  'CAD',
  'AUD',
  'CNY',
] as const;

const defaults: FxInput = { amount: 1_000, from: 'EUR', to: 'USD' };

const fields: readonly FieldSpec<FxInput>[] = [
  {
    kind: 'currency',
    name: 'amount',
    param: 'amount',
    min: 0,
    max: 1e12,
    step: 100,
    // The affix follows the "Prej" select rather than the page currency.
    currencyFrom: 'from',
  },
  { kind: 'select', name: 'from', param: 'from', options: CURRENCIES },
  { kind: 'select', name: 'to', param: 'to', options: CURRENCIES },
];

const schema = (t: Translate) =>
  z.object({
    amount: z
      .number({ message: t('errors.number') })
      .min(0, { message: t('errors.notNegative') })
      .max(1e12, { message: t('errors.tooLarge') }),
    from: z.enum(CURRENCIES),
    to: z.enum(CURRENCIES),
  }) satisfies z.ZodType<FxInput>;

export const currencyConverter: CalculatorDefinition<FxInput, FxResult> = {
  slug: 'currency-converter',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  // The only calculator so far whose `compute` reads the context: the rates
  // arrive there, fetched by the page, and a missing table is a refusal.
  compute: (input, ctx) => computeFx(input, ctx),
  ownsCurrency: true,

  toResultSpec: (result, input) => ({
    // Each amount carries its own currency. Labelling a dollar result with a
    // euro sign because the page toggle says EUR would be the wrong number,
    // not a cosmetic slip.
    primary: {
      labelKey: 'converted',
      value: result.converted,
      format: 'money',
      currency: input.to,
    },
    secondary: [
      { labelKey: 'rate', value: result.unitRate, format: 'rate' },
      { labelKey: 'inverseRate', value: result.inverseRate, format: 'rate' },
      {
        labelKey: 'amount',
        value: input.amount,
        format: 'money',
        currency: input.from,
      },
    ],
  }),

  // Declared, so the page knows to fetch before it can compute — and so the
  // loading, error and empty states are not optional.
  marketData: { kind: 'fxRate', defaultBase: 'EUR', defaultQuote: 'USD' },

  category: 'currency',
  messageKey: 'currencyConverter',
  disclaimer: 'fx',
  // Albanian **and** English. The wire arrives in English and is only
  // translated when the OpenAI-backed worker is enabled, so an
  // Albanian-only vocabulary matches nothing on an untranslated story —
  // the exact failure `features/learn/matchNews.ts` documents, where
  // matching a lesson's Albanian terms against the wire "found nothing
  // at all".
  newsPhrases: [
    'kursi i këmbimit',
    'euro',
    'dollar',
    'valutë',
    'monedha',
    'exchange rate',
    'currency',
    'foreign exchange',
    'dollar',
    'sterling',
  ],
  relatedSlugs: ['inflation-adjustment', 'percentage-return'],
  faqCount: 3,
  embeddableIn: ['europe', 'macro', 'economy', 'markets'],
  order: 10,
};
