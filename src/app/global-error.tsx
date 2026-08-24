'use client';

/**
 * Catches errors thrown by the root layout itself. It replaces the whole
 * document, so it must render its own <html> and <body> and cannot rely on any
 * provider or translation context.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="sq">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Diçka shkoi keq</h1>
        {/* The digest is the only safe identifier to show — never error.message. */}
        {error.digest ? (
          <p className="text-sm opacity-60">Kodi: {error.digest}</p>
        ) : null}
        <button onClick={reset} className="underline">
          Provo përsëri
        </button>
      </body>
    </html>
  );
}
