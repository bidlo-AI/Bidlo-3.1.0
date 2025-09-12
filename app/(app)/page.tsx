import { api } from '@/convex/_generated/api';
import { UserInfo } from '@/features/_dev/user';
import { preloadQuery } from 'convex/nextjs';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { HistoryButton } from '@/features/agent/components/home/components/history-button';

export default async function Home() {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });

  return (
    <>
      <HistoryButton />
      <div className="content">
        <UserInfo preloaded={preloaded} />
      </div>
    </>
  );
}
