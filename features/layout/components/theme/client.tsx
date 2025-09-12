'use client';

import { useEffect } from 'react';
import { usePreloadedQuery, Preloaded } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useTheme } from 'next-themes';

export const ThemeClient = ({ preloaded }: { preloaded: Preloaded<typeof api.users.getUser> }) => {
  const user = usePreloadedQuery(preloaded);
  const { setTheme } = useTheme(); // Access setTheme via hook

  // - set theme
  useEffect(() => {
    setTheme(user?.theme ?? 'light');
  }, [user?.theme, setTheme]);
  // - set color

  return <></>;
};
