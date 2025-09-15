'use client';

import { ResizablePanel } from '../../resizable-panel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Pin, PinOff } from 'lucide-react';
import { useLayout } from '@/features/layout/components/sidebar/providers/SidebarProvider';
import { Show } from '@legendapp/state/react';

const STORAGE_KEY = 'sidebarWidthPx';

export const SidebarWrapper = ({ startingWidth, children }: { startingWidth?: number; children: React.ReactNode }) => {
  const setWidth = useMutation(api.users.setLayoutWidth);
  const layout$ = useLayout();

  //handlers
  const handleWdithChange = (w: number) => setWidth({ target: 'sidebar_width', width: Math.round(w) });

  // Toggle sidebar visibility (pin/unpin)
  const handleUnpin = () => layout$.setSidebar(true);
  const handlePin = () => layout$.setSidebar(false);

  // Pinned (visible): standard resizable sidebar with an unpin button
  return (
    <Show
      if={layout$.sidebar_hidden}
      else={
        <ResizablePanel
          side="right"
          minWidth={50}
          maxWidth={400}
          defaultWidth={200}
          startingWidth={startingWidth}
          className="bg-muted relative"
          storageKey={STORAGE_KEY}
          onWidthChangeEnd={handleWdithChange}
          onWidthReset={handleWdithChange}
        >
          {/* Unpin button (desktop only) */}
          <div className="absolute top-2 right-2 z-20 hidden md:block">
            <Button size="icon" variant="ghost" onClick={handleUnpin} aria-label="Unpin sidebar">
              <PinOff className="size-4" />
            </Button>
          </div>
          {children}
        </ResizablePanel>
      }
    >
      <div className="hidden md:block">
        {/* Hover zone + overlay container */}
        <div className="fixed inset-y-0 left-0 z-40 group">
          {/* Hover zone: narrow strip to trigger reveal */}
          <div className="absolute inset-y-0 left-0 w-2" aria-hidden />

          {/* Overlay panel: slides in on hover */}
          <div className="absolute py-10 flex inset-y-0 left-0 -translate-x-full pr-2 group-hover:translate-x-0 transition-transform duration-150 ease-out">
            <ResizablePanel
              side="right"
              minWidth={50}
              maxWidth={400}
              defaultWidth={200}
              startingWidth={startingWidth}
              className="bg-muted shadow-sm relative rounded-r-2xl border-y"
              storageKey={STORAGE_KEY}
              onWidthChangeEnd={handleWdithChange}
              onWidthReset={handleWdithChange}
            >
              {/* Pin button visible only when unpinned (overlay) */}
              <div className="absolute top-2 right-2  z-20 hidden md:block">
                <Button size="icon" variant="ghost" onClick={handlePin} aria-label="Pin sidebar">
                  <Pin className="size-4" />
                </Button>
              </div>
              {children}
            </ResizablePanel>
          </div>
        </div>
      </div>
    </Show>
  );
};
