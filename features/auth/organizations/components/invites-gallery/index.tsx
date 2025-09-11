'use client';

import { InviteCard } from './card';
import { Empty } from './empty';
import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { TeamInvitation } from '@/features/auth/organizations/types';
export function InvitesGallery({
  preloadedInvites,
}: {
  preloadedInvites: Preloaded<typeof api.organization_invites.getInvites>;
}) {
  const invites = usePreloadedQuery(preloadedInvites);

  return (
    <div className="pb-4">
      <div className="grid relative grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 ">
        {invites?.map((invite, i) => (
          <InviteCard key={invite._id} invite={invite as TeamInvitation} isLast={invites.length === i + 1} />
        ))}
      </div>
      {!invites ? <Empty /> : null}
    </div>
  );
}
