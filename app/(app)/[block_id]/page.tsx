import { Favorites } from '@/features/blocks/components/header/favorites';
import { Presence } from '@/features/blocks/components/header/presence';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { More } from '@/features/blocks/components/header/more';

export default async function Page({ params }: { params: Promise<{ block_id: string }> }) {
  const { block_id } = await params;
  await withAuth();

  return (
    <>
      <Presence block_id={block_id} />
      <div className="actions flex items-center text-muted-foreground">
        <Favorites />
        <More />
      </div>
      <div className="content">BlockPage {block_id}</div>
    </>
  );
}
