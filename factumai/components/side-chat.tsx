"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronRight, MessageSquare, Send } from "lucide-react";

export type SideChatProps = {
  id?: string;
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
  className?: string;
};

export function SideChat({ id, open, onOpenChange, className }: SideChatProps) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const [messageInput, setMessageInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <aside
      id={id}
      aria-hidden={!open}
      className={cn(
        "fixed right-0 top-0 z-50 h-screen w-[360px] md:w-[420px]",
        "border-l bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60",
        "flex flex-col transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full",
        className,
      )}
    >
      <header className="h-12 border-b flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4" />
          <span className="text-sm font-medium">Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Collapse chat"
            onClick={() => onOpenChange(false)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </header>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {messages.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            Start a conversation by typing a message.
          </div>
        ) : null}

        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={cn("flex", isUser ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                  isUser
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm",
                )}
              >
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <span key={index}>{part.text}</span>
                  ) : null,
                )}
              </div>
            </div>
          );
        })}

        {status !== "ready" ? (
          <div className="text-xs text-muted-foreground px-1">Thinking…</div>
        ) : null}
      </div>

      <div className="p-3 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = messageInput.trim();
            if (!trimmed) return;
            sendMessage({ text: trimmed });
            setMessageInput("");
          }}
          className="flex gap-2"
        >
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={status !== "ready"}
            placeholder={status !== "ready" ? "Assistant is thinking…" : "Type a message…"}
            className="flex-1"
            aria-label="Message input"
          />
          <Button
            type="submit"
            disabled={status !== "ready" || messageInput.trim().length === 0}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </aside>
  );
}
