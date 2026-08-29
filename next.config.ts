import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { NEWS_IMAGE_HOSTS } from './src/config/news-image-hosts';
import { PATHNAMES } from './src/i18n/pathnames';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    const entries = Object.entries(PATHNAMES) as [
      string,
      string | { sq: string },
    ][];

    const toRule = ([canonical, mapping]: (typeof entries)[number]) => {
      const localized = typeof mapping === 'string' ? mapping : mapping.sq;
      const pattern = (path: string) => path.replace(/\[([^\]]+)\]/g, ':$1');
      return {
        source: `/en${canonical === '/' ? '' : pattern(canonical)}`,
        destination: pattern(localized),
        permanent: true,
      };
    };

    return [
      ...entries.filter(([canonical]) => !canonical.includes('[')).map(toRule),
      ...entries.filter(([canonical]) => canonical.includes('[')).map(toRule),
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ];
  },
  images: {
    remotePatterns: NEWS_IMAGE_HOSTS.map((hostname) => ({
      protocol: 'https' as const,
      hostname,
      pathname: '/**',
    })),
  },
};

export default withNextIntl(nextConfig);
