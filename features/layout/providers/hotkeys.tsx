'use client';

import { useEffect } from 'react';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';
import { useSidebar } from '@/features/layout/components/sidebar/providers/SidebarProvider';

export function HotkeysProvider() {
  const agent$ = useAgentPanel();
  const sidebar$ = useSidebar();
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Agent toggle ⌘/Ctrl + J --------------------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') return agent$.toggleHidden();
      // --------------------------------------------------------------------
      // Sidebar pin/unpin ⌘/Ctrl + B ----------------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'h') return sidebar$.toggleSidebar();
      // --------------------------------------------------------------------
    };
    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [agent$, sidebar$]);

  return <></>;
}
