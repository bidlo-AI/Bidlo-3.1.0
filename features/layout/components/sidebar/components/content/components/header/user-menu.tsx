'use client';

import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';

export const UserMenu = ({ preloadedUser }: { preloadedUser: Preloaded<typeof api.users.getUser> }) => {
  const user = usePreloadedQuery(preloadedUser);
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 w-full cursor-pointer">
        <Image
          src={user?.profile_picture}
          className="rounded object-cover overflow-hidden bg-hover size-5"
          alt={user?.first_name}
          width={20}
          height={20}
        />
        <span className="truncate font-semibold">
          {user?.first_name} {user?.last_name}
        </span>
        <ChevronDown className="size-5 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" side="bottom" sideOffset={-16} className="p-3 flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <Image
            src={user?.profile_picture}
            alt={user?.first_name}
            width={36}
            height={36}
            className="rounded object-cover overflow-hidden bg-hover"
          />
          <div>
            <p className="font-semibold">
              {user?.first_name} {user?.last_name}
            </p>
            <span className="text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="xs" variant="outline" className="text-xs">
            <Settings className="size-4" />
            Settings
          </Button>
          <Button size="xs" variant="outline" className="text-xs">
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
