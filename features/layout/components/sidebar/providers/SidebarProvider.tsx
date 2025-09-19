'use client';

import { createContext, useContext } from 'react';
import { useObservable } from '@legendapp/state/react';
import { api } from '@/convex/_generated/api';
import { Observable } from '@legendapp/state';
import { useMutation } from 'convex/react';
import { SidebarState } from '../types';

export const SidebarContext = createContext<Observable<SidebarState> | null>(null);

export const SidebarProvider = ({
  children,
  sidebar_hidden,
}: {
  children: React.ReactNode;
  sidebar_hidden: boolean;
}) => {
  const toggleSidebar = useMutation(api.users.setLayoutHidden);
  const initialPanelWidth = (() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('sidebarWidthPx');
      const val = stored ? parseInt(stored, 10) : NaN;
      if (Number.isFinite(val)) return val;
    }
    return 200;
  })();
  const state$ = useObservable({
    sidebar_hidden,
    overlay_open: false,
    panel_width: initialPanelWidth,
    toggleSidebar: () => {
      const hidden = !state$.sidebar_hidden.get();
      state$.setSidebar(hidden);
    },
    setSidebar: (hidden: boolean) => {
      state$.sidebar_hidden.set(hidden);
      toggleSidebar({ target: 'sidebar_hidden', hidden });
    },
    openOverlay: () => {
      state$.overlay_open.set(true);
    },
    closeOverlay: () => {
      state$.overlay_open.set(false);
    },
    setPanelWidth: (width: number) => {
      state$.panel_width.set(width);
    },
  });
  return <SidebarContext.Provider value={state$}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a SidebarProvider');
  }
  return context;
};
