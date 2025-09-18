'use client';

import { Show } from '@legendapp/state/react';
import { ChevronDown, ChevronsLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSidebar } from '@/features/layout/components/sidebar/providers/SidebarProvider';
import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';

export const User = ({ preloadedUser }: { preloadedUser: Preloaded<typeof api.users.getUser> }) => {
  const user = usePreloadedQuery(preloadedUser);
  const sidebar$ = useSidebar();
  const handleUnpin = () => {
    sidebar$.setSidebar(true);
    sidebar$.openOverlay();
  };

  return (
    <div className="p-2">
      {/* Turn the user row into a popover; move actions into the popover */}
      <Popover>
        <div className="flex items-center justify-between w-full h-8 px-2 rounded hover:bg-hover cursor-pointer">
          <PopoverTrigger className="flex items-center gap-2">
            <Image src={user?.profile_picture} alt={user?.first_name} className="rounded" width={20} height={20} />
            <span className="truncate font-medium">
              {user?.first_name} {user?.last_name}
            </span>
            <ChevronDown className="size-4" />
          </PopoverTrigger>
          <Show if={() => !sidebar$.sidebar_hidden.get()}>
            <Button size="icon" variant="ghost" onClick={handleUnpin} aria-label="Unpin sidebar">
              <ChevronsLeft className="size-4" />
            </Button>
          </Show>
        </div>
        <PopoverContent className="p-2" align="start">
          <div className="flex items-center">
            <Image src={user?.profile_picture} alt={user?.first_name} width={36} height={36} />

            <div>
              <div>
                {user?.first_name} {user?.last_name}
              </div>
              <span>{user?.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              Settings
            </Button>
            <Button size="sm" variant="outline">
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
