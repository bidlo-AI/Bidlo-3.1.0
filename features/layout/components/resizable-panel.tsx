'use client';

import { useCallback, useEffect, useRef } from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  storageKey: string;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
}

export function ResizablePanel({
  children,
  storageKey,
  defaultWidth = 320,
  minWidth = 250,
  maxWidth = 800,
  className = '',
}: ResizablePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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
      const startX = e.clientX;
      const startWidth = panelRef.current.getBoundingClientRect().width;

      const onMove = (moveEvt: PointerEvent) => {
        let w = startWidth + (startX - moveEvt.clientX); // drag left ➜ wider
        w = Math.max(minWidth, Math.min(maxWidth, w));
        panelRef.current!.style.width = `${w}px`; // ⚡ DOM mut. only
      };

      const onUp = () => {
        /* persist once – no noisy writes while dragging */
        const final = panelRef.current!.getBoundingClientRect().width;
        window.localStorage.setItem(storageKey, `${final}`);
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    },
    [maxWidth, minWidth, storageKey],
  );

  /* -------------------------------------------------------------- */
  /* double-click ➜ reset to default width                           */
  /* -------------------------------------------------------------- */
  const resetWidth = useCallback(() => {
    if (!panelRef.current) return;
    panelRef.current.style.width = `${defaultWidth}px`;
    // Clear persisted custom width so next load uses the default
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }
  }, [defaultWidth, storageKey]);

  /* -------------------------------------------------------------- */
  /* set initial width on mount                                      */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.style.width = `${readInitialWidth()}px`;
    }
  }, [readInitialWidth]);

  /* -------------------------------------------------------------- */
  /* render                                                          */
  /* -------------------------------------------------------------- */
  return (
    <>
      <div
        onPointerDown={startDrag}
        onDoubleClick={resetWidth}
        className="after:w-3 after:cursor-col-resize after:h-full bg-border z-10 focus-visible:ring-ring duration-50 transition-colors hover:bg-foreground/30 relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
      />
      <div
        ref={panelRef}
        style={{ width: defaultWidth }}
        className={`flex flex-col h-screen overflow-hidden ${className}`}
      >
        {children}
      </div>
    </>
  );
}
