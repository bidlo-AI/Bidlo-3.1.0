'use client';

import { Switch, use$ } from '@legendapp/state/react';
import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
import { cn } from '@/lib/utils';
import { memo } from 'react';
import { useQuery, Preloaded } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { OrganizationsGallery } from './organizations-gallery';
import { InvitesGallery } from './invites-gallery';
import { Users, Mail, LucideIcon } from 'lucide-react';

// Memoize the TabButton component to prevent unnecessary re-renders
const TabButton = memo(
  ({
    tabValue,
    label,
    icon: Icon,
    default: isDefault,
  }: {
    tabValue: string;
    label: string;
    icon: LucideIcon;
    default?: boolean;
  }) => {
    const isActive = use$(() => {
      const tab = pageHashParams.tab.get();
      return tab === tabValue || (isDefault && !tab);
    });

    return (
      <button
        onClick={() => pageHashParams.tab.set(tabValue)}
        className={cn(
          'relative select-none cursor-pointer flex items-center h-8 px-3 rounded-6 whitespace-nowrap text-sm font-semibold flex-shrink-0 min-w-0 max-w-56 rounded-full',
          isActive ? 'text-foreground bg-secondary' : 'text-muted-foreground hover:bg-secondary ',
        )}
      >
        <Icon className={cn('size-4 mr-1.5')} />
        {label}
        {tabValue === 'invites' && <InvitesCount />}
      </button>
    );
  },
);
TabButton.displayName = 'TabButton';

// Memoize the entire Tabs component
export const Tabs = memo(
  ({
    preloadedOrgs,
    preloadedInvites,
  }: {
    preloadedOrgs: Preloaded<typeof api.organizations.getUserOrganizations>;
    preloadedInvites: Preloaded<typeof api.organization_invites.getInvites>;
  }) => {
    const switchCases = {
      organizations: () => <OrganizationsGallery preloadedOrgs={preloadedOrgs} />,
      invites: () => <InvitesGallery preloadedInvites={preloadedInvites} />,
      default: () => <OrganizationsGallery preloadedOrgs={preloadedOrgs} />,
      undefined: () => <OrganizationsGallery preloadedOrgs={preloadedOrgs} />,
    };

    return (
      <div className="max-w-3xl w-full mx-auto p-2 lg:p-16 gap-4 flex flex-col">
        <div className="flex items-center flex-grow">
          <TabButton tabValue="orgs" label="Organizations" icon={Users} default />
          <TabButton tabValue="invites" label="Invites" icon={Mail} />
        </div>
        <Switch value={pageHashParams.tab}>{switchCases}</Switch>
      </div>
    );
  },
);
Tabs.displayName = 'Tabs';

const InvitesCount = () => {
  const inviteCount = useQuery(api.organization_invites.getInviteCount);
  return inviteCount ? <span className="ml-1">({inviteCount})</span> : null;
};
