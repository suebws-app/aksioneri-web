'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

export type ConsentStatus = 'granted' | 'denied' | 'unset';

const STORAGE_KEY = 'aksioneri.consent';

const listeners = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) callback();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', onStorage);
  };
}

function readStatus(): ConsentStatus {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {}
  return 'unset';
}

function getServerSnapshot(): ConsentStatus {
  return 'unset';
}

function persist(next: 'granted' | 'denied' | null): void {
  try {
    if (next === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  for (const listener of listeners) listener();
}

interface ConsentContextValue {
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
  reset: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const status = useSyncExternalStore(subscribe, readStatus, getServerSnapshot);

  const accept = useCallback(() => persist('granted'), []);
  const decline = useCallback(() => persist('denied'), []);
  const reset = useCallback(() => persist(null), []);

  return (
    <ConsentContext.Provider value={{ status, accept, decline, reset }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
