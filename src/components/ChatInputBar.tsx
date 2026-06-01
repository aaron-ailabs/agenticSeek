"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputBarProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInputBar({ onSend, disabled = false }: ChatInputBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
  }, [value]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3 px-4 py-3 rounded-xl"
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--surface-border)",
      }}
      aria-label="Chat input"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Send a message to Velocity..."
        className="flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted font-sans min-h-[24px]"
        style={{ color: "var(--foreground)" }}
        aria-label="Message input"
        aria-multiline="true"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: "var(--accent)",
          color: "var(--background)",
        }}
        aria-label="Send message"
      >
        <SendHorizonal size={16} strokeWidth={2} />
      </button>
    </form>
  );
}
