'use client';

import { createContext, useContext } from 'react';
import { useObservable } from '@legendapp/state/react';
import { api } from '@/convex/_generated/api';
import { Observable } from '@legendapp/state';
import { useMutation } from 'convex/react';

interface SidebarState {
  sidebar_hidden: boolean;
  setSidebar: (hidden: boolean) => void;
}

export const SidebarContext = createContext<Observable<SidebarState> | null>(null);

export const SidebarProvider = ({
  children,
  sidebar_hidden,
}: {
  children: React.ReactNode;
  sidebar_hidden: boolean;
}) => {
  const toggleSidebar = useMutation(api.users.toggleSidebar);
  const state$ = useObservable({
    sidebar_hidden,
    setSidebar: (hidden: boolean) => {
      state$.sidebar_hidden.set(hidden);
      toggleSidebar({ hidden });
    },
  });
  return <SidebarContext.Provider value={state$}>{children}</SidebarContext.Provider>;
};

export const useLayout = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a SidebarProvider');
  }
  return context;
};
