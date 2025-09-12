'use client';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const ChatHistoryButton = () => {
  const { go } = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => go('history')}>
      <History className="size-4" />
    </Button>
  );
};
