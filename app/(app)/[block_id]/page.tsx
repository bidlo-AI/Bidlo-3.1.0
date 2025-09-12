import { Favorites } from '@/features/blocks/components/header/favorites';
import { Presence } from '@/features/blocks/components/header/presence';

export default function Page({ params }: { params: { block_id: string } }) {
  return (
    <>
      <Presence />
      <Favorites />
      <div className="content">BlockPage {params.block_id}</div>
    </>
  );
}
