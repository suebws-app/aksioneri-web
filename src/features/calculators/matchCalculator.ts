import { countMentions } from '@/lib/text/mentions';
import { getCalculators } from './registry';
import type { AnyCalculator, CalculatorSlug } from './types';

const MIN_SCORE = 3;

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

export function matchCalculatorForArticle(
  article: MatchableArticle,
  calculators: readonly AnyCalculator[] = getCalculators(),
): CalculatorSlug | null {
  let best: { slug: CalculatorSlug; score: number } | null = null;

  for (const calculator of calculators) {
    const score = scoreCalculator(article, calculator);
    if (score < MIN_SCORE) continue;

    if (!best || score > best.score) {
      best = { slug: calculator.slug, score };
    }
  }

  return best?.slug ?? null;
}
