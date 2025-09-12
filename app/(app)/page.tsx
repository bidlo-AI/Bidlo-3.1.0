import { api } from '../../convex/_generated/api';
import UserInfo from '@/features/_dev/user';
import { preloadQuery } from 'convex/nextjs';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { accessToken } = await withAuth();
  const preloaded = await preloadQuery(api.users.getUser, {}, { token: accessToken });

  //redirect to if no organization is selected (in webOS cookie)
  if (accessToken && !JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64url').toString())?.organization)
    redirect('/organizations');

  return (
    <>
      <UserInfo preloaded={preloaded} />
    </>
  );
}
