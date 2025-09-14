import { Header } from '@/features/layout/components/header';
import { HotkeysProvider } from '@/features/layout/providers/hotkeys';
import { AgentPanel } from '@/features/agent/components/panel';
import { Sidebar } from '@/features/layout/components/sidebar';
import { Suspense } from 'react';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { preloadQuery, preloadedQueryResult } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });
  const { agent_panel_width, sidebar_width, sidebar_hidden } = await preloadedQueryResult(preloaded);

  return (
    <>
      <Sidebar startingWidth={sidebar_width} hidden={sidebar_hidden} />
      <div className="grid grid-app-layout flex-1 overflow-hidden relative">
        <Header />
        {children}
        {/* <Peek /> */}
      </div>
      <Suspense fallback={null}>
        <AgentPanel startingWidth={agent_panel_width} />
        <HotkeysProvider />
      </Suspense>
    </>
  );
}
