import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MacroPage, type MacroSeriesCard } from '@/features/markets/MacroPage';
import type { Locale } from '@/i18n/config';
import {
  getMacroSeries,
  MACRO_SERIES_IDS,
  type MacroSeriesId,
} from '@/lib/api/rates';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export const revalidate = 3600;

const CARD_MANIFEST: {
  id: MacroSeriesId;
  headingKey: string;
  descriptionKey: string;
}[] = [
  {
    id: 'DGS10',
    headingKey: 'dgs10.heading',
    descriptionKey: 'dgs10.description',
  },
  {
    id: 'DGS2',
    headingKey: 'dgs2.heading',
    descriptionKey: 'dgs2.description',
  },
  { id: 'DFF', headingKey: 'dff.heading', descriptionKey: 'dff.description' },
  {
    id: 'CPIAUCSL',
    headingKey: 'cpiaucsl.heading',
    descriptionKey: 'cpiaucsl.description',
  },
  {
    id: 'UNRATE',
    headingKey: 'unrate.heading',
    descriptionKey: 'unrate.description',
  },
  {
    id: 'PAYEMS',
    headingKey: 'payems.heading',
    descriptionKey: 'payems.description',
  },
  {
    id: 'ICSA',
    headingKey: 'icsa.heading',
    descriptionKey: 'icsa.description',
  },
  {
    id: 'INDPRO',
    headingKey: 'indpro.heading',
    descriptionKey: 'indpro.description',
  },
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.macro' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/markets/macro',
    locale,
  });
}

export default async function Page({ params }: PageProps) {
  await params;

  const seriesResults = await Promise.all(
    MACRO_SERIES_IDS.map((id) => getMacroSeries(id)),
  );

  const bySeriesId = new Map(
    MACRO_SERIES_IDS.map((id, index) => [id, seriesResults[index] ?? null]),
  );

  const cards: MacroSeriesCard[] = CARD_MANIFEST.map((entry) => ({
    id: entry.id,
    headingKey: entry.headingKey,
    descriptionKey: entry.descriptionKey,
    data: bySeriesId.get(entry.id) ?? null,
  }));

  return <MacroPage cards={cards} />;
}
