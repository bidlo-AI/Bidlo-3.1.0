'use client';

import { useEffect } from 'react';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';
import { useSidebar } from '@/features/layout/components/sidebar/providers/SidebarProvider';
import { useCommand } from '@/features/layout/components/command/providers/CommandProvider';

export function HotkeysProvider() {
  const agent$ = useAgentPanel();
  const sidebar$ = useSidebar();
  const command$ = useCommand();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K → Toggle Command Palette --------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') return command$.toggleOpen();
      // ----------------------------------------------------------------------
      // Agent toggle ⌘/Ctrl + J ----------------------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') return agent$.toggleHidden();
      // ----------------------------------------------------------------------
      // Sidebar toggle ⌘/Ctrl + H --------------------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'h') return sidebar$.toggleSidebar();
      // ----------------------------------------------------------------------
    };
    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [agent$, sidebar$, command$]);

  // No UI here; global dialog is rendered by CommandProvider
  return <></>;
}
