### Agent Panel

The Agent Panel is a slide-out, resizable surface that hosts the agent pages: chat, memory, tasks, history, and new. Its visibility and current page are managed by a small provider built on `@legendapp/state` and persisted to Convex per user. URL query parameters are no longer used for state.

### Integration

At the app level, the tree is wrapped in an `AgentProvider` and the `AgentPanel` is rendered once. User layout preferences (hidden state, width, current page) are preloaded from Convex and persisted back on change.

```tsx
// app/(app)/layout.tsx – simplified
<AgentProvider agent_panel_hidden={u.agent_panel_hidden} agent_panel_page={u.agent_panel_page}>
  <Sidebar startingWidth={u.sidebar_width} preloadedUser={preloaded} />
  <div className="grid grid-app-layout flex-1 overflow-hidden relative">
    <Header preloadedUser={preloaded} />
    {children}
  </div>
  <AgentPanel startingWidth={u.agent_panel_width} />
  <Suspense fallback={null}>
    <HotkeysProvider />
  </Suspense>
</AgentProvider>
```

### API: useAgentPanel

`useAgentPanel()` returns an observable state object (via `@legendapp/state`) with typed page keys:

- `hidden` (boolean, observable): whether the panel is hidden. Read with `agent$.hidden.get()`.
- `page` (`'chat' | 'memory' | 'tasks' | 'history' | 'new'`, observable): current page. Read with `agent$.page.get()`.
- `toggleHidden()` (void): toggles visibility and persists to Convex.
- `setHidden(hidden: boolean)` (void): sets visibility and persists to Convex.
- `setPage(page: AgentPanelPage)` (void): navigates between pages and persists to Convex.

Example:

```tsx
import { Button } from '@/components/ui/button';
import { useAgentPanel } from '@/features/agent/features/panel/providers/agentProvider';

export function OpenMemoryButton() {
  const agent$ = useAgentPanel();
  return (
    <Button
      variant="ghost"
      onMouseDown={() => {
        agent$.setPage('memory');
        if (agent$.hidden.get()) agent$.toggleHidden();
      }}
    >
      Open memory
    </Button>
  );
}
```

### Rendering and resizing

`AgentPanel` renders only when not hidden and switches on `page` to show the correct content. Width is persisted with `api.users.setLayoutWidth` under the `agent_panel_width` target and cached locally with the `agentWidthPx` storage key.

### Built-in UI controls

These convenience components are available and already wired to `useAgentPanel`:

- `AgentPanelToggle`: header button to open/close the panel.
- `AgentClose`: close button in the panel header.
- `BackToChatButton`: visible on non-chat pages to return to `chat`.
- `ChatTasksButton`, `ChatMemoryButton`, `ChatHistoryButton`, `NewChatButton`: navigate to their respective pages.

### Hotkeys

- Cmd/Ctrl + J: Toggle the Agent Panel.

### Pages

- `chat`: Primary messaging experience. Default view when the panel opens.
- `memory`: View and manage conversation or user memory.
- `tasks`: View and manage agent tasks or jobs.
- `history`: Browse past chats/sessions.
- `new`: Start a new chat quickly.

### Adding another Agent page

1. Extend the `AgentPanelPage` union in `features/agent/features/panel/types.ts`.
2. Add your page component and map it in the `Switch` within `features/agent/features/panel/index.tsx`.
3. Optionally add a header button that calls `agent$.setPage('your-page')`.

### Notes on persistence

- Visibility is persisted via `api.users.setLayoutHidden` with target `agent_panel_hidden`.
- Current page is persisted via `api.users.setAgentPanelPage`.
- Width is persisted via `api.users.setLayoutWidth` with target `agent_panel_width`.

Deep links via URL query params are intentionally not used. If you need sharable links, consider routing to a page that sets the desired `agent$.setPage(...)` on mount.
