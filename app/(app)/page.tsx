import { api } from '@/convex/_generated/api';
import { UserInfo } from '@/features/_dev/user';
import { preloadQuery } from 'convex/nextjs';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function Home() {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });

  return <UserInfo preloaded={preloaded} />;
}
