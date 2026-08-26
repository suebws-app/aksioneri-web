import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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
    /**
     * Wire art is served from the publisher's CDN. Every allowed host must be
     * listed explicitly — a permissive pattern would turn the optimiser into
     * an open image proxy. Keep this in sync with the seeded `news_sources`
     * table: adding a new feed means adding its article-page host here, or
     * every `og:image` from that publisher will fail to render.
     *
     * Suffix wildcards are used only where the publisher's CDN uses per-story
     * subdomains (rare for the current sources — added defensively).
     */
    remotePatterns: [
      // U.S. federal government (public domain)
      {
        protocol: 'https',
        hostname: 'www.federalreserve.gov',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'www.sec.gov', pathname: '/**' },
      { protocol: 'https', hostname: 'www.bls.gov', pathname: '/**' },
      { protocol: 'https', hostname: 'www.bea.gov', pathname: '/**' },
      { protocol: 'https', hostname: 'apps.bea.gov', pathname: '/**' },

      // European Union / European institutions
      { protocol: 'https', hostname: 'www.ecb.europa.eu', pathname: '/**' },
      { protocol: 'https', hostname: 'www.eba.europa.eu', pathname: '/**' },
      { protocol: 'https', hostname: 'ec.europa.eu', pathname: '/**' },

      // UK / other central banks
      {
        protocol: 'https',
        hostname: 'www.bankofengland.co.uk',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'www.bankofcanada.ca', pathname: '/**' },
      { protocol: 'https', hostname: 'www.rba.gov.au', pathname: '/**' },
      { protocol: 'https', hostname: 'www.boj.or.jp', pathname: '/**' },

      // International organisations
      { protocol: 'https', hostname: 'www.imf.org', pathname: '/**' },

      // Pexels — used by the API's fallback layer for articles the source
      // publisher provided no per-article image for. Every Pexels photo is
      // served from this one CDN.
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },

      // Legacy — kept for backfilled Investing.com stories that still hold
      // a CDN URL from before the GREEN-source pivot.
      {
        protocol: 'https',
        hostname: 'content-media.investing.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
