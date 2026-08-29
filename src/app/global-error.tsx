'use client';

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
