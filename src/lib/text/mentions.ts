export const normalise = (value: string): string =>
  value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const isWordChar = (char: string | undefined): boolean =>
  char !== undefined && /[\p{L}\p{N}]/u.test(char);

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

export const mentions = (haystack: string, phrase: string): boolean =>
  countMentions(haystack, phrase) > 0;
