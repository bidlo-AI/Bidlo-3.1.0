export const Media = () => {
  return <div>Media</div>;
};
// import type { Observable } from '@legendapp/state';
// import type { Organization } from '@/features/auth/organizations/types';
// import { use$ } from '@legendapp/state/react';
// import { Show } from '@legendapp/state/react';
// import Image from 'next/image';

// export const Media = ({ team$ }: { team$: Observable<Organization> }) => {
//   const alt = use$(() => team$.name.get() + ' avatar');
//   const avatarUrl = use$(() => team$.avatar.get() ?? team$.default_contractor.icon.get());

//   return (
//     <div className="w-full">
//       <div className="relative h-[120px] pointer-events-none overflow-hidden bg-[rgba(255,255,255,0.03)] flex items-center justify-center over">
//         <Show if={avatarUrl} else={<FallbackMedia team$={team$} />}>
//           <>
//             <Image src={avatarUrl} alt={alt} fill className="absolute object-cover blur-2xl z-0" />
//             <Image
//               src={avatarUrl}
//               alt={alt}
//               height={80}
//               width={80}
//               className="absolute object-cover rounded-xl z-10 shadow-sm"
//             />
//           </>
//         </Show>
//       </div>
//     </div>
//   );
// };

// const FallbackMedia = ({ team$ }: { team$: Observable<Organization> }) => {
//   const alt = use$(() => team$.name.get() + ' avatar');
//   const fallbackUrl = use$(
//     () =>
//       `https://api.dicebear.com/9.x/initials/svg?seed=${team$.name.get()}&backgroundColor=fb8c00,e53935,fdd835,d81b60,43a047,039be5,5e35b1,ffb300,f4511e,8e24aa,3949ab,1e88e5&backgroundType[]&fontFamily=sans-serif&chars=1`,
//   );
//   return (
//     <>
//       <img src={fallbackUrl} alt={alt} className="absolute object-cover blur-2xl z-0" />
//       <img src={fallbackUrl} alt={alt} className="size-20 absolute object-cover rounded-xl z-10 shadow-sm" />
//     </>
//   );
// };
