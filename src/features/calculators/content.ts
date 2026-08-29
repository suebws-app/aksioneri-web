import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import type { AnyCalculator } from './types';

export interface CalculatorFaqEntry {
  question: string;
  answer: string;
}

export interface CalculatorContent {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  cardBlurb: string;
  explanation: string[];
  example: string;
  faq: CalculatorFaqEntry[];
  disclaimer: string;
}

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
    disclaimer: shared(`disclaimers.${calculator.disclaimer}`),
  };
}
