'use client';

import { useEffect } from 'react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';
import { useSidebar } from '@/features/layout/components/sidebar/providers/SidebarProvider';

export function HotkeysProvider() {
  const { toggle } = useAgentPanel();
  const sidebar$ = useSidebar();
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Agent toggle ⌘/Ctrl + J --------------------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') return toggle();
      // --------------------------------------------------------------------
      // Sidebar pin/unpin ⌘/Ctrl + B ----------------------------------------
      // Mirrors VS Code behavior to quickly toggle the sidebar's pinned state.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'h') return sidebar$.toggleSidebar();
      // --------------------------------------------------------------------
    };
    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [toggle, sidebar$]);

  return <></>;
}
