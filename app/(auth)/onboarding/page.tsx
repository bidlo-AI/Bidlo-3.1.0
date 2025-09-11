import { withAuth } from '@workos-inc/authkit-nextjs';
import { Header } from '@/features/auth/components/header';

export default async function Page() {
  const { accessToken } = await withAuth();

  return (
    <>
      <Header title="Onboarding" />
      <div>
        Onboarding
        <pre>{JSON.stringify(accessToken, null, 2)}</pre>
      </div>
    </>
  );
}
