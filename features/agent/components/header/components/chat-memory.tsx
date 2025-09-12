'use client';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const ChatMemoryButton = () => {
  const { go } = useAgentPanel();

  return (
    <Button size="icon" variant="ghost" onMouseDown={() => go('memory')}>
      <BookOpen className="size-4" />
    </Button>
  );
};
