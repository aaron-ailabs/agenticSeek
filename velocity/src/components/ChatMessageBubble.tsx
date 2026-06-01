import { User, Bot } from "lucide-react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface ChatMessageBubbleProps {
  message: Message;
}

export default function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          background: isUser ? "var(--accent-dim)" : "var(--surface-raised)",
          border: `1px solid ${isUser ? "var(--accent-glow)" : "var(--surface-border)"}`,
        }}
        aria-hidden="true"
      >
        {isUser ? (
          <User size={14} strokeWidth={1.8} style={{ color: "var(--accent)" }} />
        ) : (
          <Bot size={14} strokeWidth={1.8} style={{ color: "var(--muted)" }} />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-sans ${
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={{
          background: isUser ? "var(--accent-dim)" : "var(--surface-raised)",
          border: `1px solid ${isUser ? "var(--accent-glow)" : "var(--surface-border)"}`,
          color: isUser ? "var(--foreground)" : "var(--foreground)",
        }}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <span
          className="block mt-1.5 text-[10px] font-mono"
          style={{ color: "var(--muted)" }}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
