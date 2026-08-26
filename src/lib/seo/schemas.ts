import type { Locale } from '@/i18n/config';
import { clientEnv } from '@/lib/utils/env.client';
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
  contactPoint: {
    '@type': 'ContactPoint',
    email: clientEnv.NEXT_PUBLIC_CONTACT_EMAIL,
    contactType: 'customer support',
  },
});

/**
 * No `potentialAction`. It used to advertise a `SearchAction` at `/search` —
 * a route that has never existed, so Google was being told about a page that
 * 404s. The glossary has its own client-side search, but a sitelinks search
 * box has to point at a real URL that accepts a query, and none does yet.
 */
export const webSiteSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: localizedAbsoluteUrl(locale, '/'),
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

export interface LearningResourceInput {
  title: string;
  description: string;
  slug: string;
  readingMinutes: number;
  level: string;
  topic?: string;
}

/**
 * A lesson, as `LearningResource`.
 *
 * The first content-type builder in this file — until now only Organization,
 * WebSite and BreadcrumbList existed, so nothing on the site described what it
 * actually was. `timeRequired` uses ISO 8601 duration, which is what the
 * schema expects and what search engines read for the "N min" badge.
 */
export const learningResourceSchema = (
  locale: Locale,
  lesson: LearningResourceInput,
) => ({
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: lesson.title,
  description: lesson.description,
  url: localizedAbsoluteUrl(locale, `/learn/${lesson.slug}`),
  inLanguage: locale,
  learningResourceType: 'Lesson',
  educationalLevel: lesson.level,
  timeRequired: `PT${String(lesson.readingMinutes)}M`,
  isAccessibleForFree: true,
  provider: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
  ...(lesson.topic ? { about: lesson.topic } : {}),
});

export interface DefinedTermInput {
  slug: string;
  term: string;
  definition: string;
}

/**
 * The glossary, as `DefinedTermSet`.
 *
 * Each entry gets `@id` pointing at its own fragment, which is the same anchor
 * the article auto-linker sends readers to — so the structured data and the
 * internal links describe the same target.
 */
export const definedTermSetSchema = (
  locale: Locale,
  terms: DefinedTermInput[],
) => {
  const setUrl = localizedAbsoluteUrl(locale, '/learn/glossary');

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': setUrl,
    name: SITE_NAME,
    url: setUrl,
    inLanguage: locale,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      '@id': `${setUrl}#${term.slug}`,
      name: term.term,
      description: term.definition,
      inDefinedTermSet: setUrl,
    })),
  };
};

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * A page's frequently-asked questions, as `FAQPage`.
 *
 * One rule governs whether this may be emitted: **every question and answer
 * passed here must be present in the rendered HTML**. Google treats FAQ markup
 * describing content a reader cannot find as a spam signal, and it would also
 * simply be false. The `Disclosure` component is built on `<details>` for
 * exactly this reason — the answers are in the document whether or not
 * JavaScript ran, so this schema is always honest.
 */
export const faqPageSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

export interface WebApplicationInput {
  name: string;
  description: string;
  /** Unlocalised path, e.g. `/calculators/compound-interest`. */
  path: string;
  /** Schema.org application category, e.g. `FinanceApplication`. */
  category: string;
}

/**
 * A calculator, as `WebApplication`.
 *
 * `WebApplication` rather than the broader `SoftwareApplication`: it is the
 * more specific type for something that runs in the browser, and it is
 * eligible for the same treatment.
 *
 * `browserRequirements` says JavaScript is required, which deserves a note
 * because the page is built so that it is not — a shared URL renders its
 * result server-side and the explanation is static HTML. But *recalculating as
 * you type* is the application, and that does need scripting. The honest
 * claim is the one about the interactive product, not the static fallback.
 *
 * Note what is not here: `HowTo`. Google retired HowTo rich results in 2023,
 * so the markup would be pure maintenance for no result.
 */
export const webApplicationSchema = (
  locale: Locale,
  app: WebApplicationInput,
) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: app.name,
  description: app.description,
  url: localizedAbsoluteUrl(locale, app.path),
  applicationCategory: app.category,
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  inLanguage: locale,
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  provider: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
});

export interface ItemListEntry {
  name: string;
  /** Unlocalised path. */
  path: string;
}

/**
 * An index page's contents, as `ItemList` — what the calculators landing page
 * offers and in what order.
 *
 * Ordered, because the order on the page is editorial rather than incidental:
 * the list leads with what readers use most.
 */
export const itemListSchema = (locale: Locale, items: ItemListEntry[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: localizedAbsoluteUrl(locale, item.path),
  })),
});
