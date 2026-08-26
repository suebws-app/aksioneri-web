/**
 * Whole-word phrase matching, diacritic- and case-insensitive.
 *
 * Extracted from `features/learn/matchNews.ts`, which needed it to pair
 * lessons with wire stories and now shares it with the calculator matcher.
 * One copy, because the two must agree: if "inflacion" counts as a mention in
 * one place and not the other, an article gets a lesson but no calculator for
 * reasons nobody can explain.
 *
 * Albanian makes the normalisation load-bearing rather than cosmetic. "Çmimi"
 * and "cmimi" are the same word to a reader typing quickly, and wire copy is
 * inconsistent about ë and ç. Stripping diacritics before comparing means a
 * story spelled either way matches.
 */

/** Lower-cased and stripped of combining marks: `Çmimi` → `cmimi`. */
export const normalise = (value: string): string =>
  value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const isWordChar = (char: string | undefined): boolean =>
  char !== undefined && /[\p{L}\p{N}]/u.test(char);

/**
 * How many times a phrase appears as a whole word.
 *
 * Whole-word, so "euro" does not match "Europa" — which would otherwise fire
 * the currency converter on every story about the European Commission.
 *
 * Phrases under three characters are ignored outright: they match too much to
 * carry any signal.
 */
export const countMentions = (haystack: string, phrase: string): number => {
  const text = normalise(haystack);
  const needle = normalise(phrase);
  if (needle.length < 3) return 0;

  let count = 0;
  let from = 0;

  for (;;) {
    const index = text.indexOf(needle, from);
    if (index === -1) return count;

    if (
      !isWordChar(text[index - 1]) &&
      !isWordChar(text[index + needle.length])
    ) {
      count += 1;
    }
    from = index + needle.length;
  }
};

/** Whole-word, diacritic- and case-insensitive containment. */
export const mentions = (haystack: string, phrase: string): boolean =>
  countMentions(haystack, phrase) > 0;
