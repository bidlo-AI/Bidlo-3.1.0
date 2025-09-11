import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { UISyncClient } from './client';

export const UISync = async () => {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });

  return <UISyncClient preloaded={preloaded} />;
};
