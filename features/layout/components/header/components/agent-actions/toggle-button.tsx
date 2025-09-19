'use client';
import { Button } from '@/components/ui/button';
import { PanelRight } from 'lucide-react';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const AgentPanelToggle = () => {
  const agent$ = useAgentPanel();
  return (
    // Tooltip for the agent panel toggle
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-primary hover:text-primary/80 hover:bg-primary/10 size-7"
          onMouseDown={agent$.toggleHidden}
        >
          <PanelRight className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open agent panel</p>
      </TooltipContent>
    </Tooltip>
  );
};
