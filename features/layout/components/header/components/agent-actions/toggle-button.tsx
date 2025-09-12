'use client';
import { Button } from '@/components/ui/button';
import { PanelRight } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const ChatLink = () => {
  const { open } = useAgentPanel();
  return (
    <Button size="icon" variant="ghost" className="text-muted-foreground-opaque size-7" onMouseDown={open}>
      <PanelRight className="size-4" />
    </Button>
  );
};
