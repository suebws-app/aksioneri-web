import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { NEWS_IMAGE_HOSTS } from './src/config/news-image-hosts';
import { PATHNAMES } from './src/i18n/pathnames';

// Points the plugin at the request config; without this next-intl cannot resolve
// messages on the server.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Fail the build on type errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  // Trailing-slash and non-slash URLs would otherwise both resolve, splitting
  // link equity between two URLs for the same page.
  trailingSlash: false,
  /**
   * The site shipped with an English locale at `/en/*` and those URLs are in
   * Google's index and in every sitemap we have submitted. Removing the locale
   * without this would turn all of them into 404s; a permanent redirect passes
   * the accumulated ranking to the Albanian page instead.
   *
   * One hop, straight to the LOCALISED destination. The old generic
   * `/en/:path*` → `/:path*` rule left the English segment in place
   * (`/en/news/x` → `/news/x`), which next-intl then had to redirect again to
   * `/lajme/x` — and every extra hop leaks link equity and crawl budget. The
   * map is derived from `PATHNAMES` so a new route's redirect cannot drift;
   * static patterns are emitted before dynamic ones (`/en/learn/glossary`
   * must beat `/en/learn/:slug`), and a final catch-all keeps any unmapped
   * `/en/*` URL from 404ing.
   */
  async redirects() {
    const entries = Object.entries(PATHNAMES) as [
      string,
      string | { sq: string },
    ][];

    const toRule = ([canonical, mapping]: (typeof entries)[number]) => {
      const localized = typeof mapping === 'string' ? mapping : mapping.sq;
      // `[slug]` → `:slug`, the syntax `redirects()` route-matching expects.
      const pattern = (path: string) => path.replace(/\[([^\]]+)\]/g, ':$1');
      return {
        source: `/en${canonical === '/' ? '' : pattern(canonical)}`,
        destination: pattern(localized),
        permanent: true,
      };
    };

    return [
      // Specific before dynamic, dynamic before the catch-all — Next.js
      // applies the first matching rule.
      ...entries.filter(([canonical]) => !canonical.includes('[')).map(toRule),
      ...entries.filter(([canonical]) => canonical.includes('[')).map(toRule),
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ];
  },
  images: {
    // Every allowed host lives in `NEWS_IMAGE_HOSTS`, which the API's
    // `news_sources` seed shares by contract — see the file for the sync
    // rule. Anything not in the list falls back to the branded placeholder
    // rather than reaching the optimiser.
    remotePatterns: NEWS_IMAGE_HOSTS.map((hostname) => ({
      protocol: 'https' as const,
      hostname,
      pathname: '/**',
    })),
  },
};

export default withNextIntl(nextConfig);
