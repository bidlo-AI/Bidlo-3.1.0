import { Header } from '@/features/layout/components/header';
import { HotkeysProvider } from '@/features/layout/providers/hotkeys';
import { AgentPanel } from '@/features/agent/components/panel';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid grid-app-layout flex-1 overflow-hidden relative">
        {/* <Sidebar /> */}
        <Header />
        <div className="content">
          {children}
          {/* <Peek /> */}
        </div>
      </div>
      <Suspense fallback={null}>
        <AgentPanel />
        <HotkeysProvider />
      </Suspense>
    </>
  );
}
