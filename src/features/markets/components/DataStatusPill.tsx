'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { marketsSocket } from '@/lib/websockets/marketsSocket';

export function DataStatusPill({ symbol }: { symbol: string }) {
  const t = useTranslations('markets.status');
  const [connectionState, setConnectionState] = useState<
    'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected'
  >('idle');
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    const offState = marketsSocket.onStateChange(setConnectionState);
    const offStale = marketsSocket.onStaleChange(symbol, setIsStale);
    return () => {
      offState();
      offStale();
    };
  }, [symbol]);

  const label = statusLabel(connectionState, isStale);
  if (!label) return null;

  const tone = label.tone;
  const message = t(label.key);

  return (
    <span
      className={
        tone === 'warn'
          ? 'bg-warning/10 text-warning border-warning/30 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-[0.06em] uppercase'
          : 'bg-danger/10 text-danger border-danger/30 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-[0.06em] uppercase'
      }
      role="status"
      aria-live="polite"
    >
      {message}
    </span>
  );
}

interface Label {
  key: string;
  tone: 'warn' | 'error';
}

function statusLabel(
  state: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected',
  isStale: boolean,
): Label | null {
  if (state === 'connecting') return { key: 'connecting', tone: 'warn' };
  if (state === 'reconnecting') return { key: 'reconnecting', tone: 'warn' };
  if (state === 'disconnected') return { key: 'offline', tone: 'error' };
  if (state === 'connected' && isStale) {
    return { key: 'delayed', tone: 'warn' };
  }
  return null;
}
