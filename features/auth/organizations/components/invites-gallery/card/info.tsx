import type { Observable } from '@legendapp/state';
import type { TeamInvitation } from '@/features/auth/organizations/types';
import { use$ } from '@legendapp/state/react';
import { formatDistanceToNow } from 'date-fns';
import { Memo } from '@legendapp/state/react';

export const Info = ({ item$: invite$ }: { item$: Observable<TeamInvitation> }) => {
  return null;
  // const time = use$(invite$.created_at);
  // const timeAgo = formatDistanceToNow(new Date(time), {
  //   addSuffix: true,
  // }).replace('about', '');
  // return (
  //   <div className="truncate relative text-muted-foreground w-full">
  //     <span className="capitalize">
  //       <Memo>{invite$.role}</Memo>
  //     </span>{' '}
  //     • {timeAgo}
  //   </div>
  // );
};
