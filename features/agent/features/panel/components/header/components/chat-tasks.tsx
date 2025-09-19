'use client';
import { Button } from '@/components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';

export const ChatTasksButton = () => {
  const agent$ = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => agent$.setPage('tasks')}>
      <GalleryVerticalEnd className="size-4" />
    </Button>
  );
};
