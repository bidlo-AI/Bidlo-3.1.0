'use client';
import { Button } from '@/components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const ChatTasksButton = () => {
  const { go } = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => go('tasks')}>
      <GalleryVerticalEnd className="size-4" />
    </Button>
  );
};
