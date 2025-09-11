import { Plus, UserPlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useUser } from "@/features/auth/providers/user";
import { useObservable, Show } from '@legendapp/state/react';
import { motion } from 'framer-motion';
import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL;

export const Empty = () => {
  // const user$ = useUser();
  // const is_admin = useObservable(() => user$.email.get().endsWith("@bidlo.ai"));
  const is_admin = true;

  //handlers
  const handleViewInvites = () => pageHashParams.tab.set('invites');
  const handleCreateTeam = () => pageHashParams.open.set('true');
  const handleDemo = () => window.open(DEMO_URL, '_blank');

  return (
    <motion.div
      key="check-icon"
      className="w-full flex flex-col items-center justify-center p-16 pt-12 text-sm text-muted-foreground-opaque space-y-1"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <UserPlus2 className="size-10" />
      <p className="text-base">You’re not on any teams yet</p>
      <p>
        <Show if={is_admin} else={'Schedule a demo to create a team for your organization!'}>
          Wait for an invitation or create a new team.
        </Show>
      </p>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" className="text-foreground relative" onClick={handleViewInvites}>
          Invites
        </Button>
        <Show if={is_admin} else={<Button onClick={handleDemo}>Demo</Button>}>
          <Button onClick={handleCreateTeam}>
            <Plus className="size-3.5 -mr-1.5" /> Team
          </Button>
        </Show>
      </div>
    </motion.div>
  );
};
