import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { NEWS_IMAGE_HOSTS } from './src/config/news-image-hosts';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: NEWS_IMAGE_HOSTS.map((hostname) => ({
      protocol: 'https' as const,
      hostname,
      pathname: '/**',
    })),
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        ...(process.env.NODE_ENV === 'production'
          ? [
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000; includeSubDomains',
              },
            ]
          : []),
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
