import Link from 'next/link';

/**
 * Root 404. Rendered when no locale segment matched, so it cannot use
 * next-intl's translations — the locale is unknown at this point.
 */
export default function NotFound() {
  return (
    <html lang="sq">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">404</h1>
        <Link href="/" className="underline">
          Kthehu në ballinë
        </Link>
      </body>
    </html>
  );
}
