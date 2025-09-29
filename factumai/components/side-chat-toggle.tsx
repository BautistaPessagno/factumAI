"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SideChat } from "@/components/side-chat";
import { MessageSquarePlus } from "lucide-react";

export function SideChatToggle() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sidechat-panel"
      >
        <MessageSquarePlus className="size-4" />
        Assistant
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-[45] bg-background/30 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      <SideChat id="sidechat-panel" open={open} onOpenChange={setOpen} />
    </>
  );
}
