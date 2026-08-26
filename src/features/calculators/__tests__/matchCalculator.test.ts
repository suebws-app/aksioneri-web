import { describe, expect, it } from 'vitest';
import {
  matchCalculatorForArticle,
  type MatchableArticle,
} from '../matchCalculator';
import { getCalculators } from '../registry';

const article = (
  overrides: Partial<MatchableArticle> = {},
): MatchableArticle => ({
  title: '',
  summary: '',
  body: [],
  category: 'macro',
  ...overrides,
});

const all = getCalculators();

describe('matchCalculatorForArticle', () => {
  it('offers a mortgage calculator on a rate-decision story', () => {
    const slug = matchCalculatorForArticle(
      article({
        title: 'BQE ul normën e interesit',
        summary:
          'Vendimi prek kredinë banesore dhe hipotekën për mijëra familje.',
        body: ['Norma e interesit bie për herë të parë këtë vit.'],
        category: 'macro',
      }),
      all,
    );

    expect(slug).toBe('mortgage');
  });

  it('offers the inflation calculator on a prices story', () => {
    const slug = matchCalculatorForArticle(
      article({
        title: 'Inflacioni ngadalësohet',
        summary:
          'Çmimet u rritën më ngadalë, por fuqia blerëse mbetet nën presion.',
        body: ['Kosto e jetesës mbetet shqetësim.'],
        category: 'economy',
      }),
      all,
    );

    expect(slug).toBe('inflation-adjustment');
  });

  it('returns nothing when a story merely brushes past a term', () => {
    // One passing mention must not interrupt an article with a widget.
    const slug = matchCalculatorForArticle(
      article({
        title: 'Papunësia bie në tremujorin e dytë',
        summary: 'Tregu i punës forcohet.',
        body: ['Një kredi e re u aprovua për projektin.'],
        category: 'economy',
      }),
      all,
    );

    expect(slug).toBeNull();
  });

  it('respects the category gate', () => {
    // The same words on a desk the calculator does not serve produce nothing.
    const words = {
      title: 'Kredi, kredi, kredi',
      summary: 'Norma e interesit dhe kredi.',
      body: ['Kredi dhe hipotekë.'],
    };

    expect(
      matchCalculatorForArticle(article({ ...words, category: 'macro' }), all),
    ).not.toBeNull();
    expect(
      matchCalculatorForArticle(article({ ...words, category: 'crypto' }), all),
    ).toBeNull();
  });

  it('weights the headline above the body', () => {
    const inTitle = matchCalculatorForArticle(
      article({
        title: 'Dividend, dividend',
        summary: 'dividend',
        category: 'stocks',
      }),
      all,
    );
    const inBodyOnly = matchCalculatorForArticle(
      article({ body: ['dividend'], category: 'stocks' }),
      all,
    );

    expect(inTitle).not.toBeNull();
    expect(inBodyOnly).toBeNull();
  });

  it('matches regardless of diacritics and case', () => {
    const withDiacritics = matchCalculatorForArticle(
      article({
        title: 'Çmimet dhe fuqia blerëse',
        summary: 'Inflacioni rritet, kosto e jetesës gjithashtu.',
        category: 'economy',
      }),
      all,
    );
    const without = matchCalculatorForArticle(
      article({
        title: 'CMIMET DHE FUQIA BLERESE',
        summary: 'INFLACIONI RRITET, KOSTO E JETESES GJITHASHTU.',
        category: 'economy',
      }),
      all,
    );

    expect(withDiacritics).toBe(without);
    expect(withDiacritics).not.toBeNull();
  });

  it('does not match a phrase inside a longer word', () => {
    // "euro" must not fire on "Europa", or every EU story gets a converter.
    const slug = matchCalculatorForArticle(
      article({
        title: 'Europa dhe Europianët',
        summary: 'Europa diskuton. Europa vendos. Europa pret.',
        category: 'europe',
      }),
      all,
    );

    expect(slug).not.toBe('currency-converter');
  });

  it('returns at most one calculator', () => {
    const slug = matchCalculatorForArticle(
      article({
        title: 'Inflacioni, kredi, dividend, pension dhe kursi i këmbimit',
        summary:
          'Inflacioni, kredi, dividend, pension, valutë, investim afatgjatë.',
        body: ['Inflacioni, kredi, dividend, pension, euro, dollar.'],
        category: 'economy',
      }),
      all,
    );

    expect(typeof slug === 'string' || slug === null).toBe(true);
  });

  it('handles an empty article without throwing', () => {
    expect(matchCalculatorForArticle(article(), all)).toBeNull();
    expect(matchCalculatorForArticle(article({ body: null }), all)).toBeNull();
  });
});
