/**
 * What a result points at. Drives the label on the result row and the order
 * the groups appear in on the results page.
 *
 * `page` is the site's own sections. Without them a reader searching
 * "fjalori" got every lesson that mentions the glossary and no link to it.
 */
export type SearchKind =
  'page' | 'lesson' | 'term' | 'article' | 'event' | 'market';

/**
 * One searchable thing, flattened from whichever feature owns it.
 *
 * Deliberately shallow: an entry carries what a result row renders plus the
 * words worth matching on, and nothing else. Lesson bodies in particular stay
 * out — the index is built and searched on the server, but it is also the
 * shape a future ⌘K overlay would have to ship to the browser.
 */
export interface SearchEntry {
  kind: SearchKind;
  /** Rendered as the result row's heading, and weighted highest when matching. */
  title: string;
  /**
   * A line under the title that is *also* matched, at the lowest weight — a
   * glossary definition, a story's standfirst, a lesson's summary.
   */
  subtitle?: string;
  /**
   * A line under the title that is **never** matched. Labels like a lesson's
   * topic belong here: "Aksione dhe ETF" is shared by twelve lessons, so
   * matching it made a search for "ETF" return the whole topic ahead of the
   * two lessons actually about ETFs. Shown when there is no `subtitle`.
   */
  context?: string;
  /**
   * Unlocalised path; `@/i18n/navigation` adds the locale prefix. Always a
   * page on this site — anything the site does not hold is not indexed.
   */
  href: string;
  /**
   * Extra words that should find this entry but do not belong in the title:
   * glossary aliases, a lesson's key terms, a symbol's ticker.
   */
  keywords?: string[];
}
