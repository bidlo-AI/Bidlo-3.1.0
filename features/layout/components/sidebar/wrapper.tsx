'use client';

import { ResizablePanel } from '../resizable-panel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const STORAGE_KEY = 'sidebarWidthPx';

export const SidebarWrapper = ({ startingWidth, children }: { startingWidth?: number; children: React.ReactNode }) => {
  const setWidth = useMutation(api.users.setLayoutWidth);

  //handlers
  const handleWdithChange = (w: number) => setWidth({ target: 'sidebar_width', width: Math.round(w) });

  return (
    <ResizablePanel
      side="right"
      minWidth={50}
      maxWidth={400}
      defaultWidth={200}
      startingWidth={startingWidth}
      className="bg-muted"
      storageKey={STORAGE_KEY}
      onWidthChangeEnd={handleWdithChange}
      onWidthReset={handleWdithChange}
    >
      {children}
    </ResizablePanel>
  );
};
