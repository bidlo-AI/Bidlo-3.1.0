'use client';
import { Button } from '@/components/ui/button';
import { PanelRight } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const AgentPanelToggle = () => {
  const { open } = useAgentPanel();
  return (
    // Tooltip for the agent panel toggle
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button size="icon" variant="ghost" className="text-muted-foreground-opaque size-7" onMouseDown={open}>
          <PanelRight className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open agent panel</p>
      </TooltipContent>
    </Tooltip>
  );
};
