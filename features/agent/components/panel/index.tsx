'use client';

import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
import { Show, Switch } from '@legendapp/state/react';
import { Header } from '../header';
import { Chat } from './pages/chat';
import { Memory } from './pages/memory';
import { Tasks } from './pages/task';
import { History } from './pages/history';
import { New } from './pages/new';
import { ResizablePanel } from '@/features/layout/components/resizable-panel';

const STORAGE_KEY = 'agentWidthPx';

export const AgentPanel = () => (
  <Show if={() => !!pageHashParams.a.get()}>
    <ResizablePanel storageKey={STORAGE_KEY} className="bg-muted">
      <Header />
      <Switch value={pageHashParams.a}>
        {{
          chat: () => <Chat />,
          memory: () => <Memory />,
          tasks: () => <Tasks />,
          history: () => <History />,
          new: () => <New />,
          default: () => <Chat />,
          undefined: () => <Chat />,
        }}
      </Switch>
    </ResizablePanel>
  </Show>
);
