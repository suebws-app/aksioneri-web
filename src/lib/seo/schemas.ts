import type { Locale } from '@/i18n/config';
import { SITE_NAME } from './metadata';
import { absoluteUrl, localizedAbsoluteUrl } from './urls';

/**
 * JSON-LD builders. Structured data is what earns rich results — a sitelinks
 * search box, breadcrumb trails, organisation panels.
 *
 * Every builder returns a plain object; render it with
 * `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />`.
 * Only ever pass objects built here — never user input.
 */

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/icon.svg'),
});

export const webSiteSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: localizedAbsoluteUrl(locale, '/'),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${localizedAbsoluteUrl(locale, '/search')}?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export interface BreadcrumbItem {
  name: string;
  /** Unlocalised path; the locale prefix is applied here. */
  path: string;
}

export const breadcrumbSchema = (locale: Locale, items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: localizedAbsoluteUrl(locale, item.path),
  })),
});
