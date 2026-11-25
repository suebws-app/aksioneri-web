import { BrandMark } from '@/components/BrandMark';

// Coming-soon page. Only used when COMING_SOON mode is on (next.config.ts).
export default function ComingSoonPage() {
  return (
    <main className="bg-paper flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <BrandMark size="header" ariaLabel="Aksioneri" className="text-ink" />
      <h1
        className="text-ink mt-12 text-4xl sm:text-5xl"
        style={{ fontFamily: 'var(--font-newsreader), serif' }}
      >
        Së shpejti
      </h1>
      <p
        className="text-ink-muted mt-4 max-w-md text-lg"
        style={{ fontFamily: 'var(--font-plex-sans), sans-serif' }}
      >
        Po punojmë për diçka të re. Kthehuni së shpejti.
      </p>
    </main>
  );
}
