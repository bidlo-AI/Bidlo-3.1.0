import { Favorites } from '@/features/blocks/components/header/favorites';
import { Presence } from '@/features/blocks/components/header/presence';
import { More } from '@/features/blocks/components/header/more';

export default async function BlockPage({ params }: { params: Promise<{ block_id: string }> }) {
  const { block_id } = await params;

  const blockType = 'chat';

  return (
    <>
      <Presence block_id={block_id} />
      <div className="actions flex items-center text-muted-foreground">
        <Favorites />
        <More />
      </div>
      <div className="content">
        {blockType === 'chat' ? <Chat block_id={block_id} /> : <Page block_id={block_id} />}
      </div>
    </>
  );
}

const Chat = ({ block_id }: { block_id: string }) => {
  return (
    <div className="flex size-full flex-col justify-between p-4">
      <div>
        <div>Chat</div>
        <div className="text-muted-foreground">Block {block_id}</div>
      </div>

      {/* THE CHAT BAR */}
      <div id="chat-input" className="shadow-sm text-base rounded-3xl bg-muted border h-fit min-h-12 w-full px-4 py-3">
        <span className="text-muted-foreground-opaque">Search or Ask anything...</span>
      </div>
    </div>
  );
};

const Page = ({ block_id }: { block_id: string }) => {
  return (
    <div>
      <div>Page</div>
      <div className="text-muted-foreground">Block {block_id}</div>
    </div>
  );
};
