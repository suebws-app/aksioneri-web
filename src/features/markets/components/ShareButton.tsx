'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const t = useTranslations('company.header');
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const flashCopied = () => {
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleClick = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        flashCopied();
        return;
      } catch {
        // fall through to legacy path
      }
    }

    if (legacyCopy(url)) flashCopied();
  };

  const label = copied ? t('shareCopied') : t('share');

  return (
    <button
      type="button"
      onClick={handleClick}
      className="border-line-strong text-ink-muted hover:border-accent hover:text-accent rounded-sm border bg-white px-4.5 py-2.5 text-[14px] transition-colors"
      aria-label={label}
      aria-live="polite"
    >
      {label}
    </button>
  );
}

function legacyCopy(text: string): boolean {
  if (typeof document === 'undefined') return false;
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(el);
  }
}
