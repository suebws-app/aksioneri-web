import { useTranslations } from 'next-intl';
import { ChangeValue } from '@/components/ChangeValue';
import { Link } from '@/i18n/navigation';
import type { Quote } from '@/lib/api/markets';

export function QuoteTable({ quotes }: { quotes: Quote[] }) {
  const t = useTranslations('markets');

  return (
    <table className="w-full border-collapse text-[15px]">
      <caption className="sr-only">{t('quotesCaption')}</caption>
      <thead className="text-ink-ghost text-[11px] font-semibold tracking-[0.11em] uppercase">
        <tr>
          <th scope="col" className="py-3 text-left">
            {t('columns.asset')}
          </th>
          <th scope="col" className="py-3 text-right">
            {t('columns.price')}
          </th>
          <th scope="col" className="w-[74px] py-3 text-right">
            {t('columns.change')}
          </th>
        </tr>
      </thead>
      <tbody>
        {quotes.map((quote) => (
          <tr key={quote.symbol} className="border-line border-t last:border-b">
            <td className="py-3.5 font-medium">
              <Link
                href={`/markets/${quote.symbol}`}
                className="text-ink hover:text-accent"
              >
                {quote.name}
              </Link>
            </td>
            <td className="text-ink-secondary py-3.5 text-right font-mono">
              {quote.price}
            </td>
            <td className="py-3.5 text-right">
              <ChangeValue percent={quote.changePercent} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
