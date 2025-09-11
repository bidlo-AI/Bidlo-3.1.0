'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useObservable, use$ } from '@legendapp/state/react';
import { pageHashParams } from '@legendapp/state/helpers/pageHashParams';
import { NewOrganization } from '@/features/auth/organizations/types';
import { LearnMore } from './learn-more';
import { NewTeamForm } from './new-team-form';
import { SubmitButton } from './submit-button';
import { NewTeamToast } from '../../toasts/new-team';
import { batch } from '@legendapp/state';

export const AddTeamDialog = () => {
  const open = use$(() => pageHashParams.open.get() === 'true');
  const loading$ = useObservable(false);
  const file$ = useObservable<File | undefined>(undefined);
  const form$ = useObservable<NewOrganization>(emptyTeam);

  //handlers
  const handleOpenChange = (open: boolean) => {
    if (open) return pageHashParams.open.set('true');
    batch(() => {
      form$.set(emptyTeam);
      file$.set(undefined);
      pageHashParams.open.delete();
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // loading$.set(true);

    // try {
    //   const form = form$.get();
    //   const file = file$.get();

    //   //save to db
    //   const basePayload = {
    //     name: form.name,
    //     avatar_url:
    //       form.avatar ||
    //       form.default_contractor?.icon ||
    //       `https://api.dicebear.com/9.x/initials/svg?seed=${
    //         form.name || "banana"
    //       }&backgroundColor=fb8c00,e53935,fdd835,d81b60,43a047,039be5,5e35b1,ffb300,f4511e,8e24aa,3949ab,1e88e5&backgroundType[]&fontFamily=sans-serif&chars=1`,
    //     default_state: form.default_state,
    //     default_contractor: form.default_contractor,
    //     invitations: form.members,
    //     redirect: false,
    //   };

    //   // Type-safe way to add the optional avatar_file
    //   const payload = file
    //     ? { ...basePayload, avatar_file: file as File }
    //     : basePayload;

    //   const result = await createTeam(payload);

    //   // Make sure result exists before accessing its properties
    //   if (result?.data) {
    //     NewTeamToast({
    //       id: result.data.id,
    //       name: form.name,
    //     });

    //     // Close the dialog
    //     handleOpenChange(false);
    //   } else {
    //     console.error(
    //       "Error creating team:",
    //       result?.serverError || result?.validationErrors || "Unknown error"
    //     );
    //   }
    // } catch (error) {
    //   console.error("Exception creating team:", error);
    // } finally {
    //   loading$.set(false);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="contents">
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Collaborate in a shared workspace—share data, run analyses together, and stay in sync.
          </DialogDescription>
        </DialogHeader>
        <NewTeamForm form$={form$} file$={file$} onSubmit={handleSubmit} />
        <DialogFooter className="mt-[22px] w-full flex justify-between ">
          <LearnMore />
          <SubmitButton form$={form$} loading$={loading$} handleSubmit={handleSubmit} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const emptyTeam: NewOrganization = {
  name: '',
  avatar: '',
  id: '',
  role: 'owner',
  default_state: '',
  default_contractor: {
    id: '',
    name: '',
    icon: '',
  },
  members: [],
};
