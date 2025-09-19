'use client';

import { Header } from './components/header';
import { ResizablePanel } from '@/features/layout/components/resizable-panel';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Show, Switch } from '@legendapp/state/react';

//pagse
import { Chat } from './components/pages/chat';
import { Memory } from './components/pages/memory';
import { Tasks } from './components/pages/task';
import { History } from './components/pages/history';
import { New } from './components/pages/new';

const STORAGE_KEY = 'agentWidthPx';

export const AgentPanel = ({ startingWidth }: { startingWidth?: number }) => {
  const agent$ = useAgentPanel();
  const setWidth = useMutation(api.users.setLayoutWidth);

  //handlers
  const handleWdithChange = (w: number) => setWidth({ target: 'agent_panel_width', width: Math.round(w) });

  return (
    <Show if={() => !agent$.hidden.get()}>
      <ResizablePanel
        storageKey={STORAGE_KEY}
        className="bg-muted h-screen agent-panel"
        startingWidth={startingWidth}
        onWidthChangeEnd={handleWdithChange}
        onWidthReset={handleWdithChange}
      >
        <Header />
        <Switch value={agent$.page}>
          {{
            chat: () => <Chat />,
            memory: () => <Memory />,
            tasks: () => <Tasks />,
            history: () => <History />,
            new: () => <New />,
            default: () => <Chat />,
          }}
        </Switch>
      </ResizablePanel>
    </Show>
  );
};
