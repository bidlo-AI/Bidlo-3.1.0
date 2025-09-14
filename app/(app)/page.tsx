import { withAuth } from '@workos-inc/authkit-nextjs';
import { HistoryButton } from '@/features/agent/components/home/components/history-button';
import { PromptInput } from '@/features/agent/components/home/components/prompt-input';
// import Link from 'next/link';

export default async function Home() {
  // Ensure this page is gated by auth; we don't need the token here.
  await withAuth();

  return (
    <>
      <HistoryButton />
      <div className="content flex flex-col items-center pt-[15vh] gap-10 max-w-[640px] w-full mx-auto px-1.5">
        <span className="font-h2 -mb-4 mx-auto" style={{ fontWeight: 600 }}>
          <span className="bg-gradient-to-r from-blue-foreground via-blue to-blue-foreground bg-clip-text text-transparent">
            Hi Ross,
          </span>{' '}
          how can I help?
        </span>
        <PromptInput />
        {/* <Link href="/chat_block" className="w-full">
          <div
            id="chat-input"
            className="shadow-sm text-base rounded-3xl bg-muted border h-fit min-h-12 w-full px-4 py-3"
          >
            <input className="text-muted-foreground-opaque"
            placeholder="Search or Ask anything..."
            />
          </div>
        </Link> */}
        {/* <UserInfo preloaded={preloaded} /> */}
        {/* <div className="w-full flex flex-col gap-2">
          <span className="font-label">Recent</span>
          <div className="flex gap-3 overflow-hidden">
            <RecentCard />
            <RecentCard />
            <RecentCard />
            <RecentCard />
            <RecentCard />
            <RecentCard />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <span className="font-label">News feed</span>
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div> */}
      </div>
    </>
  );
}

export const RecentCard = () => (
  <div className="flex gap-1.5">
    <div className="rounded-2xl bg-muted h-40 aspect-[2/3]"></div>
  </div>
);

export const NewsCard = () => <div className="w-full rounded-2xl mb-4 bg-muted aspect-[3/2]"></div>;

//! BLOCK TYPES
// - Chat Thread
// - Page (single/multiple widets)
// - Document
