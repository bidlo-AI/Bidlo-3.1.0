import { api } from '@/convex/_generated/api';
import { Favorites } from '@/features/blocks/components/header/favorites';
import { Presence } from '@/features/blocks/components/header/presence';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { preloadQuery, preloadedQueryResult } from 'convex/nextjs';

export default async function Page({ params }: { params: Promise<{ block_id: string }> }) {
  const { block_id } = await params;
  const { accessToken } = await withAuth();

  //get data
  //! we could just use teh JWT instead of a query

  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });

  const user_id = preloadedQueryResult(preloaded).workos_id;

  return (
    <>
      <Presence block_id={block_id} user_id={user_id} />
      <Favorites />
      <div className="content">BlockPage {block_id}</div>
    </>
  );
}
