import type { GlossaryTerm, Localized } from '../learnTypes';
import { BASICS_LESSONS } from './basics';
import { ENGLISH_ALIASES } from './englishAliases';
import { MARKETS_ECONOMY_LESSONS } from './markets-economy';
import { RISK_COSTS_LESSONS } from './risk-and-costs';
import { STOCKS_ETFS_LESSONS } from './stocks-etfs';

// Imported from the topic files rather than the barrel: the barrel re-exports
// this module, and importing it back would be a cycle.
const ALL = [
  ...BASICS_LESSONS,
  ...STOCKS_ETFS_LESSONS,
  ...MARKETS_ECONOMY_LESSONS,
  ...RISK_COSTS_LESSONS,
];

/**
 * The glossary.
 *
 * Rather than a separate hand-maintained list — the old one had four entries
 * under a label claiming 120 — this is assembled from the key terms every
 * lesson already defines. A term therefore cannot exist in the glossary
 * without a lesson that explains it, and cannot be taught in a lesson without
 * appearing in the glossary.
 *
 * Where two lessons define the same slug, the first wins and the lesson that
 * defined it is recorded, so the glossary page and the article auto-linker can
 * both point at somewhere useful.
 */
const collect = (): GlossaryTerm[] => {
  const bySlug = new Map<string, GlossaryTerm>();

  for (const lesson of ALL) {
    for (const term of lesson.keyTerms?.sq ?? []) {
      if (bySlug.has(term.slug)) continue;

      // English spellings are merged in so the article auto-linker can match
      // the untranslated wire — see `englishAliases.ts`.
      const aliases = [
        ...(term.aliases ?? []),
        ...(ENGLISH_ALIASES[term.slug] ?? []),
      ];

      bySlug.set(term.slug, {
        ...term,
        ...(aliases.length > 0 ? { aliases } : {}),
        // Glossary is assembled per locale (currently only `sq`), so we
        // record that locale's slug — the lesson the reader will land on.
        lessonSlug: lesson.slug.sq,
      });
    }
  }

  return [...bySlug.values()].sort((a, b) =>
    a.term.localeCompare(b.term, 'sq'),
  );
};

export const GLOSSARY: Localized<GlossaryTerm[]> = { sq: collect() };
