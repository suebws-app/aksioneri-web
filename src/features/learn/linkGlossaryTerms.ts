import type { GlossaryTerm } from './learnTypes';

const DEFAULT_MAX_LINKS = 6;

interface Match {
  term: GlossaryTerm;
  text: string;
  start: number;
  end: number;
}

export class GlossaryLinker {
  private readonly patterns: { term: GlossaryTerm; pattern: RegExp }[];
  private readonly used = new Set<string>();
  private linked = 0;

  constructor(
    terms: GlossaryTerm[],
    private readonly maxLinks: number = DEFAULT_MAX_LINKS,
  ) {
    this.patterns = terms
      .flatMap((term) =>
        [term.term, ...(term.aliases ?? [])].map((phrase) => ({
          term,
          phrase,
        })),
      )
      .sort((a, b) => b.phrase.length - a.phrase.length)
      .map(({ term, phrase }) => ({
        term,
        pattern: new RegExp(
          `(?<![\\p{L}\\p{N}])${escape(phrase)}(?![\\p{L}\\p{N}])`,
          'iu',
        ),
      }));
  }

  linkParagraph(
    text: string,
  ): (string | { term: GlossaryTerm; text: string })[] | null {
    if (this.linked >= this.maxLinks) return null;

    const matches: Match[] = [];
    const claimed: [number, number][] = [];

    for (const { term, pattern } of this.patterns) {
      if (this.used.has(term.slug)) continue;
      if (matches.length + this.linked >= this.maxLinks) break;

      const found = pattern.exec(text);
      if (!found) continue;

      const start = found.index;
      const end = start + found[0].length;

      if (claimed.some(([from, to]) => start < to && end > from)) continue;

      claimed.push([start, end]);
      matches.push({ term, text: found[0], start, end });
      this.used.add(term.slug);
    }

    if (matches.length === 0) return null;

    matches.sort((a, b) => a.start - b.start);
    this.linked += matches.length;

    const parts: (string | { term: GlossaryTerm; text: string })[] = [];
    let cursor = 0;

    for (const match of matches) {
      if (match.start > cursor) parts.push(text.slice(cursor, match.start));
      parts.push({ term: match.term, text: match.text });
      cursor = match.end;
    }
    if (cursor < text.length) parts.push(text.slice(cursor));

    return parts;
  }
}

const escape = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
