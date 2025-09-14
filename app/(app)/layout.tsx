import { Header } from '@/features/layout/components/header';
import { HotkeysProvider } from '@/features/layout/providers/hotkeys';
import { AgentPanel } from '@/features/agent/components/panel';
import { Sidebar } from '@/features/layout/components/sidebar';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* grid-app-layout positions SSR and Client components in fixed positions */}
      <Sidebar />
      <div className="grid grid-app-layout flex-1 overflow-hidden relative">
        <Header />
        {children}
        {/* <Peek /> */}
      </div>
      <Suspense fallback={null}>
        <AgentPanel />
        <HotkeysProvider />
      </Suspense>
    </>
  );
}
