'use client';

import { AgentPanelToggle } from './toggle-button';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const AgentActions = () => {
  const { page } = useAgentPanel();
  if (page) return null;

  return (
    <div className="agent flex items-center">
      <AgentPanelToggle />
    </div>
  );
};
