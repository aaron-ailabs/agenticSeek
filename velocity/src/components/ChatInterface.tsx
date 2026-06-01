"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessageBubble, { Message } from "./ChatMessageBubble";
import ChatInputBar from "./ChatInputBar";
import { Bot } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello. I'm Velocity — your AI agent. Describe a task and I'll get to work.",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(prompt: string) {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const result: string = data.result ?? "No response from agent.";
      const agentMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: result,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Failed to reach the agent. Please check your configuration.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex gap-3 items-start">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--surface-border)",
              }}
              aria-hidden="true"
            >
              <Bot size={14} strokeWidth={1.8} style={{ color: "var(--muted)" }} />
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--surface-border)",
              }}
              role="status"
              aria-label="Agent thinking"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    background: "var(--muted)",
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2">
        <ChatInputBar onSend={handleSend} disabled={loading} />
        <p className="text-center text-[10px] mt-2 font-mono" style={{ color: "var(--muted)" }}>
          Velocity may make mistakes. Verify important outputs.
        </p>
      </div>
    </div>
  );
}
