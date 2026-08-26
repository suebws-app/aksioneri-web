import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { NEWS_IMAGE_HOSTS } from './src/config/news-image-hosts';

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
   */
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
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
