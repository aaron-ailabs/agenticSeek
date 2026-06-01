"use client";

import { useState } from "react";
import { Eye, EyeOff, Save, CheckCircle, AlertCircle } from "lucide-react";

type FieldKey = "groq" | "neon" | "redis";

interface Field {
  key: FieldKey;
  label: string;
  placeholder: string;
  description: string;
  isSecret?: boolean;
}

const FIELDS: Field[] = [
  {
    key: "groq",
    label: "Groq API Key",
    placeholder: "gsk_...",
    description: "Your Groq API key for LLM inference. Get one at console.groq.com.",
    isSecret: true,
  },
  {
    key: "neon",
    label: "Neon Database URL",
    placeholder: "postgresql://user:pass@host/db",
    description: "PostgreSQL connection string for your Neon serverless database.",
    isSecret: true,
  },
  {
    key: "redis",
    label: "Upstash Redis URL",
    placeholder: "redis://default:token@host:port",
    description: "Upstash Redis URL for caching, sessions, and ephemeral state.",
    isSecret: true,
  },
];

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function SettingsForm() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    groq: "",
    neon: "",
    redis: "",
  });
  const [visible, setVisible] = useState<Record<FieldKey, boolean>>({
    groq: false,
    neon: false,
    redis: false,
  });
  const [status, setStatus] = useState<SaveStatus>("idle");

  function toggleVisible(key: FieldKey) {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groq: values.groq, neon: values.neon, redis: values.redis }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6" aria-label="Settings form">
      {FIELDS.map(({ key, label, placeholder, description, isSecret }) => (
        <div
          key={key}
          className="rounded-xl p-5 space-y-3"
          style={{
            background: "var(--surface-raised)",
            border: "1px solid var(--surface-border)",
          }}
        >
          <div>
            <label
              htmlFor={key}
              className="block text-sm font-medium mb-1"
              style={{ color: "var(--foreground)" }}
            >
              {label}
            </label>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {description}
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2.5"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
            }}
          >
            <input
              id={key}
              name={key}
              type={isSecret && !visible[key] ? "password" : "text"}
              value={values[key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder={placeholder}
              autoComplete="off"
              className="flex-1 bg-transparent text-sm outline-none font-mono"
              style={{ color: "var(--foreground)", fontSize: "16px" }}
              aria-describedby={`${key}-desc`}
            />
            {isSecret && (
              <button
                type="button"
                onClick={() => toggleVisible(key)}
                className="flex-shrink-0"
                style={{ color: "var(--muted)" }}
                aria-label={visible[key] ? `Hide ${label}` : `Show ${label}`}
              >
                {visible[key] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>
          <p id={`${key}-desc`} className="sr-only">{description}</p>
        </div>
      ))}

      {/* Save row */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "saving"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "var(--accent)",
            color: "var(--background)",
          }}
        >
          <Save size={15} strokeWidth={2} />
          {status === "saving" ? "Saving..." : "Save Settings"}
        </button>

        {status === "success" && (
          <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--success)" }}>
            <CheckCircle size={15} />
            Saved successfully
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--danger)" }}>
            <AlertCircle size={15} />
            Failed to save. Check your connection.
          </span>
        )}
      </div>
    </form>
  );
}
