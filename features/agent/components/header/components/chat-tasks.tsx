"use client";
import { Button } from "@/components/ui/button";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { GalleryVerticalEnd } from "lucide-react";

export const ChatTasksButton = () => (
  <Button
    size="icon"
    variant="ghost"
    onMouseDown={() => pageHashParams.a.set("tasks")}
    // onClick={() => pageHashParams.a.set("chat_id")}
  >
    <GalleryVerticalEnd className="size-4" />
  </Button>
);
