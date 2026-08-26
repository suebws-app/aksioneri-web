import { countMentions } from '@/lib/text/mentions';
import { getCalculators } from './registry';
import type { AnyCalculator, CalculatorSlug } from './types';

/**
 * Picks the calculator an article should offer, or none.
 *
 * **Matched at render time rather than stored on the article.** That is a
 * decision `features/learn/matchNews.ts` already paid for: nine lessons
 * carried a stored `relatedArticleSlug` and every one was permanently dead,
 * because the wire regenerates its slugs hourly. Here the problem is worse —
 * articles arrive from RSS, get scraped and then rewritten by a translation
 * model. There is no editor to tag them, and a `[[calc:…]]` token would have
 * to survive an LLM rewrite intact.
 *
 * Scoring the vocabulary each time has none of that fragility. It costs a few
 * string scans per article render and cannot go stale.
 */

/**
 * Below this, a pairing is coincidence.
 *
 * Higher than `matchNews`'s threshold of 1, and deliberately so: a lesson
 * link is a suggestion, while a calculator embed interrupts the article with
 * a widget. One passing mention of "kredi" in a story about the labour market
 * should not produce a mortgage calculator mid-paragraph.
 */
const MIN_SCORE = 3;

/** A headline term is what the story is about; paragraph nine is a mention. */
const TITLE_WEIGHT = 3;
const SUMMARY_WEIGHT = 2;
const BODY_WEIGHT = 1;

export interface MatchableArticle {
  title: string;
  summary: string;
  body?: string[] | null;
  category: string;
}

function scoreCalculator(
  article: MatchableArticle,
  calculator: AnyCalculator,
): number {
  // A calculator only offers itself on desks it makes sense for. Without this
  // a crypto story mentioning "norma e interesit" would surface a mortgage
  // calculator.
  if (!calculator.embeddableIn.includes(article.category)) return 0;

  const body = (article.body ?? []).join(' ');

  let score = 0;

  for (const phrase of calculator.newsPhrases) {
    score += countMentions(article.title, phrase) * TITLE_WEIGHT;
    score += countMentions(article.summary, phrase) * SUMMARY_WEIGHT;
    score += countMentions(body, phrase) * BODY_WEIGHT;
  }

  return score;
}

/**
 * The best calculator for an article, or `null`.
 *
 * Returns at most one. Two widgets inside one article is clutter, and the
 * second is always the weaker match.
 */
export function matchCalculatorForArticle(
  article: MatchableArticle,
  calculators: readonly AnyCalculator[] = getCalculators(),
): CalculatorSlug | null {
  let best: { slug: CalculatorSlug; score: number } | null = null;

  for (const calculator of calculators) {
    const score = scoreCalculator(article, calculator);
    if (score < MIN_SCORE) continue;

    // Ties break on the registry's editorial order, which `getCalculators`
    // already applied — so a tie keeps the more prominent calculator rather
    // than whichever happened to be iterated last.
    if (!best || score > best.score) {
      best = { slug: calculator.slug, score };
    }
  }

  return best?.slug ?? null;
}
