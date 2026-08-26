import type { Metadata } from 'next';
import { openGraphLocales, type Locale } from '@/i18n/config';
import { clientEnv } from '@/lib/utils/env.client';
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
}: BuildMetadataInput): Metadata {
  const canonical = localizedAbsoluteUrl(locale, path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl('/opengraph-image');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: openGraphLocales[locale],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
