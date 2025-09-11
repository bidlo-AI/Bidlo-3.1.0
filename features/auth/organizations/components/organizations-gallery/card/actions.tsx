export const Actions = () => {
  return <div>Actions</div>;
};

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useObservable, use$ } from "@legendapp/state/react";
// import { Observable } from "@legendapp/state";
// import { cn } from "@/lib/utils";
// import { MoreHorizontal } from "lucide-react";
// import { Team } from "@/features/teams/types/team";
// import { deleteTeam } from "@/features/teams/actions/team";
// import { useState } from "react";
// import { LoadingSpinner } from "@/components/ui/loading";
// import { SuccessToast } from "@/components/toasts/success";
// import { ErrorToast } from "@/components/toasts/error";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// interface ActionsProps {
//   team$: Observable<Team>;
// }

// export const Actions = ({ team$ }: ActionsProps) => {
//   const open$ = useObservable(false);
//   const open = use$(open$);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);

//   // Get team data
//   const teamId = use$(team$.id);
//   const teamName = use$(team$.name);

//   // Assuming the user is the owner for now
//   // In a real app, you would get this from user context or the team data
//   const isOwner = true;

//   // Handlers
//   const handleOpenChange = (open: boolean) => {
//     open$.set(open);
//   };

//   const handleDeleteClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowDeleteDialog(true);
//     open$.set(false);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!isOwner) {
//       return;
//     }

//     try {
//       setIsDeleting(true);
//       await deleteTeam({ team_id: teamId });
//       team$.delete();
//       SuccessToast({ message: "Team deleted successfully" });
//       // No need to redirect as the team will disappear from the list
//     } catch (error) {
//       console.error("Failed to delete team:", error);
//       ErrorToast({ message: "Failed to delete team. Please try again." });
//     } finally {
//       setIsDeleting(false);
//       setShowDeleteDialog(false);
//     }
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteDialog(false);
//   };

//   return (
//     <>
//       <DropdownMenu open={open} onOpenChange={handleOpenChange}>
//         <DropdownMenuTrigger asChild>
//           <button
//             disabled={isDeleting}
//             className={cn(
//               open ? "" : "opacity-0 group-hover/team:opacity-100",
//               "absolute z-10 right-2 top-2 bg-black/60 backdrop-blur rounded-md border border-black/40 p-1 cursor-pointer",
//               isDeleting && "opacity-50 cursor-not-allowed"
//             )}
//           >
//             <MoreHorizontal className="size-4" />
//           </button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent
//           onClick={(e) => e.stopPropagation()}
//           className="max-w-[150px]"
//           align="start"
//           side="right"
//         >
//           <DropdownMenuGroup>
//             <DropdownMenuItem disabled>Edit</DropdownMenuItem>
//             <DropdownMenuItem disabled={isOwner}>Leave</DropdownMenuItem>
//             <DropdownMenuItem
//               disabled={!isOwner || isDeleting}
//               className={
//                 !isOwner ? "text-muted-foreground" : "text-destructive"
//               }
//               onClick={handleDeleteClick}
//             >
//               {isDeleting ? <LoadingSpinner className="size-4" /> : "Delete"}
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent className="sm:max-w-sm">
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Team</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete the team &quot;{teamName}&quot;?
//               This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={handleDeleteCancel}>
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteConfirm}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//               disabled={isDeleting}
//             >
//               {isDeleting ? <LoadingSpinner className="size-4 mr-2" /> : null}
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };
