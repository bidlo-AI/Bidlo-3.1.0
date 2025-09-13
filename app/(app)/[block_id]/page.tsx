import { Favorites } from '@/features/blocks/components/header/favorites';
import { Presence } from '@/features/blocks/components/header/presence';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function Page({ params }: { params: Promise<{ block_id: string }> }) {
  const { block_id } = await params;
  const { accessToken } = await withAuth();
  const email = accessToken && JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64url').toString()).email;

  return (
    <>
      <Presence block_id={block_id} email={email} />
      <Favorites />
      <div className="content">BlockPage {block_id}</div>
    </>
  );
}
