'use client';

import { useEffect } from 'react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export function HotkeysProvider() {
  const { toggle } = useAgentPanel();
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Agent toggle ⌘/Ctrl + J --------------------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') return toggle();
      // --------------------------------------------------------------------
    };
    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, [toggle]);

  return <></>;
}
