import { AgentClose } from './components/agent-close';
import { NewChatButton } from './components/new-chat';
import { ChatHistoryButton } from './components/chat-history';
import { ChatMemoryButton } from './components/chat-memory';
import { ChatTasksButton } from './components/chat-tasks';
import { BackToChatButton } from './components/back-to-chat';
import { HeaderSeparator } from '@/features/layout/components/header/components/header-seporator';

export const Header = () => {
  return (
    <div className="flex h-10 overflow-hidden items-center justify-between p-1.5">
      <Actions />
      <Tabs />
    </div>
  );
};

const Actions = () => (
  <div className="flex items-center ">
    <AgentClose />
    <BackToChatButton />
  </div>
);

const Tabs = () => (
  <div className="flex items-center ">
    <ChatTasksButton />
    <ChatMemoryButton />
    <ChatHistoryButton />
    <HeaderSeparator />
    <NewChatButton />
  </div>
);
