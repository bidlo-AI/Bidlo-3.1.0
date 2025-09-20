'use client';

import { NavButton } from './nav-link';
import { SearchIcon } from 'lucide-react';
import { useCommand } from '@/features/layout/components/command/providers/CommandProvider';

export const Search = () => {
  // Open the global Command Palette when the search item is clicked
  const command$ = useCommand();
  return <NavButton label="Search" icon={<SearchIcon className="size-4.5" />} onClick={() => command$.setOpen(true)} />;
};
