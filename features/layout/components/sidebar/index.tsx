'use client';
import { ResizablePanel } from '../resizable-panel';
import { useSidebar } from '@/features/layout/components/sidebar/useSidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Pin, PinOff } from 'lucide-react';

const STORAGE_KEY = 'sidebarWidthPx';

export const Sidebar = () => {
  const { isOpen, isPinned, isDesktop } = useSidebar();

  /* Overlay mode: shown when open. On desktop it shows only if not pinned. */
  const showOverlay = isOpen && (!isDesktop || !isPinned);

  return (
    <>
      {/* Pinned (fixed) mode: takes layout space on desktop only. */}
      {isPinned && (
        <div className={cn('hidden md:block')}>
          <ResizablePanel
            side="right"
            minWidth={50}
            maxWidth={400}
            defaultWidth={200}
            className={cn('bg-muted border-l')}
            storageKey={STORAGE_KEY}
          >
            <SidebarChrome pinned />
          </ResizablePanel>
        </div>
      )}

      {/* Collapsible overlay: used on mobile, and on desktop when not pinned. */}
      {showOverlay && (
        <div className={cn('fixed inset-y-0 left-0 z-30')}>
          <ResizablePanel
            side="right"
            minWidth={50}
            maxWidth={400}
            defaultWidth={200}
            className={cn('bg-muted border-l shadow-lg')}
            storageKey={STORAGE_KEY}
          >
            <SidebarChrome pinned={false} />
          </ResizablePanel>
        </div>
      )}
    </>
  );
};

const SidebarChrome = ({ pinned }: { pinned: boolean }) => {
  const { isDesktop, isPinned, togglePin, close } = useSidebar();

  return (
    <div className="h-full flex flex-col">
      {/* Header area with pin/unpin (desktop only) */}
      {isDesktop && (
        <div className="flex items-center justify-between px-2 py-1 border-b">
          <div className="text-muted-foreground-opaque text-xs">Sidebar</div>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground-opaque size-7"
            onMouseDown={togglePin}
            aria-pressed={isPinned}
            aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            {pinned ? <PinOff className="size-4" /> : <Pin className="size-4" />}
          </Button>
        </div>
      )}
      {/* Content placeholder */}
      <div className="flex-1" />
      {/* Footer with close in overlay mode */}
      {!pinned && (
        <div className="border-t px-2 py-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground-opaque" onMouseDown={close}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};
