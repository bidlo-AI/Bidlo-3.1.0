'use client';

// import type { Observable } from '@legendapp/state';
// import { Memo } from '@legendapp/state/react';
// import { Media } from '../../invites-gallery/card/media';
// import Link from 'next/link';
// import { Info } from './info';
// import { Actions } from './actions';
import { Organization } from '@/features/auth/organizations/types';
import { handleSwitchOrganization } from '@/features/auth/organizations/actions/switchOrganization';

export const OrgCard = ({ organization }: { organization: Organization }) => {
  //handleers
  const handleSelect = () => handleSwitchOrganization({ workosOrgId: organization.id, goToOrg: true });
  return (
    <button
      onClick={handleSelect}
      className="cursor-pointer relative group/team  rounded-xl overflow-hidden bg-input h-full shadow-[rgba(0,0,0,0.08)_0px_2px_4px_0px,rgba(255,255,255,0.094)_0px_0px_0px_1px]"
    >
      {/* <Actions organization={organization} /> */}
      <div className="relative text-left hover:bg-hover/50 flex items-center justify-between  flex-col">
        {/* <Media organization={organization} /> */}
        <div className="flex-1 w-full flex flex-col pt-2 pb-2.5 px-2.5 space-y-1.5 text-sm">
          <h3 className="truncate relative w-full font-medium text-base">{organization.name}</h3>
          {/* <Info organization={organization} /> */}
        </div>
      </div>
    </button>
  );
};
