'use client';

import { createContext, useContext } from 'react';
import { useObservable } from '@legendapp/state/react';
import { Observable } from '@legendapp/state';
import { CommandPalette } from './CommandPalette';

/**
 * CommandProvider
 * Provides global state and UI for the Command Palette (⌘/Ctrl+K).
 * Mirrors the pattern used by `AgentProvider`/`SidebarProvider` with Legend state.
 */

export interface CommandPaletteState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

export const CommandProviderContext = createContext<Observable<CommandPaletteState> | null>(null);

export function CommandProvider({ children }: { children?: React.ReactNode }) {
  // Local UI state managed via Legend for consistency with other providers
  const state$ = useObservable<CommandPaletteState>({
    open: false,
    setOpen: (open: boolean) => state$.open.set(open),
    toggleOpen: () => state$.setOpen(!state$.open.get()),
  });

  return (
    <CommandProviderContext.Provider value={state$}>
      {children}
      <CommandPalette open$={state$.open} onOpenChange={state$.setOpen} />
    </CommandProviderContext.Provider>
  );
}

export const useCommand = () => {
  const ctx = useContext(CommandProviderContext);
  if (!ctx) throw new Error('useCommand must be used within a CommandProvider');
  return ctx;
};
