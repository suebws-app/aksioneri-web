import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Locale } from '@/i18n/config';
import { SignInPage } from '@/features/auth';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return buildMetadata({
    title: t('signIn.metaTitle'),
    description: t('signIn.metaDescription'),
    path: '/sign-in',
    locale,
    // Auth pages carry no search value and are disallowed in robots.txt.
    noIndex: true,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // SignInPage reads useSearchParams, which requires a Suspense boundary or the
  // whole route opts out of static rendering.
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  );
}
