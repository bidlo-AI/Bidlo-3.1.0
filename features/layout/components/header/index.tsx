import { Suspense } from 'react';
import { OrgSelect } from '@/features/layout/components/header/components/org-select';
import { AgentActions } from '@/features/layout/components/header/components/agent-actions';
import { SidebarActions } from '@/features/layout/components/header/components/sidebar-actions';
import { Preloaded } from 'convex/react';
import { api } from '@/convex/_generated/api';

// import { Crumbs } from "./components/crumbs";
// import { TeamPresence } from "./components/team-presence/presence-client";

export const Header = ({ preloadedUser }: { preloadedUser: Preloaded<typeof api.users.getUser> }) => (
  <>
    <div className="spacer-l" />
    <SidebarActions preloadedUser={preloadedUser} />
    <OrgSelect />
    <Suspense fallback={null}>
      <AgentActions />
    </Suspense>
    <div className="spacer-r" />
  </>
);
