import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { Header } from '@/features/auth/components/header';
import { Tabs } from '@/features/auth/organizations/components/tabs';

export default async function Page() {
  const { accessToken } = await withAuth();
  const [preloadedOrgs, preloadedInvites] = await Promise.all([
    preloadQuery(api.organizations.getUserOrganizations, {}, { token: accessToken }),
    preloadQuery(api.organization_invites.getInvites, {}, { token: accessToken }),
  ]);

  return (
    <>
      <Header title="Organizations" />
      <Tabs preloadedOrgs={preloadedOrgs} preloadedInvites={preloadedInvites} />
    </>
  );
}
