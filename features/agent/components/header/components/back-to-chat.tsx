'use client';
import { Button } from '@/components/ui/button';
import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
import { ArrowLeft } from 'lucide-react';
import { Show } from '@legendapp/state/react';
import { Separator } from '@/features/layout/components/header/components/header-seporator';

export const BackToChatButton = () => (
  <Show if={() => pageHashParams.a.get() !== 'chat'}>
    <Separator />
    <Button
      size="xs"
      variant="ghost"
      className="gap-1 [&>svg]:text-muted-foreground hover:[&>svg]:text-foreground"
      onMouseDown={() => pageHashParams.a.set('chat')}
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  </Show>
);
