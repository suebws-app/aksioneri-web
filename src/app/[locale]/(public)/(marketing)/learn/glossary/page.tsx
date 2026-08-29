import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getGlossary, GlossaryPage } from '@/features/learn';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { definedTermSetSchema, safeJsonLd } from '@/lib/seo/schemas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'learn' });

  return buildMetadata({
    title: t('glossary.metaTitle'),
    description: t('glossary.metaDescription'),
    path: '/learn/glossary',
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const terms = getGlossary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(definedTermSetSchema(locale, terms)),
        }}
      />
      <GlossaryPage terms={terms} />
    </>
  );
}
