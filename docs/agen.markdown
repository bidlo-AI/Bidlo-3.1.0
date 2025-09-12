### Agent Panel

The Agent Panel is a slide-out panel that shows AI assistant pages (chat, memory, tasks, history, new). Its open/close state and active page are fully controlled by the URL using Nuqs query parameters. This enables shareable deep links and avoids hydration issues.

### URL State (Nuqs)

- The panel is controlled by the `a` query parameter in the URL: `?a=chat`, `?a=memory`, `?a=tasks`, `?a=history`, or `?a=new`.
- When `a` is unset, the Agent Panel is closed. When `a` has a value, the panel is open and renders that page.
- State is synchronized with the router using Nuqs `useQueryState`, so there is no hydration mismatch.
- The public API for interacting with this state is the `useAgentPanel` hook, which wraps Nuqs and provides a clean interface.

Example (simplified):

```tsx
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const AgentPanel = () => {
  const { page } = useAgentPanel();
  if (!page) return null; // panel closed

  return (
    <div>
      {page === 'chat' && <Chat />}
      {page === 'memory' && <Memory />}
      ...
    </div>
  );
};
```

Open/close and navigation are just query param updates:

```tsx
import { useAgentPanel } from '@/features/agent/hooks/useAgentPanel';

export const AgentToggleButton = () => {
  const { open } = useAgentPanel();
  return <button onClick={open}>Open Agent</button>;
};

export const AgentCloseButton = () => {
  const { close } = useAgentPanel();
  return <button onClick={close}>Close</button>;
};
```

### Pages

- chat: Primary messaging experience. Default view when the panel opens.
- memory: View and manage conversation or user memory.
- tasks: View and manage agent tasks or jobs.
- history: Browse past chats/sessions.
- new: Start a new chat quickly.

### Why Nuqs (and not hash params)

- Nuqs keeps URL state in sync with the Next.js router and React, preventing hydration mismatches.
- It offers simple, typed accessors (`useQueryState`, `parseAsString`) and minimal re-renders.
- Deep linking works out-of-the-box without custom hash handling.

### Adding another Agent page

1. Register your page key and component in the Agent Panel `PAGES` map.
2. Add a button or link that calls `go('my-page')` from `useAgentPanel`.
3. Share deep links like `?a=my-page`.
