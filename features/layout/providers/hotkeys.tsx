'use client';

import { useEffect } from 'react';
import { toggleAgent } from '@/features/agent/lib/utils';

export function HotkeysProvider() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Agent toggle ⌘/Ctrl + J --------------------------------------------
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') return toggleAgent();
      // --------------------------------------------------------------------
    };
    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
  }, []);

  return <></>;
}
