'use client';

// import type { Observable } from "@legendapp/state";
// import type { TeamInvitation } from "@/features/teams/types/team";
import { Memo } from '@legendapp/state/react';
import { Badge } from '@/components/ui/badge';
// import { Media } from "./media";
// import { Info } from "./info";
import { AcceptButton } from './buttons/accept-button';
import { DeclineButton } from './buttons/decline-button';
import { TeamInvitation } from '@/features/auth/organizations/types';

export const InviteCard = ({ invite, isLast }: { invite: TeamInvitation; isLast: boolean }) => {
  if (!invite.organization) return null;
  return (
    <div className="text-inherit no-underline select-none  rounded-xl overflow-hidden bg-input h-full shadow-[rgba(0,0,0,0.08)_0px_2px_4px_0px,rgba(255,255,255,0.094)_0px_0px_0px_1px]">
      <div className="relative text-left hover:bg-hover/50 flex items-center justify-between  flex-col">
        <Badge className="absolute top-2 left-2 z-10">Invite</Badge>
        {/* <Media team$={invite$.team} /> */}
        <div className="flex-1 w-full flex flex-col pt-2 pb-2.5 px-2.5 space-y-1.5 text-sm">
          <h3 className="truncate relative w-full font-medium text-base">
            <Memo>{invite.organization.name}</Memo>
          </h3>
          {/* <Info item$={invite} /> */}
          <div className="flex gap-1.5 mt-auto truncate relative w-full pt-2">
            <DeclineButton workos_invite_id={invite.workos_invite_id} last_invite={isLast} no_teams={false} />
            <AcceptButton workos_invite_id={invite.workos_invite_id} name={invite.organization.name} isLast={isLast} />
          </div>
        </div>
      </div>
    </div>
  );
};
