'use client';
import { Input$ as Input } from '@/components/ui/input';
import { IconInput } from './icon-input';
import { StateInput } from './state-input';
import { EmailInput } from './email-input';
import { Label } from './label';
import { Observable } from '@legendapp/state';
import { NewOrganization } from '@/features/auth/organizations/types';
import { ContractorInput } from './contractor-input';

export const NewTeamForm = ({
  form$,
  file$,
  onSubmit,
}: {
  form$: Observable<NewOrganization>;
  file$: Observable<File | undefined>;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Label className="mt-0">Icon & name</Label>
      <div className="flex items-center gap-1.5">
        <IconInput team$={form$} file$={file$} />
        <Input $value={form$.name} className="text-sm pb-2 placeholder:text-sm" placeholder="The banana stand" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-4">
        <div>
          <Label>State</Label>
          <StateInput $value={form$.default_state as Observable<string>} />
        </div>
        <div>
          <Label>Contractor</Label>
          {/* <ContractorInput $value={form$.default_contractor} /> */}
        </div>
      </div>
      <Label>Members</Label>
      <EmailInput $value={form$.members} />
    </form>
  );
};
