/**
 * A prose section: one heading, one or more paragraphs, and — for legal
 * pages that must enumerate rights or duties — an optional bulleted list
 * followed by a trailing prose block. The list sits between
 * `paragraphs` and `paragraphsAfterList` so a caller can lead with prose,
 * enumerate, and close with prose in a single semantic section.
 */
export interface StaticSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
  paragraphsAfterList?: string[];
}

/**
 * One of the site's standing pages — about, contact, privacy, terms.
 *
 * The prose lives here as *data* rather than in `messages/`, for the same
 * reason lesson and calendar copy does: it is the page's content, not the
 * interface around it, and a legal document broken into flat translation keys
 * is unreadable to whoever has to check it.
 */
export interface StaticPageContent {
  /** Unlocalised path, without the leading slash. */
  slug: 'about' | 'contact' | 'privacy' | 'terms';
  title: string;
  /** Standfirst under the title. */
  intro: string;
  sections: StaticSection[];
  /**
   * Rendered as a `mailto:` link above the sections. An address a reader has
   * to select and copy is a worse address.
   */
  email?: string;
  /**
   * ISO date the text last changed, shown on the two legal pages. A privacy
   * policy with no date tells a reader nothing about whether it is current.
   */
  updatedAt?: string;
}
