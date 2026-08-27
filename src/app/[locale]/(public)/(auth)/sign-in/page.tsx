import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SignInPage } from '@/features/auth';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.signIn' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/sign-in',
    locale,
    // Sign-in has no place in an index. The equivalent page in `robots.ts`'s
    // PRIVATE_PATHS wires the disallow rule; `noIndex` here removes it from
    // any list a crawler might otherwise render a preview for.
    noIndex: true,
  });
}

export default function Page() {
  return <SignInPage />;
}
