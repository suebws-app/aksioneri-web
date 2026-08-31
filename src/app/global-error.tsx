'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void (async () => {
      try {
        const Sentry = await import('@sentry/browser');
        Sentry.captureException(error);
      } catch {}
    })();
  }, [error]);

  const isEnglish =
    typeof document !== 'undefined' &&
    document.documentElement.lang.startsWith('en');

  return (
    <html lang={isEnglish ? 'en' : 'sq'}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">
          {isEnglish ? 'Something went wrong' : 'Diçka shkoi keq'}
        </h1>
        {error.digest ? (
          <p className="text-sm opacity-60">
            {isEnglish ? 'Code' : 'Kodi'}: {error.digest}
          </p>
        ) : null}
        <button onClick={reset} className="underline">
          {isEnglish ? 'Try again' : 'Provo përsëri'}
        </button>
      </body>
    </html>
  );
}
