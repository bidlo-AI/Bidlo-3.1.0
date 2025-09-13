'use client';
/** See docs/presence.markdown for Presence feature documentation. */
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const NewChatButton = () => {
  const { go } = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => go('new')}>
      <Plus className="size-4" />
    </Button>
  );
};
