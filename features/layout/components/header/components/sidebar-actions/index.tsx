'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebar } from '@/features/layout/components/sidebar/useSidebar';
import { PanelRight } from 'lucide-react';

export const SidebarActions = () => {
  const { isOpen, isPinned, toggle } = useSidebar();

  return (
    <div className="sidebar  flex items-center">
      {!isPinned && (
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground-opaque size-7"
              onMouseDown={toggle}
              aria-pressed={isOpen}
              aria-label="Toggle sidebar"
            >
              <PanelRight className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle sidebar</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
