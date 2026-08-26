import { z } from 'zod';
import { computeChange, type SimpleChangeInput } from '../engine';
import type { CalculatorDefinition, FieldSpec, Translate } from '../types';
import { createUrlCodec } from '../urlCodec';

interface ChangeResult {
  changePercent: number;
  changePoints: number;
  multiple: number;
}

const defaults: SimpleChangeInput = { from: 100, to: 125 };

const fields: readonly FieldSpec<SimpleChangeInput>[] = [
  {
    kind: 'number',
    name: 'from',
    param: 'from',
    min: -1e12,
    max: 1e12,
    step: 1,
  },
  { kind: 'number', name: 'to', param: 'to', min: -1e12, max: 1e12, step: 1 },
];

const schema = (t: Translate) =>
  z.object({
    from: z.number({ message: t('errors.number') }),
    to: z.number({ message: t('errors.number') }),
  }) satisfies z.ZodType<SimpleChangeInput>;

/**
 * The smallest calculator in the suite, and the one that prevents the most
 * misreporting: percentage change and percentage points are different
 * quantities, and a rate moving 2% → 3% is both "one point" and "fifty
 * percent". Both are shown, labelled apart.
 */
export const percentageReturn: CalculatorDefinition<
  SimpleChangeInput,
  ChangeResult
> = {
  slug: 'percentage-return',
  schema,
  defaults,
  fields,
  urlCodec: createUrlCodec(fields),
  compute: (input) => computeChange(input),

  toResultSpec: (result) => ({
    primary: {
      labelKey: 'changePercent',
      value: result.changePercent,
      format: 'percentChange',
    },
    secondary: [
      { labelKey: 'changePoints', value: result.changePoints, format: 'plain' },
      { labelKey: 'multiple', value: result.multiple, format: 'plain' },
    ],
  }),

  marketData: { kind: 'none' },
  category: 'markets',
  messageKey: 'percentageReturn',
  disclaimer: 'general',
  // Albanian **and** English. The wire arrives in English and is only
  // translated when the OpenAI-backed worker is enabled, so an
  // Albanian-only vocabulary matches nothing on an untranslated story —
  // the exact failure `features/learn/matchNews.ts` documents, where
  // matching a lesson's Albanian terms against the wire "found nothing
  // at all".
  newsPhrases: [
    'ndryshim në përqindje',
    'pikë përqindjeje',
    'rritje',
    'rënie',
    'percentage change',
    'percentage point',
    'basis points',
    'increase',
    'decline',
  ],
  relatedSlugs: ['cagr', 'inflation-adjustment'],
  faqCount: 3,
  embeddableIn: ['markets', 'stocks', 'economy', 'macro'],
  order: 8,
};
