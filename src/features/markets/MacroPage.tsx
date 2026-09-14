import { useTranslations } from 'next-intl';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import type { MacroSeries, MacroSeriesId } from '@/lib/api/rates';

export interface MacroSeriesCard {
  id: MacroSeriesId;
  headingKey: string;
  descriptionKey: string;
  data: MacroSeries | null;
}

export interface MacroPageProps {
  cards: MacroSeriesCard[];
}

const CARD_WIDTH = 320;
const CARD_HEIGHT = 80;
const CARD_PADDING = 8;

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) {
    return (
      <svg
        viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
        className="h-16 w-full"
        aria-hidden
      />
    );
  }
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const stepX =
    (CARD_WIDTH - CARD_PADDING * 2) / Math.max(points.length - 1, 1);

  const path = points
    .map((point, index) => {
      const x = CARD_PADDING + index * stepX;
      const y =
        CARD_HEIGHT -
        CARD_PADDING -
        ((point - min) / span) * (CARD_HEIGHT - CARD_PADDING * 2);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const last = points[points.length - 1] ?? 0;
  const first = points[0] ?? 0;
  const trending = last >= first;

  return (
    <svg
      viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}
      className="h-16 w-full"
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke={trending ? 'var(--positive)' : 'var(--negative)'}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function formatValue(value: number, unit: string): string {
  if (unit === 'percent') return `${value.toFixed(2)}%`;
  if (unit === 'thousands')
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value * 1000);
  if (unit === 'count')
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value);
  return value.toFixed(2);
}

function formatChangePercent(first: number, last: number): string | null {
  if (first === 0) return null;
  const pct = ((last - first) / Math.abs(first)) * 100;
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}

export function MacroPage({ cards }: MacroPageProps) {
  const t = useTranslations('markets.macro');
  const nav = useTranslations('nav');

  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader active="markets" />

      <main className="mx-auto w-full max-w-6xl grow px-6 py-10">
        <Breadcrumb
          label={t('heading')}
          items={[
            { label: nav('markets'), href: '/markets' },
            { label: t('heading') },
          ]}
        />

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-semibold">{t('heading')}</h1>
          <p className="text-ink-secondary max-w-2xl text-base">{t('lede')}</p>
          <p className="text-ink-faint mt-2 text-xs">{t('attribution')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <MacroCard key={card.id} card={card} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function MacroCard({ card }: { card: MacroSeriesCard }) {
  const t = useTranslations('markets.macro');
  const series = card.data;
  const points = series?.data.map((point) => point.value) ?? [];
  const last = points.at(-1);
  const first = points.at(0);
  const value =
    last !== undefined && series ? formatValue(last, series.unit) : '—';
  const change =
    first !== undefined && last !== undefined
      ? formatChangePercent(first, last)
      : null;
  const trending = last !== undefined && first !== undefined && last >= first;
  const period = series?.data.at(-1)?.period ?? null;

  return (
    <article className="border-line-soft rounded-md border bg-white p-5">
      <header className="mb-3">
        <h2 className="text-ink text-sm font-semibold tracking-wide uppercase">
          {t(card.headingKey)}
        </h2>
        <p className="text-ink-faint mt-1 text-xs">{t(card.descriptionKey)}</p>
      </header>
      <div className="mb-3 flex items-baseline gap-3">
        <span className="text-ink text-2xl font-semibold">{value}</span>
        {change ? (
          <span
            className={`text-sm font-medium ${
              trending ? 'text-positive' : 'text-negative'
            }`}
          >
            {change}
          </span>
        ) : null}
      </div>
      <Sparkline points={points} />
      {period ? (
        <p className="text-ink-faint mt-2 text-[11px]">
          {t('lastRelease', { date: period })}
        </p>
      ) : null}
    </article>
  );
}
