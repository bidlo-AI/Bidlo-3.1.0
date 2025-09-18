'use client';

import { useMount } from '@legendapp/state/react';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { observable } from '@legendapp/state';

interface SidebarState {
  sidebar_hidden: boolean;
  setSidebar: (hidden: boolean) => void;
  toggleSidebar: () => void;
  /** Ephemeral UI state: whether the overlay sidebar is expanded while hidden */
  overlay_open: boolean;
  openOverlay: () => void;
  closeOverlay: () => void;
  /** Current sidebar panel width in px (client-only; persisted elsewhere) */
  panel_width: number;
  setPanelWidth: (width: number) => void;
}

export const sidebar$ = observable<SidebarState | null>(null);

export const SidebarProvider = ({ sidebar_hidden }: { sidebar_hidden: boolean }) => {
  const toggleSidebar = useMutation(api.users.toggleSidebar);
  const initialPanelWidth = (() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('sidebarWidthPx');
      const val = stored ? parseInt(stored, 10) : NaN;
      if (Number.isFinite(val)) return val;
    }
    return 200;
  })();

  useMount(() =>
    sidebar$.set({
      sidebar_hidden,
      overlay_open: false,
      panel_width: initialPanelWidth,
      toggleSidebar: () => {
        const hidden = !sidebar$.sidebar_hidden.get();
        sidebar$.setSidebar(hidden);
      },
      setSidebar: (hidden: boolean) => {
        sidebar$.sidebar_hidden.set(hidden);
        toggleSidebar({ hidden });
      },
      openOverlay: () => {
        sidebar$.overlay_open.set(true);
      },
      closeOverlay: () => {
        sidebar$.overlay_open.set(false);
      },
      setPanelWidth: (width: number) => {
        sidebar$.panel_width.set(width);
      },
    }),
  );
  return <></>;
};
