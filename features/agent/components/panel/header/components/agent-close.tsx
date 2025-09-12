'use client';
import { Button } from '@/components/ui/button';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';
import { ChevronsRight } from 'lucide-react';

export const AgentClose = () => {
  const { close } = useAgentPanel();

  return (
    <Button size="icon" className="text-muted-foreground" variant="ghost" onClick={close}>
      <ChevronsRight className="size-4" />
    </Button>
  );
};
