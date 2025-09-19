'use client';

import { Show } from '@legendapp/state/react';
import { AgentPanelToggle } from './toggle-button';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';

export const AgentActions = () => {
  const agent$ = useAgentPanel();
  return (
    <Show if={agent$.hidden}>
      <div className="agent flex items-center">
        <AgentPanelToggle />
      </div>
    </Show>
  );
};
