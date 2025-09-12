'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/features/layout/components/header/components/header-seporator';
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const BackToChatButton = () => {
  const { page, go } = useAgentPanel();

  if (page === 'chat') return null;

  return (
    <>
      <Separator />
      <Button
        size="xs"
        variant="ghost"
        className="gap-1 [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground"
        onMouseDown={() => go('chat')}
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>
    </>
  );
};
