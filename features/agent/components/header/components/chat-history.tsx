"use client";
import { Button } from "@/components/ui/button";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { History } from "lucide-react";

export const ChatHistoryButton = () => (
  <Button
    size="icon"
    variant="ghost"
    onMouseDown={() => pageHashParams.a.set("history")}
  >
    <History className="size-4" />
  </Button>
);
