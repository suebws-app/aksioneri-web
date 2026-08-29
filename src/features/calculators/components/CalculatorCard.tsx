import { Link } from '@/i18n/navigation';

export function CalculatorCard({
  slug,
  heading,
  blurb,
  category,
  cta,
}: {
  slug: string;
  heading: string;
  blurb: string;
  category: string;
  cta: string;
}) {
  return (
    <Link
      href={`/calculators/${slug}`}
      className="border-line bg-surface hover:border-accent group flex h-full flex-col rounded-sm border p-5"
    >
      <span className="text-ink-faint mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {category}
      </span>

      <span className="text-ink group-hover:text-accent mb-2 font-serif text-[21px] leading-tight font-medium text-balance">
        {heading}
      </span>

      <span className="text-ink-body mb-4 flex-1 text-[14.5px] leading-[1.55] text-pretty">
        {blurb}
      </span>

      <span
        aria-hidden
        className="text-accent inline-flex items-center gap-1.5 text-[14px] font-medium"
      >
        {cta}
        <svg viewBox="0 0 12 10" width="12" height="10" fill="none">
          <path
            d="M7 1 11 5 7 9M11 5H1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
