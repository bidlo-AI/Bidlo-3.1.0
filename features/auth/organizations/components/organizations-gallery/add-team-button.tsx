import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { Plus } from "lucide-react";

export const AddTeam = () => {
  const handleCreateTeam = () => pageHashParams.open.set("true");

  return (
    <button
      onClick={handleCreateTeam}
      className="hover:bg-hover cursor-pointer size-full border rounded-xl min-h-10 flex items-center justify-center text-muted-foreground gap-1.5"
    >
      <Plus className="size-4" />
      <span>New Team</span>
    </button>
  );
};
