'use client';

import { Separator } from '@/features/layout/components/header/components/header-seporator';
import { ChatLink } from './toggle-button';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const AgentActions = () => {
  // Hide actions when the agent panel is already open (any value in `a`)
  const { page } = useAgentPanel();
  if (page) return null;

  return (
    <div className="agent flex items-center">
      <Separator />
      <ChatLink />
    </div>
  );
};
