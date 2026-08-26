/**
 * Single source of truth for the site's navigation.
 *
 * Header, mobile nav, footer and sitemap all read from this file: adding or
 * renaming a section is a one-line edit here. Splitting the list across those
 * files invited drift (a new section landed in the header while the footer
 * kept the old four).
 */

export const PRIMARY_SECTIONS = ['home', 'news', 'learn', 'calendar'] as const;

export type SiteSection = (typeof PRIMARY_SECTIONS)[number];

/**
 * `home` is the daily briefing at `/` — a curated cover of what moved
 * markets today. It is NOT the same as the `/markets` (Tregjet) index
 * page, which lives outside the primary nav and is reached from search
 * and asset detail pages.
 */
export const HREF: Record<SiteSection, string> = {
  home: '/',
  news: '/news',
  learn: '/learn',
  calendar: '/calendar',
};

/** The standing pages, in the order the design lists them. */
export const LEGAL_SECTIONS = ['about', 'contact', 'privacy', 'terms'] as const;

export type LegalSection = (typeof LEGAL_SECTIONS)[number];

/**
 * How the footer groups every link into columns. Each item points at a
 * translation key (`namespace.key`) and a route — grouped so the reader
 * can find "Fjalorthi" beside "Mëso" rather than lost in a flat row.
 *
 * `namespace` refers to the `next-intl` catalogue namespace the item's
 * label lives under. `nav.*` reuses the top-nav labels; `footer.*`
 * covers footer-only destinations (Fjalorthi, the legal pages).
 */
export interface FooterLink {
  namespace: 'nav' | 'footer';
  labelKey: string;
  href: string;
}

export interface FooterGroup {
  /** Translation key under `footer.groups.*` for the column heading. */
  headingKey: 'data' | 'learn' | 'about' | 'legal';
  links: FooterLink[];
}

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    headingKey: 'data',
    links: [
      { namespace: 'nav', labelKey: 'home', href: '/' },
      { namespace: 'nav', labelKey: 'markets', href: '/markets' },
      { namespace: 'nav', labelKey: 'news', href: '/news' },
      { namespace: 'nav', labelKey: 'calendar', href: '/calendar' },
    ],
  },
  {
    headingKey: 'learn',
    links: [
      { namespace: 'nav', labelKey: 'learn', href: '/learn' },
      { namespace: 'footer', labelKey: 'glossary', href: '/learn/glossary' },
    ],
  },
  {
    headingKey: 'about',
    links: [
      { namespace: 'footer', labelKey: 'about', href: '/about' },
      { namespace: 'footer', labelKey: 'contact', href: '/contact' },
    ],
  },
  {
    headingKey: 'legal',
    links: [
      { namespace: 'footer', labelKey: 'privacy', href: '/privacy' },
      { namespace: 'footer', labelKey: 'terms', href: '/terms' },
    ],
  },
];
