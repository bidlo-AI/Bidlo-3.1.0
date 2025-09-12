"use client";
import { Button } from "@/components/ui/button";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { Plus } from "lucide-react";

export const NewChatButton = () => (
  <Button
    size="icon"
    variant="ghost"
    onMouseDown={() => pageHashParams.a.set("new")}
  >
    <Plus className="size-4" />
  </Button>
);
