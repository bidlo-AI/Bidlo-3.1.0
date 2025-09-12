import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { ThemeClient } from '@/features/layout/components/theme/client';

export async function ThemeSubscription() {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });

  return <ThemeClient preloaded={preloaded} />;
}
