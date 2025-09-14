'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryState, parseAsBoolean } from 'nuqs';

/**
 * Central hook for Sidebar state, backed by URL query params via Nuqs.
 * - `s`: open/closed state for collapsible overlay
 * - `sp`: pinned (fixed) state on desktop
 */
export const useSidebar = () => {
  const [isOpenRaw, setOpen] = useQueryState('s', parseAsBoolean.withDefault(false));
  const [isPinnedRaw, setPinned] = useQueryState('sp', parseAsBoolean.withDefault(false));

  // Track viewport breakpoint for behavior differences.
  const isDesktop = useIsDesktop();

  // Derived booleans for convenience.
  const isOpen = !!isOpenRaw;
  const isPinned = !!isPinnedRaw && isDesktop; // only meaningful on desktop

  // Ensure mobile never remains pinned if user shrinks viewport.
  useEffect(() => {
    if (!isDesktop && isPinnedRaw) setPinned(false);
  }, [isDesktop, isPinnedRaw, setPinned]);

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen((v) => !v), [setOpen]);

  const pin = useCallback(() => {
    setPinned(true);
    // Close overlay when pinning on desktop to avoid double UI.
    setOpen(false);
  }, [setOpen, setPinned]);

  const unpin = useCallback(() => setPinned(false), [setPinned]);
  const togglePin = useCallback(() => setPinned((v) => !v), [setPinned]);

  return useMemo(
    () => ({ isOpen, isPinned, isDesktop, open, close, toggle, pin, unpin, togglePin }),
    [isOpen, isPinned, isDesktop, open, close, toggle, pin, unpin, togglePin],
  );
};

/**
 * Track Tailwind's `md` breakpoint (>=768px).
 */
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = () => setIsDesktop(mql.matches);
    try {
      mql.addEventListener('change', handler);
    } catch {
      // Fallback for older browsers
      mql.addListener(handler);
    }
    handler();
    return () => {
      try {
        mql.removeEventListener('change', handler);
      } catch {
        mql.removeListener(handler);
      }
    };
  }, []);

  return isDesktop;
};
