'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/features/layout/components/header/components/header-seporator';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';
import { Show } from '@legendapp/state/react';

export const BackToChatButton = () => {
  const agent$ = useAgentPanel();

  return (
    <Show if={() => agent$.page.get() !== 'chat'}>
      <Separator />
      <Button
        size="xs"
        variant="ghost"
        className="gap-1 [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground"
        onMouseDown={() => agent$.setPage('chat')}
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>
    </Show>
  );
};
