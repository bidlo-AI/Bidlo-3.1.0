'use client';

import { createContext, useContext } from 'react';
import { useObservable } from '@legendapp/state/react';
import { api } from '@/convex/_generated/api';
import { Observable } from '@legendapp/state';
import { useMutation } from 'convex/react';
import { AgentPanelPage, AgentProviderProps, AgentProviderState } from '../types';

export const AgentProviderContext = createContext<Observable<AgentProviderState> | null>(null);

/**
 * Provides state and actions for the Agent Panel.
 * Mirrors the Sidebar provider pattern but without overlay-related state.
 */
export const AgentProvider = ({ agent_panel_hidden, agent_panel_page, children }: AgentProviderProps) => {
  // Convex mutation to persist layout visibility changes
  const updateLayoutHidden = useMutation(api.users.setLayoutHidden);
  const updateLayoutPage = useMutation(api.users.setAgentPanelPage);

  const state$ = useObservable({
    hidden: agent_panel_hidden,
    page: agent_panel_page,
    toggleHidden: () => {
      const hidden = !state$.hidden.get();
      state$.setHidden(hidden);
    },
    setHidden: (hidden: boolean) => {
      state$.hidden.set(hidden);
      updateLayoutHidden({ target: 'agent_panel_hidden', hidden });
    },
    setPage: (page: AgentPanelPage) => {
      state$.page.set(page);
      updateLayoutPage({ page });
    },
  });

  return <AgentProviderContext.Provider value={state$}>{children}</AgentProviderContext.Provider>;
};

export const useAgentPanel = () => {
  const context = useContext(AgentProviderContext);
  if (!context) {
    throw new Error('useAgentProvider must be used within an AgentProvider');
  }
  return context;
};
