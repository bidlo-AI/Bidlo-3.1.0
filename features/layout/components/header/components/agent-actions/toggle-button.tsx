"use client";
import { Button } from "@/components/ui/button";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { useMemo } from "react";
import { PanelRight } from "lucide-react";

export const ChatLink = () =>
  useMemo(
    () => (
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground-opaque size-7"
        onMouseDown={() => pageHashParams.a.set("chat")}
      >
        <PanelRight className="size-4" />
      </Button>
    ),
    []
  );
