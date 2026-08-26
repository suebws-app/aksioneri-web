/**
 * Publisher CDN hostnames whose `og:image` URLs the API returns and this app
 * optimises through `next/image`. A permissive `remotePatterns` would turn
 * the optimiser into an open image proxy, so every host is listed explicitly.
 *
 * **Sync rule**: this list is the twin of `NEWS_SOURCES` in
 * `aksioneri-api/src/database/seed/seed-data.ts`. Adding a new feed there
 * whose publisher serves images from a new host means adding that host here
 * — otherwise every `og:image` from that source fails to render. Kept in
 * this shared file (rather than inlined in `next.config.ts`) so the drift
 * is visible from feature code and the sync check is a single diff.
 *
 * Suffix wildcards are used only where the publisher's CDN uses per-story
 * subdomains.
 */
export const NEWS_IMAGE_HOSTS: readonly string[] = [
  // U.S. federal government (public domain)
  'www.federalreserve.gov',
  'www.sec.gov',
  'www.bls.gov',
  'www.bea.gov',
  'apps.bea.gov',

  // European Union / European institutions
  'www.ecb.europa.eu',
  'www.eba.europa.eu',
  'ec.europa.eu',

  // UK / other central banks
  'www.bankofengland.co.uk',
  'www.bankofcanada.ca',
  'www.rba.gov.au',
  'www.boj.or.jp',

  // International organisations
  'www.imf.org',

  // Pexels — API fallback for stories without a per-article image.
  'images.pexels.com',

  // Legacy — kept for backfilled Investing.com stories that still hold a CDN
  // URL from before the GREEN-source pivot.
  'content-media.investing.com',
];
