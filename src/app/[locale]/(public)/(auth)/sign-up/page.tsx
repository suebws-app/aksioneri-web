import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SignUpPage } from '@/features/auth';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
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
  return <SignUpPage />;
}
