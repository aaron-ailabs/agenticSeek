"use client";

import { useState } from "react";
import useSWR from "swr";
import { Save, CheckCircle, AlertCircle, Database, Plus } from "lucide-react";

type MemoryData = Record<string, string>;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function MemoryViewer() {
  const { data, error, isLoading, mutate } = useSWR<MemoryData>("/api/memory", fetcher);

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const entries = data ? Object.entries(data) : [];

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: newKey.trim(), value: newValue.trim() }),
      });
      if (res.ok) {
        setSaveStatus("success");
        setNewKey("");
        setNewValue("");
        mutate();
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Current memory entries */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--surface-border)" }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: "var(--surface-raised)",
            borderBottom: "1px solid var(--surface-border)",
          }}
        >
          <Database size={14} strokeWidth={1.8} style={{ color: "var(--muted)" }} />
          <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            Current Memory
          </span>
          <span
            className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid var(--accent-glow)",
            }}
          >
            {entries.length} keys
          </span>
        </div>

        {isLoading ? (
          <div className="px-4 py-8 text-center text-xs font-mono" style={{ color: "var(--muted)" }}>
            Loading memory...
          </div>
        ) : error ? (
          <div className="px-4 py-8 text-center text-xs font-mono" style={{ color: "var(--danger)" }}>
            Failed to load memory. Backend may be unreachable.
          </div>
        ) : entries.length === 0 ? (
          <div className="px-4 py-8 text-center text-xs font-mono" style={{ color: "var(--muted)" }}>
            No memory entries found.
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--surface-border)" }}>
            {entries.map(([key, value]) => (
              <div key={key} className="flex gap-4 px-4 py-3 items-start">
                <div className="w-40 flex-shrink-0">
                  <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>
                    {key}
                  </span>
                </div>
                <p
                  className="flex-1 text-sm leading-relaxed break-all"
                  style={{ color: "var(--foreground)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / update entry form */}
      <div
        className="rounded-xl p-5 space-y-4"
        style={{
          background: "var(--surface-raised)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div className="flex items-center gap-2">
          <Plus size={14} strokeWidth={2} style={{ color: "var(--muted)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Set Memory Entry
          </span>
        </div>

        <form onSubmit={handleAdd} className="space-y-3" aria-label="Add memory entry">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="mem-key" className="block text-xs font-mono mb-1" style={{ color: "var(--muted)" }}>
                Key
              </label>
              <input
                id="mem-key"
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="e.g. user_preference"
                className="w-full rounded-lg px-3 py-2 text-sm font-mono outline-none"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--foreground)",
                  fontSize: "16px",
                }}
              />
            </div>
            <div>
              <label htmlFor="mem-value" className="block text-xs font-mono mb-1" style={{ color: "var(--muted)" }}>
                Value
              </label>
              <input
                id="mem-value"
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="e.g. dark mode"
                className="w-full rounded-lg px-3 py-2 text-sm font-mono outline-none"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--foreground)",
                  fontSize: "16px",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={saveStatus === "saving" || !newKey.trim() || !newValue.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--accent)", color: "var(--background)" }}
            >
              <Save size={14} strokeWidth={2} />
              {saveStatus === "saving" ? "Saving..." : "Save"}
            </button>

            {saveStatus === "success" && (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--success)" }}>
                <CheckCircle size={14} /> Saved
              </span>
            )}
            {saveStatus === "error" && (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--danger)" }}>
                <AlertCircle size={14} /> Failed to save
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
