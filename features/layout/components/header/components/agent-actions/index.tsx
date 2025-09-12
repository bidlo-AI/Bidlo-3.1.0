'use client';

import { Show } from '@legendapp/state/react';
import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
import { Separator } from '@/features/layout/components/header/components/header-seporator';
import { ChatLink } from './toggle-button';

export const AgentActions = () => {
  return (
    <Show if={() => !pageHashParams.a.get()}>
      <div className="agent flex items-center">
        <Separator />
        <ChatLink />
      </div>
    </Show>
  );
};
