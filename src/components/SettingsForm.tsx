"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Save, CheckCircle, AlertCircle } from "lucide-react";

type FieldKey =
  | "groq"
  | "grok"
  | "neon"
  | "redis"
  | "redisToken"
  | "search"
  | "stripe"
  | "blob";

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
    description: "Groq API key for fast LLM inference. Get one at console.groq.com.",
    isSecret: true,
  },
  {
    key: "grok",
    label: "Grok API Key",
    placeholder: "xai-...",
    description: "xAI Grok API key for Grok model access. Get one at console.x.ai.",
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
    placeholder: "https://...-redis.upstash.io",
    description: "Upstash Redis REST URL for caching, sessions, and ephemeral state.",
    isSecret: true,
  },
  {
    key: "redisToken",
    label: "Upstash Redis Token",
    placeholder: "AX...",
    description: "Upstash Redis REST token (paired with the Redis URL above).",
    isSecret: true,
  },
  {
    key: "search",
    label: "Upstash Search URL",
    placeholder: "https://...-search.upstash.io",
    description: "Upstash Search (vector/semantic) endpoint URL.",
    isSecret: true,
  },
  {
    key: "stripe",
    label: "Stripe Secret Key",
    placeholder: "sk_live_... or sk_test_...",
    description: "Stripe secret key for payment processing. Never expose this client-side.",
    isSecret: true,
  },
  {
    key: "blob",
    label: "Blob Storage URL",
    placeholder: "https://...",
    description: "Vercel Blob or compatible storage base URL for file uploads.",
    isSecret: false,
  },
];

type SaveStatus = "idle" | "saving" | "success" | "error";

const emptyValues: Record<FieldKey, string> = {
  groq: "",
  grok: "",
  neon: "",
  redis: "",
  redisToken: "",
  search: "",
  stripe: "",
  blob: "",
};

const emptyVisible: Record<FieldKey, boolean> = {
  groq: false,
  grok: false,
  neon: false,
  redis: false,
  redisToken: false,
  search: false,
  stripe: false,
  blob: false,
};

export default function SettingsForm() {
  const [values, setValues] = useState<Record<FieldKey, string>>(emptyValues);
  const [visible, setVisible] = useState<Record<FieldKey, boolean>>(emptyVisible);
  const [status, setStatus] = useState<SaveStatus>("idle");
  // configured[key] = true means the backend already has a non-empty value for this key
  const [configured, setConfigured] = useState<Partial<Record<FieldKey, boolean>>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data?.settings) setConfigured(data.settings as Record<FieldKey, boolean>);
      })
      .catch(() => {});
  }, []);

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
        body: JSON.stringify({
          groq: values.groq,
          grok: values.grok,
          neon: values.neon,
          redis: values.redis,
          redisToken: values.redisToken,
          search: values.search,
          stripe: values.stripe,
          blob: values.blob,
        }),
      });
      if (res.ok) {
        setStatus("success");
        // Re-fetch configured badges to reflect newly saved keys
        fetch("/api/settings")
          .then((r) => r.json())
          .then((data) => {
            if (data?.settings) setConfigured(data.settings as Record<FieldKey, boolean>);
          })
          .catch(() => {});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4" aria-label="Settings form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor={key}
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  {label}
                </label>
                {configured[key] && (
                  <span
                    className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--success-dim, rgba(34,197,94,0.12))",
                      color: "var(--success)",
                      border: "1px solid var(--success-glow, rgba(34,197,94,0.3))",
                    }}
                  >
                    <CheckCircle size={9} />
                    Configured
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
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
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [key]: e.target.value }))
                }
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
            <p id={`${key}-desc`} className="sr-only">
              {description}
            </p>
          </div>
        ))}
      </div>

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
          <span
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--success)" }}
          >
            <CheckCircle size={15} />
            Saved successfully
          </span>
        )}
        {status === "error" && (
          <span
            className="flex items-center gap-1.5 text-sm"
            style={{ color: "var(--danger)" }}
          >
            <AlertCircle size={15} />
            Failed to save. Check your connection.
          </span>
        )}
      </div>
    </form>
  );
}
