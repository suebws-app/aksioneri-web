import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';
import { CATEGORY_TINTS } from '../newsImages';
import type { NewsCategory } from '../newsTypes';

/**
 * Renders the hero art for an article across two fallback layers.
 *
 *   1. `imageUrl` — the feed's `<enclosure>` or the scraped `og:image`.
 *      This is what the publisher chose to advertise for the story.
 *   2. A category-tinted placeholder with the category name, always
 *      available so no card ever renders as an empty grey square.
 */
interface NewsImageProps {
  article: {
    id: string;
    category: NewsCategory;
    imageUrl?: string | null;
  };
  className: string;
  sizes: string;
  priority?: boolean;
}

export function NewsImage({
  article,
  className,
  sizes,
  priority,
}: NewsImageProps) {
  if (article.imageUrl) {
    return (
      <div
        className={cn(
          'border-line relative overflow-hidden rounded-sm border',
          className,
        )}
      >
        <Image
          src={article.imageUrl}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <CategoryPlaceholder
      category={article.category}
      id={article.id}
      className={className}
    />
  );
}

/**
 * A branded fallback that is visually unique per article.
 *
 * The category tint gives every card in the same desk a shared identity;
 * a hash of the article id then varies the gradient direction and the
 * sparkline geometry so no two placeholders ever look identical. The
 * sparkline is a nod to the site's subject — a financial site's placeholder
 * should look like a chart, not a stock-photo stand-in.
 *
 * `aria-hidden` because the placeholder describes nothing — the category
 * label is already elsewhere on the card, and this block is purely visual.
 */
function CategoryPlaceholder({
  category,
  id,
  className,
}: {
  category: NewsCategory;
  id: string;
  className: string;
}) {
  const t = useTranslations('news');
  const tint = CATEGORY_TINTS[category];

  // A small integer PRNG seeded by the article id. Same id → same values →
  // no hydration flicker; different ids → different visuals.
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  const abs = Math.abs(hash);

  // Gradient direction — one of 12 evenly-spaced angles, so the highlight
  // never lands in exactly the same place twice.
  const angle = (abs % 12) * 30;

  // Seven-point sparkline, values 20–70 on a 0–100 SVG viewBox. Uses
  // successive bits of the hash so points are independent from one another.
  const points = Array.from({ length: 7 }, (_, i) => {
    const bits = (abs >> (i * 3)) & 0x1f; // 5 bits → 0-31
    const y = 70 - bits * 1.6; // 70 down to ~20
    const x = i * (100 / 6);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div
      aria-hidden
      className={cn(
        'border-line relative flex items-center justify-center overflow-hidden rounded-sm border',
        className,
      )}
      style={{
        // Two stops of the tint at slightly different lightnesses give the
        // gradient direction something to reveal, without introducing a
        // second colour that would fight with the category identity.
        backgroundImage: `linear-gradient(${angle}deg, ${tint.background} 0%, ${mix(tint.background, '#ffffff', 0.35)} 60%, ${tint.background} 100%)`,
        color: tint.foreground,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* A single baseline gridline anchors the sparkline visually. */}
        <line
          x1="0"
          y1="80"
          x2="100"
          y2="80"
          stroke="currentColor"
          strokeWidth="0.3"
          strokeDasharray="1.5 1.5"
          opacity="0.5"
        />
      </svg>

      <span className="relative px-4 text-center font-mono text-[11px] font-semibold tracking-[0.16em] uppercase">
        {t(`categories.${category}`)}
      </span>
    </div>
  );
}

/**
 * Blend two `#rrggbb` colours in linear channel space. Used for the
 * gradient highlight — mixing the tint with white at a fixed ratio keeps
 * the palette coherent while giving the gradient something to lift.
 */
function mix(a: string, b: string, ratio: number): string {
  const parse = (hex: string): [number, number, number] => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const blend = (x: number, y: number): number =>
    Math.round(x * (1 - ratio) + y * ratio);
  const toHex = (n: number): string => n.toString(16).padStart(2, '0');
  return `#${toHex(blend(ar, br))}${toHex(blend(ag, bg))}${toHex(blend(ab, bb))}`;
}
