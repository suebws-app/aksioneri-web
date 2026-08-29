export const PRIMARY_SECTIONS = [
  'home',
  'news',
  'learn',
  'calendar',
  'calculators',
] as const;

export type SiteSection = (typeof PRIMARY_SECTIONS)[number];

export const HREF: Record<SiteSection, string> = {
  home: '/',
  news: '/news',
  learn: '/learn',
  calendar: '/calendar',
  calculators: '/calculators',
};

export const LEGAL_SECTIONS = ['about', 'contact', 'privacy', 'terms'] as const;

export type LegalSection = (typeof LEGAL_SECTIONS)[number];

export interface FooterLink {
  namespace: 'nav' | 'footer';
  labelKey: string;
  href: string;
}

export interface FooterGroup {
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
      { namespace: 'nav', labelKey: 'calculators', href: '/calculators' },
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
