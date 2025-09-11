import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { UISyncClient } from './client';

export const UISync = async ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = await withAuth();
  const preloadedUser = await preloadQuery(api.users.getUser, {}, { token: accessToken });

  return <UISyncClient preloadedUser={preloadedUser}>{children}</UISyncClient>;
};
