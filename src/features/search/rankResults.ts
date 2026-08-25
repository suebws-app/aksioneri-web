import type { SearchEntry } from './searchTypes';

/**
 * Below this, a query matches too much to be worth showing. Two characters is
 * the same floor `LessonSearch` uses.
 */
export const MIN_QUERY_LENGTH = 2;

/** Results a page shows before the reader is better served by narrowing. */
export const DEFAULT_LIMIT = 40;

/**
 * Diacritic-insensitive, in both directions: a reader typing `cmimi` on a
 * phone keyboard finds `çmimi`, and typing `çmimi` still finds it.
 */
const normalise = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Albanian grammar words. They carry no search intent, and requiring them
 * turned ordinary phrases into dead ends — "inflacion i lartë" returned
 * nothing because every entry had to contain "i".
 */
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

/** Shortest word a suffixed query is allowed to have been built from. */
const MIN_STEM_LENGTH = 4;

/**
 * Longest ending a query may add to a word and still count as the same word.
 *
 * Albanian's definite, plural and case endings are short — `-i`, `-it`, `-et`,
 * `-ve`, `-ëve`, `-eve`. Four characters covers them and nothing else: without
 * the cap, `fondamentale` matched `fond`.
 */
const MAX_SUFFIX_LENGTH = 4;

/** `&` survives so `s&p` stays one word; everything else splits. */
const wordsOf = (value: string): string[] =>
  value.split(/[^a-z0-9&]+/).filter(Boolean);

type Relation = 'exact' | 'prefix' | 'stem' | null;

/**
 * How a query word relates to a word in the text.
 *
 * `stem` is the case Albanian needs: readers type the definite or plural form
 * (`obligacionet`, `inflacionit`, `dividendët`) of a word the site stores bare
 * (`Obligacion`, `Inflacioni`, `Dividend`). A plain `includes` only ever
 * matched the opposite direction, so those queries came back nearly empty.
 *
 * The two limits are what stop it degenerating: the word must be long enough
 * to be a real stem, and the query may only add a short ending to it.
 */
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

/**
 * What a hit is worth, by field and by how closely the words line up.
 *
 * The gaps are wide on purpose. A title hit must outrank any number of
 * subtitle hits, or a lesson that merely mentions "obligacione" in its summary
 * outranks the lesson actually called "Obligacionet, të shpjeguara".
 */
const SCORE = {
  titleWord: { exact: 70, prefix: 55, stem: 50 },
  titleLoose: 40,
  keywordWord: { exact: 30, prefix: 25, stem: 25 },
  keywordLoose: 20,
  subtitleWord: { exact: 12, prefix: 10, stem: 10 },
  subtitleLoose: 10,
  /** The whole query is the whole title. */
  wholeTitle: 100,
  /** The title opens with the word, rather than mentioning it in passing. */
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

/** The best a single query word can score against one entry. */
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

/**
 * Order a search index against a query.
 *
 * Pure, and the only place the ranking rules live: the page reads
 * `searchParams`, builds the index and hands both to this.
 *
 * Content words are ANDed — with a few hundred entries covering five
 * sections, an OR search returns most of the site for any two-word query.
 * Grammar words are excluded from that requirement, and if nothing satisfies
 * the AND the search falls back to the best partial matches rather than
 * showing the reader an empty box.
 *
 * Ties keep their index order, so the caller controls what wins between two
 * equally good matches by ordering the sections it concatenates.
 */
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
  // A query made only of grammar words still has to search for something.
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

      // The whole query landing on the title beats the same words scattered.
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
