'use client';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SidebarContent } from '@/features/layout/components/sidebar/components/content';
import { Menu } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useLayout } from '@/features/layout/components/sidebar/providers/SidebarProvider';
import { Show } from '@legendapp/state/react';

export const SidebarActions = () => {
  const layout$ = useLayout();

  return (
    <>
      {/* Mobile: hamburger opens the sidebar in a sheet */}
      <div className="flex md:hidden sidebar h-full items-center pr-1.5">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[240px]">
            <VisuallyHidden>
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Sidebar</SheetTitle>
              </SheetHeader>
            </VisuallyHidden>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: show a Pin button when the sidebar is unpinned/hidden */}
      <div className="hidden md:flex sidebar h-full items-center pr-1.5">
        <Show if={layout$.sidebar_hidden}>
          <Button variant="ghost" size="icon" onClick={() => layout$.setSidebar(false)} aria-label="Pin sidebar">
            <Menu className="size-5" />
          </Button>
        </Show>
      </div>
    </>
  );
};
