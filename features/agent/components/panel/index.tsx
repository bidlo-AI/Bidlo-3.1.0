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

const STORAGE_KEY = 'agentWidthPx';

// Map query param to statically imported page components for snappy first open
const PAGES: Record<string, ComponentType> = {
  chat: Chat,
  memory: Memory,
  tasks: Tasks,
  history: History,
  new: New,
};

export const AgentPanel = () => {
  const { page } = useAgentPanel();
  if (!page) return null;

  // Choose the component based on `a` param; fall back to `chat`
  const Page = PAGES[page] ?? PAGES['chat'];

  return (
    <ResizablePanel storageKey={STORAGE_KEY} className="bg-muted">
      <Header />
      <Page />
    </ResizablePanel>
  );
};
