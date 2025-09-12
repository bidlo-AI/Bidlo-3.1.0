'use client';

import { Header } from './header';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { ResizablePanel } from '@/features/layout/components/resizable-panel';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

const STORAGE_KEY = 'agentWidthPx';

// Map query param to lazily-loaded page components for clean routing and code-splitting
const PAGES: Record<string, ComponentType> = {
  chat: dynamic(() => import('./pages/chat').then((m) => m.Chat)),
  memory: dynamic(() => import('./pages/memory').then((m) => m.Memory)),
  tasks: dynamic(() => import('./pages/task').then((m) => m.Tasks)),
  history: dynamic(() => import('./pages/history').then((m) => m.History)),
  new: dynamic(() => import('./pages/new').then((m) => m.New)),
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
