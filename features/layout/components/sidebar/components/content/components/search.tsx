'use client';

import { NavButton } from './nav-link';
import { SearchIcon } from 'lucide-react';

export const Search = () => {
  return (
    <NavButton
      label="Search"
      icon={<SearchIcon className="size-4.5" />}
      onClick={() => {
        console.log('Search');
      }}
    />
  );
};
