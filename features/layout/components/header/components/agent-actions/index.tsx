'use client';

import { Separator } from '@/features/layout/components/header/components/header-seporator';
import { AgentPanelToggle } from './toggle-button';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const AgentActions = () => {
  const { page } = useAgentPanel();
  if (page) return null;

  return (
    <div className="agent flex items-center">
      <Separator />
      <AgentPanelToggle />
    </div>
  );
};
