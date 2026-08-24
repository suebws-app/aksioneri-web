import { describe, expect, it } from 'vitest';
import { GlossaryLinker } from '../linkGlossaryTerms';
import type { GlossaryTerm } from '../learnTypes';

const term = (
  slug: string,
  name: string,
  aliases?: string[],
): GlossaryTerm => ({
  slug,
  term: name,
  definition: `Përkufizimi i ${name}.`,
  ...(aliases ? { aliases } : {}),
});

const TERMS = [
  term('basis-point', 'Pikë bazë', ['pika bazë']),
  term('point', 'Pikë'),
  term('yield', 'Yield', ['yield-i']),
  term('inflation', 'Inflacion', ['inflacioni']),
  term('bond', 'Obligacion', ['obligacione']),
];

/** Flattens a linked paragraph back to the term slugs it produced. */
const linkedSlugs = (
  parts: ReturnType<GlossaryLinker['linkParagraph']>,
): string[] =>
  (parts ?? [])
    .filter(
      (part): part is { term: GlossaryTerm; text: string } =>
        typeof part !== 'string',
    )
    .map((part) => part.term.slug);

describe('GlossaryLinker', () => {
  it('links a term it finds', () => {
    const parts = new GlossaryLinker(TERMS).linkParagraph(
      'Norma u rrit dhe inflacioni ra.',
    );

    expect(linkedSlugs(parts)).toEqual(['inflation']);
  });

  it('prefers the longest match', () => {
    // "Pikë bazë" must win over "Pikë", which is a prefix of it.
    const parts = new GlossaryLinker(TERMS).linkParagraph(
      'Banka e uli normën me 25 pikë bazë.',
    );

    expect(linkedSlugs(parts)).toEqual(['basis-point']);
  });

  it('matches only whole words', () => {
    // "yield" appears inside "yielded"; linking it would corrupt the word.
    const parts = new GlossaryLinker(TERMS).linkParagraph(
      'The bond yielded less than expected.',
    );

    expect(linkedSlugs(parts)).not.toContain('yield');
  });

  it('is case-insensitive but preserves the original casing', () => {
    const parts = new GlossaryLinker(TERMS).linkParagraph(
      'INFLACIONI po ngadalësohet.',
    );

    const linked = (parts ?? []).find((part) => typeof part !== 'string');
    expect(linked).toMatchObject({ text: 'INFLACIONI' });
  });

  it('links a term once per article, not once per paragraph', () => {
    // One linker spans the whole story, so the second mention stays plain.
    const linker = new GlossaryLinker(TERMS);

    expect(linkedSlugs(linker.linkParagraph('Inflacioni u rrit.'))).toEqual([
      'inflation',
    ]);
    expect(linker.linkParagraph('Inflacioni ra përsëri.')).toBeNull();
  });

  it('stops once the cap is reached', () => {
    // A jargon-dense story must not turn into a list of links.
    const linker = new GlossaryLinker(TERMS, 2);
    const parts = linker.linkParagraph(
      'Inflacioni, yield-i, obligacione dhe pikë bazë njëherësh.',
    );

    expect(linkedSlugs(parts)).toHaveLength(2);
    expect(
      linker.linkParagraph('Inflacioni dhe obligacione përsëri.'),
    ).toBeNull();
  });

  it('returns null when nothing matches, so the caller can skip the work', () => {
    expect(
      new GlossaryLinker(TERMS).linkParagraph('Moti sot është i mirë.'),
    ).toBeNull();
  });

  it('does not link a term that only looks financial out of context', () => {
    // Found in production: "Compounding" was linked inside "compounding the
    // problem" in a story about a chief executive resigning. Aliases that are
    // ordinary English words before they are financial ones were removed, and
    // this pins that decision.
    const linker = new GlossaryLinker([
      term('compounding', 'Kompozim', ['compound interest']),
      term('duration', 'Kohëzgjatje'),
    ]);

    expect(
      linker.linkParagraph('The delay is compounding the problem for staff.'),
    ).toBeNull();
    expect(
      linker.linkParagraph('The talks ran for the duration of the week.'),
    ).toBeNull();
  });

  it('reassembles the paragraph without losing or duplicating text', () => {
    const source = 'Banka e uli normën me 25 pikë bazë këtë muaj.';
    const parts = new GlossaryLinker(TERMS).linkParagraph(source) ?? [];

    const rebuilt = parts
      .map((part) => (typeof part === 'string' ? part : part.text))
      .join('');

    expect(rebuilt).toBe(source);
  });
});
