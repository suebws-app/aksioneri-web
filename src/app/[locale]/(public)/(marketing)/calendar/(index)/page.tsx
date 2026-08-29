import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/config';
import {
  CalendarPage,
  getCalendarWeek,
  isRegionFilterValue,
  type RegionFilterValue,
} from '@/features/calendar';
import { buildMetadata } from '@/lib/seo/metadata';

interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calendar' });

  return buildMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/calendar',
    locale,
  });
}

const readRegion = (
  value: string | string[] | undefined,
): RegionFilterValue => {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && isRegionFilterValue(raw) ? raw : 'ALL';
};

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;

  const query = await searchParams;
  const requestedDate = Array.isArray(query.date) ? query.date[0] : query.date;

  const week = await getCalendarWeek(
    locale,
    requestedDate ? { date: requestedDate } : {},
  );

  const selectedDate =
    requestedDate && week.days.some((day) => day.date === requestedDate)
      ? requestedDate
      : week.todayDate || new Date().toISOString().slice(0, 10);

  return (
    <CalendarPage
      week={{ ...week, selectedDate }}
      region={readRegion(query.region)}
    />
  );
}
