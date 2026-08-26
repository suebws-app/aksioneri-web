import type { NewsArticle } from '@/lib/api/news';
import { countMentions, mentions } from '@/lib/text/mentions';
import type { GlossaryTerm, Lesson } from './learnTypes';

/**
 * Matching between lessons and live news, in both directions.
 *
 * Both links used to be stored slugs and both were permanently dead.
 *
 * Nine lessons carried a `relatedArticleSlug` such as
 * `nvidia-shares-rise-after-earnings`. Those strings existed nowhere but the
 * design mock — they were being looked up against an RSS wire that generates
 * its own slugs from real feed items, so every lookup returned null and the
 * "in today's news" card never rendered. The reverse field,
 * `relatedLessonSlug`, was declared on the article DTO and consumed by the
 * article page, but nothing ever set it: the wire is RSS and carries no such
 * thing.
 *
 * A stored slug cannot work when one side's slugs are regenerated hourly. So
 * both directions are matched instead, over the vocabulary the glossary
 * already defines.
 */

/** Below this many matched terms, a pairing is coincidence rather than a topic. */
const MIN_SCORE = 1;

/** Every phrase a term can appear as. */
const phrasesFor = (term: GlossaryTerm): string[] => [
  term.term,
  ...(term.aliases ?? []),
];

/**
 * The most relevant recent story for a lesson, or null.
 *
 * Scores each article by how many of the lesson's key terms it mentions, then
 * prefers the most recent among the best. Titles count double: a term in the
 * headline is what the story is about, a term in paragraph nine is a passing
 * mention.
 *
 * The glossary is passed in rather than reading `lesson.keyTerms` directly:
 * only the assembled glossary carries the English aliases, and the wire is
 * English. Matching the lesson's own Albanian terms against it found nothing
 * at all.
 */
export function findArticleForLesson(
  lesson: Lesson,
  articles: NewsArticle[],
  glossary: GlossaryTerm[],
): NewsArticle | null {
  const slugs = new Set((lesson.keyTerms ?? []).map((term) => term.slug));
  const terms = glossary.filter((term) => slugs.has(term.slug));
  if (terms.length === 0 || articles.length === 0) return null;

  let best: { article: NewsArticle; score: number } | null = null;

  for (const article of articles) {
    let score = 0;

    for (const term of terms) {
      const phrases = phrasesFor(term);
      if (phrases.some((phrase) => mentions(article.title, phrase))) score += 2;
      else if (phrases.some((phrase) => mentions(article.summary, phrase)))
        score += 1;
    }

    // Articles arrive newest-first, so a strict `>` keeps the most recent of
    // any tie rather than the last one seen.
    if (score >= MIN_SCORE && (!best || score > best.score)) {
      best = { article, score };
    }
  }

  return best?.article ?? null;
}

/**
 * The lesson that best explains an article, or null.
 *
 * Runs over the glossary rather than the lessons: a term knows which lesson
 * covers it, and the auto-linker has already established that this vocabulary
 * appears in the text.
 */
export function findLessonForArticle(
  article: NewsArticle,
  glossary: GlossaryTerm[],
  lessons: Lesson[],
): Lesson | null {
  const haystack = [
    article.title,
    article.summary,
    ...(article.body ?? []),
  ].join(' ');

  const counts = new Map<string, number>();

  for (const term of glossary) {
    if (!term.lessonSlug) continue;

    // Occurrences, not distinct terms: a story that says "dividend" five
    // times is about dividends; one that mentions it once in passing is not.
    // Counting terms instead made every lesson score 1 and the winner was
    // whichever happened to sit first in the glossary.
    const hits = phrasesFor(term).reduce(
      (total, phrase) => total + countMentions(haystack, phrase),
      0,
    );
    if (hits === 0) continue;

    counts.set(term.lessonSlug, (counts.get(term.lessonSlug) ?? 0) + hits);
  }

  if (counts.size === 0) return null;

  // The lesson whose vocabulary shows up most often is the one the reader
  // needs, not merely the first term that happened to match.
  const [bestSlug] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];
  return lessons.find((lesson) => lesson.slug === bestSlug) ?? null;
}

/**
 * Recent stories that mention any of the given phrases.
 *
 * Used by the calendar and market pages, which carried `articleSlugs` lists of
 * invented headline slugs — the same design-mock strings, resolved against the
 * same live wire, failing the same silent way. An instrument or an economic
 * release has a name; matching on the name works and keeps working.
 */
export function findArticlesMentioning(
  phrases: string[],
  articles: NewsArticle[],
  limit = 3,
): NewsArticle[] {
  if (phrases.length === 0) return [];

  const matched: NewsArticle[] = [];

  for (const article of articles) {
    const haystack = `${article.title} ${article.summary}`;
    if (phrases.some((phrase) => mentions(haystack, phrase))) {
      matched.push(article);
      if (matched.length === limit) break;
    }
  }

  return matched;
}
