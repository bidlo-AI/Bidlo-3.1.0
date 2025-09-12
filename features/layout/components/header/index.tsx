import { Suspense } from 'react';
import { OrgSelect } from '@/features/layout/components/header/components/org-select';
import { AgentActions } from '@/features/layout/components/header/components/agent-actions';

// import { Crumbs } from "./components/crumbs";
// import { TeamPresence } from "./components/team-presence/presence-client";

export const Header = () => (
  <>
    <div className="spacer-l" />
    <OrgSelect />

    <Suspense fallback={null}>
      <AgentActions />
    </Suspense>
    <div className="spacer-r" />
  </>
);
