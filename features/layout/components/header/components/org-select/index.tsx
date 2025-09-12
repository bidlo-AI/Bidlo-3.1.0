import { preloadQuery } from 'convex/nextjs';
import { redirect } from 'next/navigation';
import { OrgSelectClient } from './client';
import { api } from '@/convex/_generated/api';
import { withAuth } from '@workos-inc/authkit-nextjs';

export const OrgSelect = async () => {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.organizations.getUserOrganizations, {}, { token: accessToken });
  const org_id =
    accessToken && JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64url').toString())?.organization;

  //redirect to if no organization is selected (in webOS cookie)
  if (accessToken && !org_id) redirect('/organizations');

  return (
    <div className="org flex items-center">
      <OrgSelectClient preloaded={preloaded} selectedOrg={org_id} />
    </div>
  );
};
