'use client';

import { Header } from './header';
import type { ComponentType } from 'react';
import { ResizablePanel } from '@/features/layout/components/resizable-panel';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';
import { Chat } from './pages/chat';
import { Memory } from './pages/memory';
import { Tasks } from './pages/task';
import { History } from './pages/history';
import { New } from './pages/new';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';

const STORAGE_KEY = 'agentWidthPx';

// Map query param to statically imported page components for snappy first open
const PAGES: Record<string, ComponentType> = {
  chat: Chat,
  memory: Memory,
  tasks: Tasks,
  history: History,
  new: New,
};

export const AgentPanel = ({ startingWidth }: { startingWidth?: number }) => {
  const { page } = useAgentPanel();
  const setWidth = useMutation(api.users.setLayoutWidth);

  // Hide panel entirely when no page is selected
  if (!page) return null;
  const Page = PAGES[page];

  //handlers
  const handleWdithChange = (w: number) => setWidth({ target: 'agent_panel_width', width: Math.round(w) });

  return (
    <ResizablePanel
      storageKey={STORAGE_KEY}
      className="bg-muted"
      startingWidth={startingWidth}
      onWidthChangeEnd={handleWdithChange}
      onWidthReset={handleWdithChange}
    >
      <Header />
      <Page />
    </ResizablePanel>
  );
};
