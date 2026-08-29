import { z } from 'zod';
import { computeFx, type FxInput, type FxResult } from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

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
  compute: (input, ctx) => computeFx(input, ctx),
  ownsCurrency: true,

  toResultSpec: (result, input) => ({
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

  marketData: { kind: 'fxRate', defaultBase: 'EUR', defaultQuote: 'USD' },

  category: 'currency',
  messageKey: 'currencyConverter',
  disclaimer: 'fx',
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
