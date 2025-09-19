'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';
import { ResizeHandle } from './handle';
import { cn } from '@/lib/utils';

interface ResizablePanelProps {
  children: React.ReactNode;
  storageKey: string;
  /** Width used for reset (double-click). Defaults to 320px. */
  defaultWidth?: number;
  /** Initial width used on first render (or when no stored width exists). */
  startingWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
  /** Which side the panel is anchored to; affects drag direction and handle placement. */
  side?: 'left' | 'right';
  /** Optional debounced callback during drag; invoked with the current width (px). */
  onWidthChange?: (width: number) => void;
  /** Called once when the user finishes a drag (mouse/touch up) with the final width. */
  onWidthChangeEnd?: (width: number) => void;
  /** Called when the user double-clicks to reset the width back to default. */
  onWidthReset?: (width: number) => void;
  /** Debounce delay (ms) used for onWidthChange; defaults to 400ms. */
  debounceMs?: number;
}

export function ResizablePanel({
  children,
  storageKey,
  defaultWidth = 320,
  startingWidth,
  minWidth = 250,
  maxWidth = 800,
  className = '',
  side = 'left',
  onWidthChange,
  onWidthChangeEnd,
  onWidthReset,
  debounceMs = 400,
}: ResizablePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Track an in-flight rAF, active drag cleanup, and prior selection state.
  const rafIdRef = useRef<number | null>(null);
  const activeCleanupRef = useRef<(() => void) | null>(null);
  const prevUserSelectRef = useRef<string | null>(null);
  const lastAppliedWidthRef = useRef<number | null>(null);
  const debounceIdRef = useRef<number | null>(null);

  // (moved narrowing helper inside the drag handler to keep hooks stable)

  /** Read once; never causes a paint on mount. */
  const readInitialWidth = useCallback((): number => {
    // Fallback to startingWidth first; then to defaultWidth.
    const fallback = typeof startingWidth === 'number' ? startingWidth : defaultWidth;
    if (typeof window === 'undefined') return fallback;
    const stored = window.localStorage.getItem(storageKey);
    const val = stored ? parseInt(stored, 10) : NaN;
    return Number.isFinite(val) ? val : fallback;
  }, [defaultWidth, startingWidth, storageKey]);

  /* -------------------------------------------------------------- */
  /* pointer-drag handler                                            */
  /* -------------------------------------------------------------- */
  const startDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!panelRef.current) return;

      e.preventDefault();
      // Keep pointer events routed to the handle even if the pointer leaves it.
      const pointerTarget = e.currentTarget as HTMLDivElement;
      const pointerId = e.pointerId;
      try {
        pointerTarget.setPointerCapture(pointerId);
      } catch {}

      // Improve UX: avoid accidental text selection while dragging.
      prevUserSelectRef.current = document.body.style.userSelect;
      document.body.style.userSelect = 'none';
      // Hint the browser that width will change while dragging.
      panelRef.current.style.willChange = 'width';

      const startX = e.clientX;
      const startWidth = panelRef.current.getBoundingClientRect().width;
      let frameRequested = false;
      let pendingWidth = startWidth;

      // Narrowing helper for PointerEvent.getCoalescedEvents without using `any`.
      type PointerEventWithCoalesced = PointerEvent & {
        getCoalescedEvents: () => PointerEvent[];
      };
      const hasCoalescedEvents = (evt: PointerEvent): evt is PointerEventWithCoalesced =>
        typeof (evt as Partial<PointerEventWithCoalesced>).getCoalescedEvents === 'function';

      const onMove = (moveEvt: PointerEvent) => {
        // Compute width based on which side the panel is anchored to.
        // left: dragging left increases width (deltaX negative)
        // right: dragging right increases width (deltaX positive)
        // Prefer coalesced pointer events for smoother, lower-overhead handling.
        const coalesced = hasCoalescedEvents(moveEvt) ? moveEvt.getCoalescedEvents() : undefined;
        const latestEvent = coalesced && coalesced.length ? coalesced[coalesced.length - 1] : moveEvt;
        const deltaX = latestEvent.clientX - startX;
        let w = side === 'left' ? startWidth - deltaX : startWidth + deltaX;
        w = Math.max(minWidth, Math.min(maxWidth, w));
        pendingWidth = w;
        // Schedule debounced width-change notification outside rAF to reduce timer churn.
        if (onWidthChange) {
          if (debounceIdRef.current !== null) {
            window.clearTimeout(debounceIdRef.current);
          }
          debounceIdRef.current = window.setTimeout(() => {
            debounceIdRef.current = null;
            onWidthChange(pendingWidth);
          }, debounceMs);
        }
        if (!frameRequested) {
          frameRequested = true;
          rafIdRef.current = window.requestAnimationFrame(() => {
            frameRequested = false;
            if (panelRef.current) {
              // Avoid redundant writes if value hasn't changed.
              if (lastAppliedWidthRef.current !== pendingWidth) {
                panelRef.current.style.width = `${pendingWidth}px`; // ⚡ batched via rAF
                lastAppliedWidthRef.current = pendingWidth;
              }
            }
          });
        }
      };

      const teardown = () => {
        // Listeners were attached to the handle; remove them there.
        pointerTarget.removeEventListener('pointermove', onMove);
        pointerTarget.removeEventListener('pointerup', onUp);
        pointerTarget.removeEventListener('pointercancel', onCancel);
        try {
          pointerTarget.releasePointerCapture(pointerId);
        } catch {}
        if (rafIdRef.current !== null) {
          window.cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        if (prevUserSelectRef.current !== null) {
          document.body.style.userSelect = prevUserSelectRef.current;
          prevUserSelectRef.current = null;
        }
        if (panelRef.current) {
          panelRef.current.style.willChange = '';
        }
        activeCleanupRef.current = null;
      };

      const onUp = () => {
        /* persist once – no noisy writes while dragging */
        if (panelRef.current) {
          const final = lastAppliedWidthRef.current ?? panelRef.current.getBoundingClientRect().width;
          window.localStorage.setItem(storageKey, `${final}`);
          // Flush any pending debounced call and emit final once.
          if (debounceIdRef.current !== null) {
            window.clearTimeout(debounceIdRef.current);
            debounceIdRef.current = null;
          }
          if (onWidthChangeEnd) onWidthChangeEnd(final);
        }
        teardown();
      };

      const onCancel = () => {
        // Do not persist on cancel; just cleanup.
        teardown();
      };

      // With pointer capture, events will continue to fire on the handle itself.
      pointerTarget.addEventListener('pointermove', onMove, { passive: true });
      pointerTarget.addEventListener('pointerup', onUp, { passive: true });
      pointerTarget.addEventListener('pointercancel', onCancel, { passive: true });
      activeCleanupRef.current = teardown;
    },
    [debounceMs, maxWidth, minWidth, onWidthChange, onWidthChangeEnd, side, storageKey],
  );

  /* -------------------------------------------------------------- */
  /* double-click ➜ reset to default width                           */
  /* -------------------------------------------------------------- */
  const resetWidth = useCallback(() => {
    if (!panelRef.current) return;
    panelRef.current.style.width = `${defaultWidth}px`;
    lastAppliedWidthRef.current = defaultWidth;
    // Clear persisted custom width so next load uses the default
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }
    // Clear pending debounce and notify reset
    if (debounceIdRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(debounceIdRef.current);
      debounceIdRef.current = null;
    }
    if (onWidthReset) onWidthReset(defaultWidth);
    if (onWidthChangeEnd) onWidthChangeEnd(defaultWidth);
  }, [defaultWidth, storageKey, onWidthReset, onWidthChangeEnd]);

  /* -------------------------------------------------------------- */
  /* set initial width on mount                                      */
  /* -------------------------------------------------------------- */
  useLayoutEffect(() => {
    if (panelRef.current) {
      const initial = readInitialWidth();
      panelRef.current.style.width = `${initial}px`;
      lastAppliedWidthRef.current = initial;
    }
    // Ensure any active drag listeners/raf are cleaned if we unmount mid-drag.
    return () => {
      if (activeCleanupRef.current) {
        activeCleanupRef.current();
      }
      if (debounceIdRef.current !== null && typeof window !== 'undefined') {
        window.clearTimeout(debounceIdRef.current);
        debounceIdRef.current = null;
      }
    };
  }, [readInitialWidth]);

  /* -------------------------------------------------------------- */
  /* render                                                          */
  /* -------------------------------------------------------------- */
  return (
    <div
      ref={panelRef}
      style={{ width: typeof startingWidth === 'number' ? startingWidth : defaultWidth }}
      className={cn(
        'overflow-hidden grid size-full',
        side === 'left' ? 'grid-cols-[auto_1fr]' : 'grid-cols-[1fr_auto]',
        className,
      )}
    >
      {side === 'left' ? <ResizeHandle onPointerDown={startDrag} onDoubleClick={resetWidth} /> : null}
      <div className="overflow-hidden">{children}</div>
      {side === 'right' ? <ResizeHandle onPointerDown={startDrag} onDoubleClick={resetWidth} /> : null}
    </div>
  );
}
