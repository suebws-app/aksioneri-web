import type { GlossaryTerm } from './learnTypes';

/**
 * Links glossary terms found in article prose to their definitions.
 *
 * This is what connects the two halves of the site: the wire publishes real
 * financial copy every minute, the glossary defines the jargon in it, and
 * without this they never meet.
 *
 * Returns plain data — strings and matched terms — which the caller renders.
 * Never HTML: the input is scraped third-party article text, so
 * `dangerouslySetInnerHTML` is not an option. A publisher who changes their
 * markup must not be able to inject anything into these pages.
 *
 * ## The rules, and why each exists
 *
 * - **Longest match first.** "basis point" has to beat "point", or the
 *   specific term loses to the generic one that happens to be a prefix.
 * - **Word boundaries only.** "yield" must not match inside "yielded".
 * - **Case-insensitive, original casing preserved.** A term at the start of a
 *   sentence is the same term.
 * - **First occurrence per article.** Linking every "ETF" in a story turns it
 *   blue and unreadable.
 * - **Capped.** A jargon-dense piece would otherwise become hyperlink soup.
 *
 * The caller creates one `GlossaryLinker` per article and feeds it paragraphs
 * in order, so "first occurrence" and the cap span the whole story rather
 * than resetting on every paragraph.
 */

/** Above this, a story stops reading like prose and starts reading like a menu. */
const DEFAULT_MAX_LINKS = 6;

interface Match {
  term: GlossaryTerm;
  /** The exact text as it appeared, so original casing survives. */
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
    // Sorted longest-first so "basis point" is tried before "point".
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

  /**
   * Splits one paragraph into plain strings and linkable terms.
   *
   * Returns `null` when nothing matched, so the caller can render the original
   * string and skip the array entirely — the common case for most paragraphs.
   */
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

      // A longer term already covers this span; do not link inside it.
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

/** Escapes a phrase for safe use inside a RegExp. */
const escape = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
