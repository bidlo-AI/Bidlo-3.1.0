'use client';

import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import type { User } from '@workos-inc/node';

export default function UserInfo({ preloaded }: { preloaded: Preloaded<typeof api.users.getUser> }) {
  const user = usePreloadedQuery(preloaded);
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + WorkOS
        {user && <UserMenu user={user} />}
      </header>
      <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-md">
        <h2 className="text-xl font-bold">Reactive client-loaded data (using server data during hydration)</h2>
        <code>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </code>
      </div>
    </>
  );
}

function UserMenu({ user }: { user: User }) {
  const { signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.email}</span>
      <button onClick={() => signOut()} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
        Sign out
      </button>
    </div>
  );
}
