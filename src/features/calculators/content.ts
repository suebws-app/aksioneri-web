import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import type { AnyCalculator } from './types';

/**
 * Every piece of copy a calculator page renders, fetched in one call.
 *
 * **This is the seam.** Pages never call `getTranslations` for calculator copy
 * themselves — they call this. Today it reads the message catalogue, which is
 * what the editorial decision was: copy lives in `messages/sq.json` where a
 * translator can edit it without opening a `.tsx` file, and structure lives in
 * the definitions where it is type-checked.
 *
 * If that ever needs to become a database — an editor changing an assumption
 * without a deploy, per-country FAQ variants — this function changes and
 * nothing else does. That is the entire reason it exists rather than each
 * component reaching for the translator itself.
 */

export interface CalculatorFaqEntry {
  question: string;
  answer: string;
}

export interface CalculatorContent {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  /** One-line summary for the landing-page card. */
  cardBlurb: string;
  /** "How this was calculated", as paragraphs. */
  explanation: string[];
  example: string;
  faq: CalculatorFaqEntry[];
  disclaimer: string;
}

/**
 * Reads an array out of the catalogue.
 *
 * next-intl's `t.raw` returns `unknown` for a non-string leaf, and the
 * catalogue is a checked-in file rather than user input — but a typo in a key
 * would otherwise surface as a crash mid-render, so it degrades to an empty
 * list and lets the meta-test be what catches the mistake.
 */
function readArray<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): T[] {
  return Array.isArray(value) ? value.filter(guard) : [];
}

const isString = (value: unknown): value is string => typeof value === 'string';

const isFaqEntry = (value: unknown): value is CalculatorFaqEntry =>
  typeof value === 'object' &&
  value !== null &&
  isString((value as CalculatorFaqEntry).question) &&
  isString((value as CalculatorFaqEntry).answer);

export async function getCalculatorContent(
  calculator: AnyCalculator,
  locale: Locale,
): Promise<CalculatorContent> {
  const t = await getTranslations({
    locale,
    namespace: `calculators.${calculator.messageKey}`,
  });
  const shared = await getTranslations({ locale, namespace: 'calculators' });

  return {
    metaTitle: t('metaTitle'),
    metaDescription: t('metaDescription'),
    heading: t('heading'),
    intro: t('intro'),
    cardBlurb: t('cardBlurb'),
    explanation: readArray(t.raw('explanation'), isString),
    example: t('example'),
    faq: readArray(t.raw('faq'), isFaqEntry),
    // The disclaimer is shared rather than per-calculator: a definition picks
    // a kind, so two investment calculators cannot drift into two different
    // warnings about the same risk.
    disclaimer: shared(`disclaimers.${calculator.disclaimer}`),
  };
}
