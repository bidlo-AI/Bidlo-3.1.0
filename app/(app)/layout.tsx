import { Header } from '@/features/layout/components/header';
import { HotkeysProvider } from '@/features/layout/providers/hotkeys';
import { AgentPanel } from '@/features/agent/components/panel';
import { Sidebar } from '@/features/layout/components/sidebar';
import { Suspense } from 'react';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { preloadQuery, preloadedQueryResult } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { SidebarProvider } from '@/features/layout/components/sidebar/providers/SidebarProvider';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });
  const { sidebar_hidden, sidebar_width, agent_panel_width } = await preloadedQueryResult(preloaded);

  return (
    <SidebarProvider sidebar_hidden={sidebar_hidden}>
      <Sidebar startingWidth={sidebar_width} />
      <div className="grid grid-app-layout flex-1 overflow-hidden relative">
        <Header />
        {children}
        {/* <Peek /> */}
      </div>
      <Suspense fallback={null}>
        <AgentPanel startingWidth={agent_panel_width} />
        <HotkeysProvider />
      </Suspense>
    </SidebarProvider>
  );
}
