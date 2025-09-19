export type AgentPanelPage = 'chat' | 'memory' | 'tasks' | 'history' | 'new';

export interface AgentProviderProps {
  children: React.ReactNode;
  agent_panel_hidden: boolean;
  agent_panel_page: AgentPanelPage;
}

export interface AgentProviderState {
  /** Whether the agent panel is hidden */
  hidden: boolean;
  /** The current page of the agent panel */
  // Keep `page` strongly typed so consumers like <Switch> can infer valid keys
  page: AgentPanelPage;
  /** Persist and set the hidden state */
  setHidden: (hidden: boolean) => void;
  /** Toggle hidden state and persist */
  toggleHidden: () => void;
  /** Set the current page */
  setPage: (page: AgentPanelPage) => void;
}
