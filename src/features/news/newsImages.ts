import type { NewsCategory } from './newsTypes';

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
