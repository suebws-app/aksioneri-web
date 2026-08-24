import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/',
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      {/* Exactly one h1 per page — it is the strongest on-page ranking signal. */}
      <h1 className="text-4xl font-semibold tracking-tight text-balance">
        {t('heading')}
      </h1>
      <p className="text-foreground/70 text-lg text-pretty">
        {t('subheading')}
      </p>
      <div>
        <Link
          href="/sign-up"
          className="bg-foreground text-background inline-flex rounded-md px-5 py-2.5"
        >
          {t('cta')}
        </Link>
      </div>
    </main>
  );
}
