'use client';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';

export const ChatHistoryButton = () => {
  const agent$ = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => agent$.setPage('history')}>
      <History className="size-4" />
    </Button>
  );
};
