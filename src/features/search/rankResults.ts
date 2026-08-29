import type { SearchEntry } from './searchTypes';

export const MIN_QUERY_LENGTH = 2;

export const DEFAULT_LIMIT = 40;

const normalise = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const FUNCTION_WORDS = new Set([
  'i',
  'e',
  'te',
  'ne',
  'me',
  'nga',
  'dhe',
  'per',
  'qe',
  'nje',
  'se',
  'sa',
  'si',
  'ose',
  'apo',
  'mbi',
  'nen',
  'pa',
  'po',
  'ku',
  'kur',
]);

const MIN_STEM_LENGTH = 4;

const MAX_SUFFIX_LENGTH = 4;

const wordsOf = (value: string): string[] =>
  value.split(/[^a-z0-9&]+/).filter(Boolean);

type Relation = 'exact' | 'prefix' | 'stem' | null;

const relate = (word: string, token: string): Relation => {
  if (word === token) return 'exact';
  if (word.startsWith(token) && token.length >= 3) return 'prefix';
  if (
    token.startsWith(word) &&
    word.length >= MIN_STEM_LENGTH &&
    token.length - word.length <= MAX_SUFFIX_LENGTH
  )
    return 'stem';
  return null;
};

const bestRelation = (words: string[], token: string): Relation => {
  let best: Relation = null;
  for (const word of words) {
    const relation = relate(word, token);
    if (relation === 'exact') return 'exact';
    if (relation && !best) best = relation;
  }
  return best;
};

const SCORE = {
  titleWord: { exact: 70, prefix: 55, stem: 50 },
  titleLoose: 40,
  keywordWord: { exact: 30, prefix: 25, stem: 25 },
  keywordLoose: 20,
  subtitleWord: { exact: 12, prefix: 10, stem: 10 },
  subtitleLoose: 10,
  wholeTitle: 100,
  leading: 10,
} as const;

interface Fields {
  title: string;
  titleWords: string[];
  subtitle: string;
  subtitleWords: string[];
  keywords: string[];
  keywordWords: string[];
}

const scoreToken = (token: string, fields: Fields): number => {
  const inTitle = bestRelation(fields.titleWords, token);
  if (inTitle) {
    const leading =
      relate(fields.titleWords[0] ?? '', token) !== null ? SCORE.leading : 0;
    return SCORE.titleWord[inTitle] + leading;
  }
  if (fields.title.includes(token)) return SCORE.titleLoose;

  const inKeyword = bestRelation(fields.keywordWords, token);
  if (inKeyword) return SCORE.keywordWord[inKeyword];
  if (fields.keywords.some((keyword) => keyword.includes(token)))
    return SCORE.keywordLoose;

  const inSubtitle = bestRelation(fields.subtitleWords, token);
  if (inSubtitle) return SCORE.subtitleWord[inSubtitle];
  if (fields.subtitle.includes(token)) return SCORE.subtitleLoose;

  return 0;
};

const fieldsOf = (entry: SearchEntry): Fields => {
  const title = normalise(entry.title);
  const subtitle = normalise(entry.subtitle ?? '');
  const keywords = (entry.keywords ?? []).map(normalise);

  return {
    title,
    titleWords: wordsOf(title),
    subtitle,
    subtitleWords: wordsOf(subtitle),
    keywords,
    keywordWords: keywords.flatMap(wordsOf),
  };
};

export const rankResults = (
  entries: SearchEntry[],
  query: string,
  { limit = DEFAULT_LIMIT }: { limit?: number } = {},
): SearchEntry[] => {
  const tokens = normalise(query.trim()).split(/\s+/).filter(Boolean);
  const needle = tokens.join(' ');
  if (needle.length < MIN_QUERY_LENGTH) return [];

  const content = tokens.filter(
    (token) => token.length > 2 && !FUNCTION_WORDS.has(token),
  );
  const required = content.length > 0 ? content : tokens;

  const prepared = entries.map((entry, order) => ({
    entry,
    order,
    fields: fieldsOf(entry),
  }));

  const collect = (needAll: boolean) => {
    const scored: { entry: SearchEntry; score: number; order: number }[] = [];

    for (const { entry, order, fields } of prepared) {
      let score = 0;
      let matchedRequired = 0;

      for (const token of tokens) {
        const tokenScore = scoreToken(token, fields);
        if (tokenScore > 0 && required.includes(token)) matchedRequired += 1;
        score += tokenScore;
      }

      const enough = needAll
        ? matchedRequired === required.length
        : matchedRequired > 0;
      if (!enough) continue;

      if (fields.title === needle) score += SCORE.wholeTitle;
      else if (tokens.length > 1 && fields.title.includes(needle))
        score += SCORE.titleLoose;

      scored.push({ entry, score, order });
    }

    return scored
      .sort((a, b) => b.score - a.score || a.order - b.order)
      .slice(0, limit)
      .map((result) => result.entry);
  };

  const strict = collect(true);
  if (strict.length > 0 || required.length < 2) return strict;
  return collect(false);
};
