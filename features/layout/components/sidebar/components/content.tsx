import Link from 'next/link';
import { User } from './user';
import { api } from '@/convex/_generated/api';
import { Preloaded } from 'convex/react';

// Mobile and desktop sidebar content.
// Kept as a client component so it can render inside the mobile Sheet.
export const SidebarContent = ({ preloadedUser }: { preloadedUser: Preloaded<typeof api.users.getUser> }) => {
  console.log('SidebarContent -server');
  return (
    <>
      <User preloadedUser={preloadedUser} />
      <button>Search</button>
      <Link href="/">Home</Link>
      ---
      <div>
        <label>favorites</label>
        <Link href="/block_1">Block 1</Link>
        <Link href="/block_2">Block 2</Link>
        <Link href="/block_3">Block 3</Link>
      </div>
      ---
      <div>
        <label>Public</label>
      </div>
      ---
      <div>
        <label>shared</label>
      </div>
      ---
      <div>
        <label>private</label>
      </div>
      ---
      <Link href="/">Data</Link>
      <Link href="/">Data</Link>
      <button>Settings</button>
    </>
  );
};
