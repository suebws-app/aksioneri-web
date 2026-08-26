import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getGlossary, GlossaryPage } from '@/features/learn';
import type { Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { definedTermSetSchema } from '@/lib/seo/schemas';

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
        // Built from our own glossary, never user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetSchema(locale, terms)),
        }}
      />
      <GlossaryPage terms={terms} />
    </>
  );
}
