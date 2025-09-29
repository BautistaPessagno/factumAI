"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageSquare, Send } from "lucide-react";

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="flex h-[min(75vh,calc(100dvh-12rem))] flex-col">
        <CardHeader className="border-b py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4" />
            <CardTitle className="text-base">Assistant</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-0">
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
            aria-live="polite"
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
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm md:text-[15px] shadow-sm",
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm",
                    )}
                  >
                    {message.parts.map((part, index) =>
                      part.type === "text" ? <span key={index}>{part.text}</span> : null,
                    )}
                  </div>
                </div>
              );
            })}

            {status !== "ready" ? (
              <div className="px-1 text-xs text-muted-foreground">Thinking…</div>
            ) : null}
          </div>

          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = input.trim();
                if (!trimmed) return;
                sendMessage({ text: trimmed });
                setInput("");
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status !== "ready"}
                placeholder={
                  status !== "ready" ? "Assistant is thinking…" : "Type a message…"
                }
                className="flex-1"
                aria-label="Message input"
              />
              <Button
                type="submit"
                disabled={status !== "ready" || input.trim().length === 0}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
