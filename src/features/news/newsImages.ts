import type { NewsCategory } from './newsTypes';

/**
 * Fallback assets for the placeholder layer.
 *
 * When an article has no `imageUrl` — the RSS enclosure didn't include one
 * and no `og:image` was found on the source page — the picker deterministically
 * chooses an entry from this pool for the article's category. With an empty
 * pool the picker falls through to the branded placeholder, which is fine —
 * the site is legible either way.
 *
 * How to populate: drop royalty-free image files into
 * `public/news-images/<category>/` and list their public paths here (e.g.
 * `/news-images/macro/trading-floor.jpg`). Unsplash, Pexels and Pixabay are
 * all licensed for commercial use without attribution; check each file's
 * licence before adding it. External URLs work too, but a self-hosted file
 * survives the source going away.
 *
 * Suggestions for what fits each desk (all commercial-safe on Unsplash /
 * Pexels): trading-floor and skyline photos for `stocks`; central-bank
 * façades and government buildings for `macro`; European city cityscapes
 * for `europe`; abstract circuit / neon imagery for `crypto`; oil rigs,
 * gold bars, wheat fields for `commodities`; port cranes, factories,
 * shopping streets for `economy`.
 */
export const NEWS_IMAGE_POOL: Record<NewsCategory, string[]> = {
  macro: [],
  stocks: [],
  europe: [],
  crypto: [],
  commodities: [],
  economy: [],
};

/**
 * Category-tinted palette for the branded fallback.
 *
 * Muted intentionally — the design system is editorial and cool, and a
 * saturated placeholder next to real photography would read as an ad. Each
 * pair uses a warm-neutral background with a same-family darker ink; the
 * label sits centered in the ink colour.
 */
export const CATEGORY_TINTS: Record<
  NewsCategory,
  { background: string; foreground: string }
> = {
  macro: { background: '#e8e3d6', foreground: '#524632' },
  stocks: { background: '#dfe8e0', foreground: '#22412f' },
  europe: { background: '#dee5ee', foreground: '#14385e' },
  crypto: { background: '#ebdee5', foreground: '#5b2b47' },
  commodities: { background: '#ede4d0', foreground: '#5a3a1a' },
  economy: { background: '#e5e5e0', foreground: '#2e343c' },
};

/**
 * Pick a pool image for `id`, or `null` when the pool is empty.
 *
 * Deterministic: same article id always returns the same URL, so
 * re-rendering the same card never swaps the image. A tiny sum-of-charcodes
 * hash is enough — pools are at most a few dozen entries, and there is no
 * adversary tuning ids to skew the distribution.
 */
export function pickPoolImage(
  category: NewsCategory,
  id: string,
): string | null {
  const pool = NEWS_IMAGE_POOL[category];
  if (!pool || pool.length === 0) return null;

  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i)) | 0;
  }
  return pool[Math.abs(hash) % pool.length] ?? null;
}
