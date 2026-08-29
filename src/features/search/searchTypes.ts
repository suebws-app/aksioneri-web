export type SearchKind =
  'page' | 'lesson' | 'term' | 'article' | 'event' | 'market';

export interface SearchEntry {
  kind: SearchKind;
  title: string;
  subtitle?: string;
  context?: string;
  href: string;
  keywords?: string[];
}
