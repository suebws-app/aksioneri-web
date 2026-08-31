import type { Metadata } from 'next';
import {
  defaultLocale,
  locales,
  openGraphLocales,
  type Locale,
} from '@/i18n/config';
import { clientEnv } from '@/lib/utils/env.client';
import { serverEnv } from '@/lib/utils/env.server';
import { absoluteUrl, localizedAbsoluteUrl } from './urls';

export const SITE_NAME = clientEnv.NEXT_PUBLIC_SITE_NAME;

export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_MAX_LENGTH = 160;

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  noIndex?: boolean;
  noCanonical?: boolean;
  article?: { publishedTime: string; modifiedTime?: string };
}

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
  const languages = noIndex
    ? undefined
    : {
        ...Object.fromEntries(
          locales.map((l) => [l, localizedAbsoluteUrl(l, path)]),
        ),
        'x-default': localizedAbsoluteUrl(defaultLocale, path),
      };
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
    ...(noCanonical && !languages
      ? {}
      : {
          alternates: {
            ...(noCanonical ? {} : { canonical }),
            ...(languages ? { languages } : {}),
          },
        }),
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
