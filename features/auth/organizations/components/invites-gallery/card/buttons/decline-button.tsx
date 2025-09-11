import { Button } from '@/components/ui/button';
import { DeclinedToast } from '../../../toasts/declined';
import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
import { toast } from 'sonner';
import { handleDeclineInvite } from '@/features/auth/organizations/actions/handleDeclineInvite';

export const DeclineButton = ({
  workos_invite_id,
  last_invite,
  no_teams,
}: {
  workos_invite_id: string;
  last_invite: boolean;
  no_teams: boolean;
}) => {
  const handleDecline = async () => {
    // Decline invite action
    const { error } = await handleDeclineInvite(workos_invite_id);
    if (error) return toast.error(error);

    // If this is the only invite & but there are teams => go to teams tab
    if (!no_teams && last_invite) pageHashParams.tab.set('organizations');

    // Team removed toast
    DeclinedToast();
  };

  return (
    <Button variant="outline" size="xs" className="flex-1 rounded-md" onClick={handleDecline}>
      Decline
    </Button>
  );
};
