"use client";
import { Button } from "@/components/ui/button";
import { pageHashParams } from "@legendapp/state/helpers/pageHashParams";
import { ChevronsRight } from "lucide-react";

export const AgentClose = () => (
  <Button
    size="icon"
    className="text-muted-foreground"
    variant="ghost"
    onClick={() => pageHashParams.a.delete()}
  >
    <ChevronsRight className="size-4" />
  </Button>
);
