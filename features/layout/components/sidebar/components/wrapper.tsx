'use client';

import { ResizablePanel } from '../../resizable-panel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { ChevronsLeft } from 'lucide-react';
import { useLayout } from '@/features/layout/components/sidebar/providers/SidebarProvider';
import { useSelector } from '@legendapp/state/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Show } from '@legendapp/state/react';

const STORAGE_KEY = 'sidebarWidthPx';

export const SidebarWrapper = ({ startingWidth, children }: { startingWidth?: number; children: React.ReactNode }) => {
  const setWidth = useMutation(api.users.setLayoutWidth);
  const layout$ = useLayout();
  // Reactive read of hidden state (pinned=false / unpinned=true)
  const isHidden = useSelector(() => layout$.sidebar_hidden.get());
  // When unpinning while hovered, keep the overlay open until mouse leaves.
  const [overlayStickyOpen, setOverlayStickyOpen] = useState(false);

  //handlers
  const handleWdithChange = (w: number) => setWidth({ target: 'sidebar_width', width: Math.round(w) });

  // Toggle sidebar visibility (pin/unpin)
  const handleUnpin = () => {
    layout$.setSidebar(true);
    // Keep overlay open so it doesn't disappear under the cursor
    setOverlayStickyOpen(true);
  };

  // Unified component: switches between pinned and overlay via classes.
  // When unpinned, the wrapper becomes fixed with a hover zone; the panel is translated off-screen until hovered.
  // On unpin while hovered, the group-hover keeps it visible so it doesn't disappear.
  return (
    <div className="hidden md:flex">
      <div className={isHidden ? 'fixed inset-y-0 left-0 z-40 group/sidebar' : 'relative h-screen group/sidebar'}>
        <Show if={layout$.sidebar_hidden}>
          <div className="absolute inset-y-0 left-0 w-3 " aria-hidden />
        </Show>
        <div
          className={cn(
            'flex transition-all duration-200 ease-in-out',
            isHidden
              ? `absolute inset-y-0 left-0 pr-2 py-10 ${overlayStickyOpen ? 'translate-x-0' : '-translate-x-full'} group-hover/sidebar:translate-x-0`
              : 'py-0',
          )}
          onMouseLeave={isHidden ? () => setOverlayStickyOpen(false) : undefined}
        >
          <ResizablePanel
            side="right"
            minWidth={50}
            maxWidth={400}
            defaultWidth={200}
            startingWidth={startingWidth}
            className={cn('bg-muted relative', isHidden ? 'shadow-peek rounded-r-2xl border-y h-full' : 'h-screen ')}
            storageKey={STORAGE_KEY}
            onWidthChangeEnd={handleWdithChange}
            onWidthReset={handleWdithChange}
          >
            <div className="absolute top-2 right-2 z-20 hidden md:block">
              <Show if={() => !layout$.sidebar_hidden.get()}>
                <Button size="icon" variant="ghost" onClick={handleUnpin} aria-label="Unpin sidebar">
                  <ChevronsLeft className="size-5" />
                </Button>
              </Show>
            </div>
            {children}
          </ResizablePanel>
        </div>
      </div>
    </div>
  );
};
