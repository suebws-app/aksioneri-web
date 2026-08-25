import { describe, expect, it } from 'vitest';
import { MIN_QUERY_LENGTH, rankResults } from '../rankResults';
import type { SearchEntry } from '../searchTypes';

const entry = (
  title: string,
  overrides: Partial<SearchEntry> = {},
): SearchEntry => ({
  kind: 'lesson',
  title,
  href: `/learn/${title.toLowerCase().replace(/\s+/g, '-')}`,
  ...overrides,
});

const titles = (results: SearchEntry[]): string[] =>
  results.map((result) => result.title);

describe('rankResults', () => {
  it('returns nothing for a query shorter than the minimum', () => {
    const entries = [entry('Inflacioni në një faqe')];

    expect(rankResults(entries, 'i'.repeat(MIN_QUERY_LENGTH - 1))).toEqual([]);
    expect(rankResults(entries, '   ')).toEqual([]);
  });

  it('matches without diacritics, both ways', () => {
    const entries = [entry('Nga vjen çmimi')];

    expect(titles(rankResults(entries, 'cmimi'))).toEqual(['Nga vjen çmimi']);
    expect(titles(rankResults(entries, 'çmimi'))).toEqual(['Nga vjen çmimi']);
  });

  it('ranks an exact title above a prefix above a mention', () => {
    const entries = [
      entry('Si e prek inflacioni portofolin'),
      entry('Inflacioni në një faqe'),
      entry('Inflacioni'),
    ];

    expect(titles(rankResults(entries, 'inflacioni'))).toEqual([
      'Inflacioni',
      'Inflacioni në një faqe',
      'Si e prek inflacioni portofolin',
    ]);
  });

  it('ranks a title hit above a keyword hit above a subtitle-only hit', () => {
    const entries = [
      entry('Bazat', { subtitle: 'Kursi për obligacione' }),
      entry('Kurba e yield-eve', { keywords: ['obligacione'] }),
      entry('Obligacionet, të shpjeguara'),
    ];

    expect(titles(rankResults(entries, 'obligacione'))).toEqual([
      'Obligacionet, të shpjeguara',
      'Kurba e yield-eve',
      'Bazat',
    ]);
  });

  it('requires every word of the query to match somewhere', () => {
    const entries = [
      entry('Rreziku i monedhës', { keywords: ['dollar'] }),
      entry('Rreziku i likuiditetit'),
    ];

    expect(titles(rankResults(entries, 'rreziku dollar'))).toEqual([
      'Rreziku i monedhës',
    ]);
  });

  it('keeps the source order when scores tie', () => {
    const entries = [
      entry('Taksat mbi investimet'),
      entry('Taksat dhe kostot'),
    ];

    expect(titles(rankResults(entries, 'taksat'))).toEqual([
      'Taksat mbi investimet',
      'Taksat dhe kostot',
    ]);
  });

  it('caps the result count at the given limit', () => {
    const entries = Array.from({ length: 30 }, (_, index) =>
      entry(`Aksioni numër ${String(index)}`),
    );

    expect(rankResults(entries, 'aksioni', { limit: 5 })).toHaveLength(5);
  });

  it('never matches display-only context', () => {
    // A lesson's topic labels a dozen lessons; matching it buried the two
    // lessons actually about the thing searched for.
    const entries = [
      entry('Bilanci në një faqe', { context: 'Aksione dhe ETF' }),
      entry('Çfarë është një ETF?', { context: 'Bazat' }),
    ];

    expect(titles(rankResults(entries, 'etf'))).toEqual([
      'Çfarë është një ETF?',
    ]);
  });

  it('finds a word when the query carries an Albanian suffix', () => {
    // `includes` only ever matched a query shorter than the word, so the
    // definite and plural forms readers actually type missed the entry.
    const entries = [
      entry('Obligacion', { keywords: ['obligacione'] }),
      entry('Inflacioni në një faqe'),
      entry('Dividend'),
    ];

    expect(titles(rankResults(entries, 'obligacionet'))).toContain(
      'Obligacion',
    );
    expect(titles(rankResults(entries, 'inflacionit'))).toContain(
      'Inflacioni në një faqe',
    );
    expect(titles(rankResults(entries, 'dividendët'))).toContain('Dividend');
  });

  it('does not let a suffixed query match a short unrelated word', () => {
    const entries = [entry('Fond aktiv'), entry('Taksat mbi investimet')];

    expect(rankResults(entries, 'fondamentale')).toEqual([]);
  });

  it('ignores function words when deciding what must match', () => {
    const entries = [
      entry('Inflacioni si rrezik për kursimtarin', {
        subtitle: 'Kur inflacioni është i lartë',
      }),
      entry('Taksat mbi investimet'),
    ];

    expect(titles(rankResults(entries, 'inflacion i lartë'))).toEqual([
      'Inflacioni si rrezik për kursimtarin',
    ]);
  });

  it('falls back to partial matches rather than returning nothing', () => {
    // Two content words, no entry has both: better to offer the entry that
    // matched one than an empty dropdown.
    const entries = [entry('Inflacioni në një faqe'), entry('Fond aktiv')];

    expect(titles(rankResults(entries, 'inflacion kriptomonedha'))).toEqual([
      'Inflacioni në një faqe',
    ]);
  });

  it('ranks a title that opens with the word above one that mentions it late', () => {
    const entries = [
      entry('Si e prek inflacioni portofolin'),
      entry('Inflacioni në një faqe'),
    ];

    expect(titles(rankResults(entries, 'inflacioni'))).toEqual([
      'Inflacioni në një faqe',
      'Si e prek inflacioni portofolin',
    ]);
  });

  it('drops entries that match nothing', () => {
    const entries = [entry('Inflacioni në një faqe')];

    expect(rankResults(entries, 'kriptomonedha')).toEqual([]);
  });
});
