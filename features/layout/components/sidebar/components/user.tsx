'use client';

import { Show } from '@legendapp/state/react';
import { ChevronsLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/features/layout/components/sidebar/providers/SidebarProvider';

export const User = () => {
  const sidebar$ = useSidebar();
  const handleUnpin = () => {
    sidebar$.setSidebar(true);
    sidebar$.openOverlay();
  };

  return (
    <div className="flex items-center justify-between">
      <div>Name</div>
      <Show if={() => !sidebar$.sidebar_hidden.get()}>
        <Button size="icon" variant="ghost" onClick={handleUnpin} aria-label="Unpin sidebar">
          <ChevronsLeft className="size-5" />
        </Button>
      </Show>
    </div>
  );
};
