'use client';

import Link from 'next/link';

// Mobile and desktop sidebar content.
// Kept as a client component so it can render inside the mobile Sheet.
export const SidebarContent = () => {
  return (
    <div>
      <Link href="/">Home</Link>
    </div>
  );
};
