'use client';

import { NavButton } from './nav-link';
import { SettingsIcon } from 'lucide-react';

export const Settings = () => {
  return (
    <NavButton
      label="Settings"
      icon={<SettingsIcon className="size-4.5" />}
      onClick={() => {
        console.log('Settings');
      }}
    />
  );
};
