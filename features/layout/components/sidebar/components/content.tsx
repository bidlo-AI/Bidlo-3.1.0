import Link from 'next/link';
import { User } from './user';

// Mobile and desktop sidebar content.
// Kept as a client component so it can render inside the mobile Sheet.
export const SidebarContent = () => {
  console.log('SidebarContent -server');
  return (
    <>
      <User />
      <button>Search</button>
      <Link href="/">Home</Link>
      ---
      <div>
        <label>favorites</label>
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
