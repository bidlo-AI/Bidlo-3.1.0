'use client';
/** See docs/presence.markdown for Presence feature documentation. */
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';

export const NewChatButton = () => {
  const agent$ = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => agent$.setPage('new')}>
      <Plus className="size-4" />
    </Button>
  );
};
