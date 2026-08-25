'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export interface MobileNavItem {
  /** Unlocalised path; `@/i18n/navigation` adds the locale prefix. */
  href: string;
  label: string;
  current: boolean;
}

/**
 * The narrow-screen half of the site nav.
 *
 * Four section links, a wordmark and a search box do not fit across 375px —
 * the header used to push the page 110px wider than the viewport, so every
 * page on a phone scrolled sideways. Below `sm` the links collapse behind this
 * button and open as a drawer from the right.
 *
 * The drawer sits *under* the header — the header is sticky on phones and
 * keeps its own stacking context above it — so the wordmark and the close
 * button stay put while the panel slides across the page beneath them.
 */
export function MobileNav({ items }: { items: MobileNavItem[] }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  // Which page the panel was opened on, rather than a plain boolean: the
  // header survives navigation, so the panel has to close when the route
  // changes. Deriving it from the pathname closes it on link taps and on the
  // back button alike, without an effect that writes state on every render.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedOn(null);
    };

    // The panel covers the viewport, so the page behind it must not scroll
    // under the reader's finger.
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      {/* Above the panel, so the same button closes what it opened. */}
      <button
        type="button"
        onClick={() => setOpenedOn(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="site-nav-mobile"
        aria-label={open ? t('closeMenu') : t('openMenu')}
        className="text-ink relative z-50 -mr-2 flex size-10 items-center justify-center"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <>
              <path d="M5 5l12 12" />
              <path d="M17 5L5 17" />
            </>
          ) : (
            <>
              <path d="M3 6h16" />
              <path d="M3 11h16" />
              <path d="M3 16h16" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <>
          {/* Dimming the page underneath does the work a full-screen panel
              used to: nothing behind the drawer invites a tap. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => setOpenedOn(null)}
            className="bg-ink/25 animate-scrim-in fixed inset-0 z-30"
          />

          <nav
            id="site-nav-mobile"
            aria-label={t('primaryLabel')}
            className="bg-paper border-line animate-drawer-in fixed inset-y-0 right-0 z-40 flex w-[min(84vw,340px)] flex-col overflow-y-auto border-l pt-[72px] shadow-xl"
          >
            <ul className="page-container flex flex-col">
              {items.map((item, index) => (
                <li
                  key={item.href}
                  className="border-line-soft animate-panel-item-in border-b"
                  // Each row follows the one above it, so the list reads
                  // top-down instead of landing all at once.
                  style={{ animationDelay: `${String(90 + index * 35)}ms` }}
                >
                  <Link
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={
                      item.current
                        ? 'text-ink block py-4 font-serif text-[23px]'
                        : 'text-ink-muted block py-4 font-serif text-[23px]'
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
