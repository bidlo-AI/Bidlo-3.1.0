import { useCallback } from 'react';
import { useQueryState, parseAsString } from 'nuqs';

// Central hook for Agent Panel state, backed by the `a` query param via Nuqs.
// Exposes current page, setters, and convenience helpers.
export const useAgentPanel = () => {
  const [page, setPage] = useQueryState('a', parseAsString);

  const open = useCallback(() => setPage('chat'), [setPage]);
  const close = useCallback(() => setPage(null), [setPage]);
  const toggle = useCallback(() => setPage((current) => (current ? null : 'chat')), [setPage]);
  const go = useCallback((nextPage: string) => setPage(nextPage), [setPage]);

  return { page, setPage, open, close, toggle, go };
};
