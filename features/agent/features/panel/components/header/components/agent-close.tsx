'use client';
import { Button } from '@/components/ui/button';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';
import { ChevronsRight } from 'lucide-react';

export const AgentClose = () => {
  const agent$ = useAgentPanel();

  return (
    <Button size="icon" className="text-muted-foreground" variant="ghost" onClick={agent$.toggleHidden}>
      <ChevronsRight className="size-4" />
    </Button>
  );
};
