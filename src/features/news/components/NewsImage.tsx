import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';
import { CATEGORY_TINTS } from '../newsImages';
import type { NewsCategory } from '../newsTypes';

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

  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  const abs = Math.abs(hash);

  const angle = (abs % 12) * 30;

  const points = Array.from({ length: 7 }, (_, i) => {
    const bits = (abs >> (i * 3)) & 0x1f;
    const y = 70 - bits * 1.6;
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
