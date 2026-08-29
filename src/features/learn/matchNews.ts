import type { NewsArticle } from '@/lib/api/news';
import { countMentions, mentions } from '@/lib/text/mentions';
import type { GlossaryTerm, Lesson } from './learnTypes';

const MIN_SCORE = 1;

const phrasesFor = (term: GlossaryTerm): string[] => [
  term.term,
  ...(term.aliases ?? []),
];

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

    if (score >= MIN_SCORE && (!best || score > best.score)) {
      best = { article, score };
    }
  }

  return best?.article ?? null;
}

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

    const hits = phrasesFor(term).reduce(
      (total, phrase) => total + countMentions(haystack, phrase),
      0,
    );
    if (hits === 0) continue;

    counts.set(term.lessonSlug, (counts.get(term.lessonSlug) ?? 0) + hits);
  }

  if (counts.size === 0) return null;

  const [bestSlug] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];
  return lessons.find((lesson) => lesson.slug === bestSlug) ?? null;
}

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
