'use client';

import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import type { User } from '@workos-inc/node';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + WorkOS
        {user && <UserMenu user={user} onSignOut={signOut} />}
      </header>
      <main className="p-8 flex flex-col gap-8">
        <Content2 />
      </main>
    </>
  );
}

const Content2 = () => {
  const user = useQuery(api.users.getUser, {});
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

function UserMenu({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.email}</span>
      <button onClick={onSignOut} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
        Sign out
      </button>
    </div>
  );
}
