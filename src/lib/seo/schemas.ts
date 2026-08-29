import type { Locale } from '@/i18n/config';
import { clientEnv } from '@/lib/utils/env.client';
import { SITE_NAME } from './metadata';
import { absoluteUrl, localizedAbsoluteUrl } from './urls';

export const safeJsonLd = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c');

const ORGANIZATION_ID = `${absoluteUrl('/')}#organization`;

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/icon.svg'),
  contactPoint: {
    '@type': 'ContactPoint',
    email: clientEnv.NEXT_PUBLIC_CONTACT_EMAIL,
    contactType: 'customer support',
  },
});

export const webSiteSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: localizedAbsoluteUrl(locale, '/'),
});

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

export const breadcrumbSchema = (locale: Locale, items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.path ? { item: localizedAbsoluteUrl(locale, item.path) } : {}),
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
  path: string;
  category: string;
}

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
  path: string;
}

export interface NewsArticleSchemaInput {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  modifiedAt?: string | null;
  imageUrl?: string | null;
}

export const newsArticleSchema = (
  locale: Locale,
  article: NewsArticleSchemaInput,
) => {
  const canonical = localizedAbsoluteUrl(locale, `/news/${article.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    ...(article.modifiedAt ? { dateModified: article.modifiedAt } : {}),
    ...(article.imageUrl ? { image: [article.imageUrl] } : {}),
    inLanguage: locale,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
    publisher: { '@id': ORGANIZATION_ID },
  };
};

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
