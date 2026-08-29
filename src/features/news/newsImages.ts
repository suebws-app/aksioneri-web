import type { NewsCategory } from './newsTypes';

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
