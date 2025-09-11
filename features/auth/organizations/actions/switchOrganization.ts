'use server';

import { withAuth, switchToOrganization } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';
// Note: Using AuthKit's built-in switchToOrganization keeps session in sync

export async function handleSwitchOrganization({ workosOrgId, goToOrg }: { workosOrgId: string; goToOrg: boolean }) {
  // Ensure the user is authenticated before switching organizations
  const { user } = await withAuth({ ensureSignedIn: true });

  if (!user?.id) {
    throw new Error('User not authenticated');
  }

  // Switch the active WorkOS organization for the current session.
  // We disable automatic revalidation/redirect here and handle navigation below.
  await switchToOrganization(workosOrgId, { revalidationStrategy: 'none' });

  // Optionally navigate after switching
  if (goToOrg) redirect(`/`);
}
