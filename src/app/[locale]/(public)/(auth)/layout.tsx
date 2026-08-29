import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NavSearch } from '@/features/search';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-paper flex min-h-screen flex-col">
      <SiteHeader
        searchSlot={<NavSearch />}
        mobileSearchSlot={<NavSearch variant="mobile" />}
      />
      <main
        id="main-content"
        className="flex flex-1 items-start justify-center"
      >
        <div className="page-container w-full py-16 md:py-24">
          <div className="mx-auto flex w-full max-w-sm flex-col">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
