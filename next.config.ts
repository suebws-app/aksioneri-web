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
};

export default withNextIntl(nextConfig);
