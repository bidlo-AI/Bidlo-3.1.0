'use client';

import { api } from '@/convex/_generated/api';
import { useAction } from 'convex/react';

export const PromptInput = () => {
  const helloWorld = useAction(api.agent.helloWorld);
  const handleClick = async () => {
    console.log('clicked');
    const result = await helloWorld({ prompt: 'Hello, world!' });
    console.log(result);
    console.log('done');
  };
  return (
    <button
      onClick={handleClick}
      id="chat-input"
      className="shadow-sm text-base rounded-3xl bg-muted border h-fit min-h-12 w-full px-4 py-3"
    >
      {/* <input className="text-muted-foreground-opaque" placeholder="Search or Ask anything..." /> */}
    </button>
  );
};
