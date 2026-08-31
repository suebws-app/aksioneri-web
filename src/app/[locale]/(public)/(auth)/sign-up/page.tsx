import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { AUTH_PAGES_ENABLED } from '@/config/routes';
import { SignUpPage } from '@/features/auth';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  if (!AUTH_PAGES_ENABLED) notFound();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.signUp' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/sign-up',
    locale,
    noIndex: true,
  });
}

export default function Page() {
  if (!AUTH_PAGES_ENABLED) notFound();
  return <SignUpPage />;
}
