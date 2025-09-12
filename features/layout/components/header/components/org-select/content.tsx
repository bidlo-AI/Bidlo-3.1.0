'use client';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

// Renders searchable organization list for the popover.
export function OrgSelectPopoverContent({
  items,
  onSelect,
}: {
  items: Array<{ id: string; name: string; role: string }>;
  onSelect: (id: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search organizations..." />
      <CommandEmpty>No organizations found.</CommandEmpty>
      <CommandGroup heading="Organizations">
        {items.map((org) => (
          <CommandItem key={org.id} onSelect={() => onSelect(org.id)}>
            {org.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}
