import type { GlossaryTerm, Localized } from '../learnTypes';
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

const collect = (): GlossaryTerm[] => {
  const bySlug = new Map<string, GlossaryTerm>();

  for (const lesson of ALL) {
    for (const term of lesson.keyTerms?.sq ?? []) {
      if (bySlug.has(term.slug)) continue;

      const aliases = [
        ...(term.aliases ?? []),
        ...(ENGLISH_ALIASES[term.slug] ?? []),
      ];

      bySlug.set(term.slug, {
        ...term,
        ...(aliases.length > 0 ? { aliases } : {}),
        lessonSlug: lesson.slug.sq,
      });
    }
  }

  return [...bySlug.values()].sort((a, b) =>
    a.term.localeCompare(b.term, 'sq'),
  );
};

export const GLOSSARY: Localized<GlossaryTerm[]> = { sq: collect() };
