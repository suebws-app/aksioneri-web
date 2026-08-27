import type { Metadata } from 'next';
import { openGraphLocales, type Locale } from '@/i18n/config';
import { clientEnv } from '@/lib/utils/env.client';
import { serverEnv } from '@/lib/utils/env.server';
import { absoluteUrl, localizedAbsoluteUrl } from './urls';

/**
 * Human-facing brand name — Open Graph `siteName`, JSON-LD publisher, OG
 * image title. `NEXT_PUBLIC_SITE_NAME` lets staging append an environment
 * marker ("Aksioneri (Staging)") without a code deploy.
 */
export const SITE_NAME = clientEnv.NEXT_PUBLIC_SITE_NAME;

/** Recommended maximums before search engines truncate. Enforced by `pnpm seo:audit-meta`. */
export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_MAX_LENGTH = 160;

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Unlocalised path, e.g. `/pricing`. The locale prefix is added here. */
  path: string;
  locale: Locale;
  /** Absolute or root-relative image path. Falls back to the default OG image. */
  image?: string;
  noIndex?: boolean;
  /**
   * Suppress `alternates.canonical` entirely. Set on the 404 catch-all: emitting
   * a canonical from a 404 page makes the response a soft signal that "some
   * other URL is the real one for this content" — muddying whichever page the
   * canonical points at. On a real 404 there is no canonical to name.
   */
  noCanonical?: boolean;
  /**
   * Present only on news article pages. Switches the Open Graph type to
   * `article` and carries the article timestamps, which social crawlers and
   * search engines read for freshness.
   */
  article?: { publishedTime: string; modifiedTime?: string };
}

/**
 * Every page's `generateMetadata` goes through this function. Canonicals,
 * Open Graph and Twitter cards are then defined in exactly one place, so a
 * sitewide fix is a one-file change.
 *
 * There are no `alternates.languages`: hreflang describes a choice between
 * language versions of a page, and after the English locale was removed there
 * is only one.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
  image,
  noIndex = false,
  noCanonical = false,
  article,
}: BuildMetadataInput): Metadata {
  const canonical = localizedAbsoluteUrl(locale, path);
  // `image` may be root-relative (our own assets) or fully qualified (a
  // publisher CDN URL from the news wire); `absoluteUrl` only prefixes paths.
  const ogImage = image
    ? /^https?:\/\//.test(image)
      ? image
      : absoluteUrl(image)
    : absoluteUrl('/opengraph-image');

  const openGraphBase = {
    siteName: SITE_NAME,
    title,
    description,
    url: canonical,
    locale: openGraphLocales[locale],
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  };

  // Two distinct meanings of "don't index this":
  //   - `serverEnv.NOINDEX` marks a staging or preview environment. Total
  //     blackout: no indexing AND no link discovery. Prevents Googlebot from
  //     crawling the staging graph at all.
  //   - `noIndex: true` marks a page whose content isn't worth indexing
  //     (search results, 404, private utility). Links from it are still worth
  //     following — a crawler that lands on `/kerko?q=…` should still discover
  //     the article the reader linked to.
  const robots = serverEnv.NOINDEX
    ? { index: false, follow: false }
    : noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        };

  return {
    title,
    description,
    // Omitting `alternates` entirely when `noCanonical` is set — Next merges
    // an empty object into `<head>` as nothing, but a `canonical: undefined`
    // is spec-legal noise the framework may still emit.
    ...(noCanonical ? {} : { alternates: { canonical } }),
    openGraph: article
      ? {
          ...openGraphBase,
          type: 'article',
          publishedTime: article.publishedTime,
          ...(article.modifiedTime
            ? { modifiedTime: article.modifiedTime }
            : {}),
        }
      : { ...openGraphBase, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots,
  };
}
