'use client';

// import { AddTeam } from './add-team-button';
import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { OrgCard } from '../organizations-gallery/card';
import { Empty } from '../invites-gallery/empty';
import { Organization } from '@/features/auth/organizations/types';

export function OrganizationsGallery({
  preloadedOrgs,
}: {
  preloadedOrgs: Preloaded<typeof api.organizations.getUserOrganizations>;
}) {
  const organizations = usePreloadedQuery(preloadedOrgs);

  return (
    <div className="pb-4">
      <div className="grid relative grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 ">
        {Object.values(organizations).map((organization, i) => (
          <OrgCard key={organization.id} organization={organization as Organization} />
        ))}
      </div>
      {/* {invites && invites.length !== 0 ? <AddOrganization/> } */}
      {!organizations ? <Empty /> : null}
    </div>
  );
}
