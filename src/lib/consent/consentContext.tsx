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

/**
 * External-store bridge to localStorage. Same-tab writes go through
 * `persist()` which explicitly notifies subscribers; cross-tab writes
 * arrive via the browser's built-in `storage` event.
 *
 * Kept as module state rather than provider state so the "no setState in
 * effect" React 19 lint rule is satisfied and every mount reads the
 * current value synchronously.
 */
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
  } catch {
    // Private-mode, disabled storage, or a browser policy block — treat
    // as unset so the banner reappears next mount, which is the right
    // fallback (no persistent record = no persistent consent).
  }
  return 'unset';
}

function getServerSnapshot(): ConsentStatus {
  return 'unset';
}

function persist(next: 'granted' | 'denied' | null): void {
  try {
    if (next === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore — see above
  }
  for (const listener of listeners) listener();
}

interface ConsentContextValue {
  status: ConsentStatus;
  accept: () => void;
  decline: () => void;
  /** Resets consent so the banner reappears — used by the "revoke" link. */
  reset: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Consent state for optional cookies (Sentry error tracking + PostHog
 * analytics). Necessary cookies — session, CSRF, learn progress — are
 * exempt and never gated.
 */
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
