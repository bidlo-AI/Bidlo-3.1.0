'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';
import { useRouter } from 'next/navigation';

/**
 * CommandPalette
 * Presentational component for the global command dialog UI.
 * - Stateless regarding open/close; receives `open` and `onOpenChange` from parent.
 * - Handles command actions locally (toggle agent/sidebar, navigate, agent pages).
 */
export function CommandPalette({
  open$,
  onOpenChange,
}: {
  open$: Observable<boolean>;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const open = use$(open$);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      {/* Search input */}
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem
            value="go home"
            onSelect={() => {
              onOpenChange(false);
              router.push('/');
            }}
          >
            Go to Home
          </CommandItem>
          <CommandItem
            value="open data"
            onSelect={() => {
              onOpenChange(false);
              router.push('/data');
            }}
          >
            Open Data
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Agent pages">
          <CommandItem
            value="agent chat"
            onSelect={() => {
              console.log('agent chat');
            }}
          >
            Agent: Chat
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default CommandPalette;
