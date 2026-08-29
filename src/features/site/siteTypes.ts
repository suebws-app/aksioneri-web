export interface StaticSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
  paragraphsAfterList?: string[];
}

export interface StaticPageContent {
  slug: 'about' | 'contact' | 'privacy' | 'terms';
  title: string;
  intro: string;
  sections: StaticSection[];
  email?: string;
  updatedAt?: string;
}
