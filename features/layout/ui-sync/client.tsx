'use client';

import { useEffect } from 'react';
import { usePreloadedQuery, Preloaded } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useTheme } from 'next-themes';

export const UISyncClient = ({
  preloadedUser,
  children,
}: {
  preloadedUser: Preloaded<typeof api.users.getUser>;
  children: React.ReactNode;
}) => {
  const user = usePreloadedQuery(preloadedUser);
  const { setTheme } = useTheme(); // Access setTheme via hook

  // - set theme
  useEffect(() => {
    setTheme(user?.theme ?? 'light');
  }, [user?.theme, setTheme]);
  // - set color

  return <>{children}</>;
};
