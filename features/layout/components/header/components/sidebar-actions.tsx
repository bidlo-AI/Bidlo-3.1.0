'use client';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SidebarContent } from '@/features/layout/components/sidebar/components/content';
import { Menu } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const SidebarActions = () => {
  return (
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
  );
};
