'use client';

import { api } from '@/convex/_generated/api';
import usePresence from '@convex-dev/presence/react';
import FacePile from '@convex-dev/presence/facepile';

export function Presence({ block_id, user_id }: { block_id: string; user_id: string }) {
  const presenceState = usePresence(api.presence, block_id, user_id);

  return (
    <div className="presence flex items-center gap-4 text-muted-foreground">
      <FacePile presenceState={presenceState ?? []} />
    </div>
  );
}
