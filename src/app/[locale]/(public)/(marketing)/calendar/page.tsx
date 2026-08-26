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

/** Reads `?region=` and falls back to all regions on anything unrecognised. */
const readRegion = (
  value: string | string[] | undefined,
): RegionFilterValue => {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && isRegionFilterValue(raw) ? raw : 'ALL';
};

export default async function Page({ params, searchParams }: PageProps) {
  // Next.js 16: both are Promises.
  const { locale } = await params;

  const query = await searchParams;
  const requestedDate = Array.isArray(query.date) ? query.date[0] : query.date;

  // Pass the requested date through — the API returns the week containing
  // it, so `selectedDate` in the response is already the right day. Falls
  // back to today (the API's default) when the query string omits it.
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
