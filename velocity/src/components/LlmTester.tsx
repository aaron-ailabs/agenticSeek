"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Cpu, Copy, Check } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function LlmTester() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [prompt]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || status === "loading") return;
    setStatus("loading");
    setResult(null);
    try {
      const res = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      const data = await res.json();
      setResult(data.result ?? JSON.stringify(data, null, 2));
      setStatus("success");
    } catch {
      setResult("Request failed. Check your backend connection and Groq API key.");
      setStatus("error");
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Prompt form */}
      <div
        className="rounded-xl p-5 space-y-4"
        style={{
          background: "var(--surface-raised)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div className="flex items-center gap-2">
          <Cpu size={14} strokeWidth={1.8} style={{ color: "var(--muted)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Prompt
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" aria-label="LLM test form">
          <textarea
            ref={textareaRef}
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt to send directly to the LLM..."
            disabled={status === "loading"}
            className="w-full resize-none rounded-lg px-4 py-3 text-sm leading-relaxed font-sans outline-none disabled:opacity-50"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              color: "var(--foreground)",
              fontSize: "16px",
            }}
            aria-label="LLM prompt"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
              POST /api/llm — returns <code>result</code>
            </span>
            <button
              type="submit"
              disabled={status === "loading" || !prompt.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--accent)", color: "var(--background)" }}
              aria-label="Send prompt"
            >
              <SendHorizonal size={14} strokeWidth={2} />
              {status === "loading" ? "Running..." : "Run"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading state */}
      {status === "loading" && (
        <div
          className="rounded-xl px-5 py-4 flex items-center gap-3"
          style={{
            background: "var(--surface-raised)",
            border: "1px solid var(--surface-border)",
          }}
          role="status"
          aria-label="LLM generating"
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
          <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
            Generating...
          </span>
        </div>
      )}

      {/* Result */}
      {result && status !== "loading" && (
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--surface-border)" }}
        >
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{
              background: "var(--surface-raised)",
              borderBottom: "1px solid var(--surface-border)",
            }}
          >
            <span
              className="text-[10px] font-mono uppercase tracking-wider"
              style={{ color: status === "error" ? "var(--danger)" : "var(--success)" }}
            >
              {status === "error" ? "Error" : "Result"}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded transition-colors"
              style={{ color: "var(--muted)" }}
              aria-label="Copy result"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div
            className="px-5 py-4 text-sm leading-relaxed font-mono whitespace-pre-wrap break-words max-h-96 overflow-y-auto"
            style={{
              background: "var(--surface)",
              color: status === "error" ? "var(--danger)" : "var(--foreground)",
            }}
          >
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
