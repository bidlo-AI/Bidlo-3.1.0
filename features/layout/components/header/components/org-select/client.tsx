'use client';

import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { handleSwitchOrganization } from '@/features/auth/organizations/actions/switchOrganization';
import { OrgSelectPopoverContent } from './content';
import { Layers } from 'lucide-react';

// Minimal organization shape returned by getUserOrganizations
type OrganizationItem = { id: string; name: string; role: string };

export const OrgSelectClient = ({
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
      <PopoverTrigger className="flex items-center gap-1.5 h-6 p-0.5 pr-1.5 rounded hover:bg-hover cursor-pointer truncate max-w-32">
        <div className="rounded-sm size-5 flex items-center justify-center bg-foreground text-background shrink-0">
          <Layers className="size-4 " />
        </div>
        <div className="truncate">{selected?.name}</div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <OrgSelectPopoverContent items={items} onSelect={onSelect} />
      </PopoverContent>
    </Popover>
  );
};
