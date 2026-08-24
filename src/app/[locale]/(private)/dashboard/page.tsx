import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/auth/server-session';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'dashboard' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/dashboard',
    locale,
    // Private pages must never be indexed.
    noIndex: true,
  });
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // proxy.ts already blocks anonymous access; this is the real check. The proxy
  // reads a cookie, which proves nothing on its own.
  const user = await getCurrentUser();
  if (!user) redirect({ href: '/sign-in', locale });

  const t = await getTranslations('dashboard');

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <h1 className="text-2xl font-semibold">{t('heading')}</h1>
      <p className="text-foreground/70 mt-2">
        {t('signedInAs', { email: user?.email ?? '' })}
      </p>
    </main>
  );
}
