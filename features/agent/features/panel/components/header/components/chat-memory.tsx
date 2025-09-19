'use client';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';

export const ChatMemoryButton = () => {
  const agent$ = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => agent$.setPage('memory')}>
      <BookOpen className="size-4" />
    </Button>
  );
};
