### Command Dialog

The Command Dialog is a global, keyboard-driven command palette built on `cmdk` and shadcn/ui. It opens with ⌘/Ctrl + K and exposes actions like toggling the agent panel, toggling the sidebar, navigating between pages, and jumping to agent pages.

### State & Provider

- State is provided via `CommandProvider` using `@legendapp/state` observables for minimal re-renders.
- Open/close is controlled by the provider, while the visual dialog is a separate presentational component.

Wrap your app chrome with `CommandProvider` (mounted once near the root):

```tsx
import { CommandProvider } from '@/features/layout/components/command/providers/CommandProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <CommandProvider>{children}</CommandProvider>
);
```

Public shape (for reference):

```ts
type CommandPaletteState = {
  open: boolean;
  setOpen(open: boolean): void;
  toggleOpen(): void;
};
```

Access the observable state via the hook:

```tsx
import { useCommand } from '@/features/layout/components/command/providers/CommandProvider';

export const OpenCommandButton = () => {
  const command$ = useCommand();
  return <button onClick={() => command$.setOpen(true)}>Open Command</button>;
};
```

### Presentational UI Component

The UI lives in a separate, stateless component: `CommandPalette`.

- Path: `features/layout/components/command/providers/CommandPalette.tsx`
- Props:
  - `open$`: `Observable<boolean>` – bound to provider state
  - `onOpenChange(open: boolean)`: updates the `open` state in provider

The provider mounts it for you:

```tsx
// inside CommandProvider
<CommandPalette open$={state$.open} onOpenChange={state$.setOpen} />
```

### Keyboard Shortcuts

- ⌘/Ctrl + K: Open/close Command Dialog
- Ensure `HotkeysProvider` is mounted once at the app shell level; it wires the shortcut to the provider.

```tsx
import { HotkeysProvider } from '@/features/layout/providers/hotkeys';

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <>
    <HotkeysProvider />
    {children}
  </>
);
```

### Triggering from UI

You can open the palette from any component using the provider hook. Example (Search button in sidebar):

```tsx
import { useCommand } from '@/features/layout/components/command/providers/CommandProvider';

export const Search = () => {
  const command$ = useCommand();
  return <button onClick={() => command$.setOpen(true)}>Search</button>;
};
```

### Adding Commands

Commands are implemented inside `CommandPalette` using shadcn/ui wrappers around `cmdk`:

```tsx
import { CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command';

// Inside the CommandPalette list
<CommandGroup heading="Navigate">
  <CommandItem value="go home" onSelect={() => router.push('/')}>Go to Home</CommandItem>
  <CommandItem value="open data" onSelect={() => router.push('/data')}>Open Data</CommandItem>
</CommandGroup>
<CommandSeparator />
<CommandGroup heading="Agent pages">
  <CommandItem value="agent chat" onSelect={() => {/* set page & unhide */}}>Agent: Chat</CommandItem>
  {/* ... */}
</CommandGroup>
```

### Notes

- Uses `@legendapp/state` for ergonomic observable state and granular subscriptions.
- Uses shadcn/ui primitives and `cmdk` for the command experience.
- Keep the dialog component free of open/close logic; delegate state to `CommandProvider`.
