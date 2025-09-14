'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  storageKey: string;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
  /** Which side the panel is anchored to; affects drag direction and handle placement. */
  side?: 'left' | 'right';
}

export function ResizablePanel({
  children,
  storageKey,
  defaultWidth = 320,
  minWidth = 250,
  maxWidth = 800,
  className = '',
  side = 'left',
}: ResizablePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Track an in-flight rAF, active drag cleanup, and prior selection state.
  const rafIdRef = useRef<number | null>(null);
  const activeCleanupRef = useRef<(() => void) | null>(null);
  const prevUserSelectRef = useRef<string | null>(null);
  const lastAppliedWidthRef = useRef<number | null>(null);

  // (moved narrowing helper inside the drag handler to keep hooks stable)

  /** Read once; never causes a paint on mount. */
  const readInitialWidth = useCallback((): number => {
    if (typeof window === 'undefined') return defaultWidth;
    const stored = window.localStorage.getItem(storageKey);
    const val = stored ? parseInt(stored, 10) : NaN;
    return Number.isFinite(val) ? val : defaultWidth;
  }, [defaultWidth, storageKey]);

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
    [maxWidth, minWidth, storageKey, side],
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
  }, [defaultWidth, storageKey]);

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
    };
  }, [readInitialWidth]);

  /* -------------------------------------------------------------- */
  /* render                                                          */
  /* -------------------------------------------------------------- */
  // Build handle and panel nodes so we can easily swap order based on `side`.
  const handle = (
    <div
      onPointerDown={startDrag}
      onDoubleClick={resetWidth}
      className="after:w-3 after:cursor-col-resize after:h-full bg-border z-10 focus-visible:ring-ring duration-50 transition-colors hover:bg-foreground/30 relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90 touch-none"
    />
  );

  const panel = (
    <div
      ref={panelRef}
      style={{ width: defaultWidth }}
      className={`flex flex-col h-screen overflow-hidden ${className}`}
    >
      {children}
    </div>
  );

  return (
    <>
      {side === 'left' ? (
        <>
          {handle}
          {panel}
        </>
      ) : (
        <>
          {panel}
          {handle}
        </>
      )}
    </>
  );
}
