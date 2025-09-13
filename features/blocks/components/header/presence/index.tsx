'use client';

import { api } from '@/convex/_generated/api';
import usePresence from '@convex-dev/presence/react';
// import usePresence from './hooks/usePresence';
import FacePile from '@convex-dev/presence/facepile';

export function Presence({ block_id, email }: { block_id: string; email: string }) {
  const presenceState = usePresence(api.presence, block_id, email);

  return (
    <div className="presence flex items-center gap-4 text-muted-foreground">
      <FacePile presenceState={presenceState ?? []} />
    </div>
  );
}
