import { Button } from '@/components/ui/button';
import { AcceptedToast } from '../../../toasts/accepted';
import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
import { toast } from 'sonner';
import { handleAcceptInvite } from '@/features/auth/organizations/actions/handleAcceptInvite';
import { useObservable } from '@legendapp/state/react';
import { Loading$ } from '@/components/ui/loading';

export const AcceptButton = ({
  workos_invite_id,
  name,
  isLast,
}: {
  workos_invite_id: string;
  name: string;
  isLast: boolean;
}) => {
  const loading$ = useObservable(false);

  const handleAccept = async () => {
    loading$.set(true);
    console.log('handleAccept', workos_invite_id);
    // const invitation_id = invite$.id.get();

    // Accept invite action
    const { error } = await handleAcceptInvite({
      workosInviteId: workos_invite_id,
      // goToOrg: isLast,
    });

    loading$.set(false);
    if (error) return toast.error(error);
    // If this is the only invite & the only team => go to team
    // if (no_teams && isLast) router.push(`/${id}`);
    // If this is the only invite but not the only team => go to teams tab
    else if (isLast) pageHashParams.tab.set('organizations');

    // // Success toast with link to team page
    AcceptedToast({
      name: "You've joined " + name,
    });
  };

  return (
    <Button variant="default" size="xs" className="flex-1 rounded-md" onClick={handleAccept}>
      <Loading$ loading$={loading$} className="size-4" /> Accept
    </Button>
  );
};
