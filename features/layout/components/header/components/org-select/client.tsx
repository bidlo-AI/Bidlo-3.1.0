'use client';

import { api } from '@/convex/_generated/api';
import { Authenticated, Preloaded, usePreloadedQuery } from 'convex/react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { handleSwitchOrganization } from '@/features/auth/organizations/actions/switchOrganization';
import { OrgSelectPopoverContent } from './content';

// Minimal organization shape returned by getUserOrganizations
type OrganizationItem = { id: string; name: string; role: string };

export const OrgSelectClient = ({
  preloaded,
  selectedOrg,
}: {
  preloaded: Preloaded<typeof api.organizations.getUserOrganizations>;
  selectedOrg: string;
}) => {
  return (
    <Authenticated>
      <Inner preloaded={preloaded} selectedOrg={selectedOrg} />
    </Authenticated>
  );
};

export const Inner = ({
  preloaded,
  selectedOrg,
}: {
  preloaded: Preloaded<typeof api.organizations.getUserOrganizations>;
  selectedOrg: string;
}) => {
  // Load organizations from the preloaded query
  const organizations = usePreloadedQuery(preloaded) as Record<string, OrganizationItem>;
  const items: OrganizationItem[] = useMemo(() => Object.values(organizations ?? {}), [organizations]);
  const selected = organizations?.[selectedOrg];

  // Local state for popover open/close
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Handle selecting an organization by switching via WorkOS, then refresh
  const onSelect = async (orgId: string) => {
    if (!orgId || orgId === selectedOrg) {
      setOpen(false);
      return;
    }
    await handleSwitchOrganization({ workosOrgId: orgId, goToOrg: false });
    setOpen(false);
    router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{selected?.name}</PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <OrgSelectPopoverContent items={items} onSelect={onSelect} />
      </PopoverContent>
    </Popover>
  );
};
