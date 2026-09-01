import type { Locale } from '@/i18n/config';
import {
  pickLocalized,
  type GlossaryTerm,
  type Localized,
} from '../learnTypes';
import { BASICS_LESSONS } from './basics';
import { ENGLISH_ALIASES } from './englishAliases';
import { MARKETS_ECONOMY_LESSONS } from './markets-economy';
import { RISK_COSTS_LESSONS } from './risk-and-costs';
import { STOCKS_ETFS_LESSONS } from './stocks-etfs';

const ALL = [
  ...BASICS_LESSONS,
  ...STOCKS_ETFS_LESSONS,
  ...MARKETS_ECONOMY_LESSONS,
  ...RISK_COSTS_LESSONS,
];

const collect = (locale: Locale): GlossaryTerm[] => {
  const bySlug = new Map<string, GlossaryTerm>();

  for (const lesson of ALL) {
    const terms = lesson.keyTerms ? pickLocalized(lesson.keyTerms, locale) : [];
    for (const term of terms) {
      if (bySlug.has(term.slug)) continue;

      const aliases = [
        ...(term.aliases ?? []),
        ...(locale === 'sq' ? (ENGLISH_ALIASES[term.slug] ?? []) : []),
      ];

      bySlug.set(term.slug, {
        ...term,
        ...(aliases.length > 0 ? { aliases } : {}),
        lessonSlug: pickLocalized(lesson.slug, locale),
      });
    }
  }

  return [...bySlug.values()].sort((a, b) =>
    a.term.localeCompare(b.term, locale),
  );
};

export const GLOSSARY: Localized<GlossaryTerm[]> = {
  sq: collect('sq'),
  en: collect('en'),
};
