"use client";
import { Button } from "@/components/ui/button";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { BookOpen } from "lucide-react";

export const ChatMemoryButton = () => (
  <Button
    size="icon"
    variant="ghost"
    onMouseDown={() => pageHashParams.a.set("memory")}
  >
    <BookOpen className="size-4" />
  </Button>
);
