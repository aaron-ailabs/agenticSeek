"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  X,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Zap,
  Database,
  Search,
  CreditCard,
  HardDrive,
  Cpu,
  Bot,
  Server,
  Layers,
} from "lucide-react";

// ---------- Integration definitions ----------

type FieldKey =
  | "groq"
  | "grok"
  | "neon"
  | "redis"
  | "redisToken"
  | "search"
  | "stripe"
  | "blob"
  | "deepinfra"
  | "fal";

interface IntegrationField {
  name: string;
  settingsKey: FieldKey;
  placeholder: string;
  isSecret?: boolean;
}

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  docsUrl: string;
  Icon: React.ElementType;
  fields: IntegrationField[];
}

const INTEGRATIONS: Integration[] = [
  {
    id: "upstash-redis",
    name: "Upstash Redis",
    category: "Cache",
    description: "Serverless Redis for caching, rate limiting, queues, and sessions.",
    docsUrl: "https://upstash.com/docs/redis",
    Icon: Zap,
    fields: [
      { name: "Redis URL", settingsKey: "redis", placeholder: "https://...-redis.upstash.io", isSecret: true },
      { name: "Redis Token", settingsKey: "redisToken", placeholder: "AX...", isSecret: true },
    ],
  },
  {
    id: "upstash-search",
    name: "Upstash Search",
    category: "Search",
    description: "Serverless vector/semantic search powered by Upstash.",
    docsUrl: "https://upstash.com/docs/vector",
    Icon: Search,
    fields: [
      { name: "Search URL", settingsKey: "search", placeholder: "https://...-search.upstash.io", isSecret: true },
    ],
  },
  {
    id: "neon",
    name: "Neon",
    category: "Database",
    description: "Serverless PostgreSQL with branching, autoscaling, and connection pooling.",
    docsUrl: "https://neon.tech/docs",
    Icon: Database,
    fields: [
      { name: "Database URL", settingsKey: "neon", placeholder: "postgresql://user:pass@host/db", isSecret: true },
    ],
  },
  {
    id: "groq",
    name: "Groq",
    category: "LLM",
    description: "Ultra-fast LLM inference via Groq's Language Processing Unit.",
    docsUrl: "https://console.groq.com/docs",
    Icon: Cpu,
    fields: [
      { name: "API Key", settingsKey: "groq", placeholder: "gsk_...", isSecret: true },
    ],
  },
  {
    id: "grok",
    name: "Grok (xAI)",
    category: "LLM",
    description: "xAI's Grok model API for advanced reasoning and real-time knowledge.",
    docsUrl: "https://docs.x.ai",
    Icon: Bot,
    fields: [
      { name: "API Key", settingsKey: "grok", placeholder: "xai-...", isSecret: true },
    ],
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    description: "Payment processing, subscriptions, and billing infrastructure.",
    docsUrl: "https://stripe.com/docs",
    Icon: CreditCard,
    fields: [
      { name: "Secret Key", settingsKey: "stripe", placeholder: "sk_live_... or sk_test_...", isSecret: true },
    ],
  },
  {
    id: "blob",
    name: "Blob Storage",
    category: "Storage",
    description: "Vercel Blob or compatible object storage for file uploads and assets.",
    docsUrl: "https://vercel.com/docs/storage/vercel-blob",
    Icon: HardDrive,
    fields: [
      { name: "Storage URL", settingsKey: "blob", placeholder: "https://...", isSecret: false },
    ],
  },
  {
    id: "deepinfra",
    name: "Deep Infra",
    category: "LLM",
    description: "Run open-source and proprietary models at scale via Deep Infra.",
    docsUrl: "https://deepinfra.com/docs",
    Icon: Server,
    fields: [
      { name: "API Key", settingsKey: "deepinfra", placeholder: "di_...", isSecret: true },
    ],
  },
  {
    id: "fal",
    name: "fal",
    category: "AI",
    description: "Serverless AI model inference for image, video, and audio generation.",
    docsUrl: "https://fal.ai/docs",
    Icon: Layers,
    fields: [
      { name: "API Key", settingsKey: "fal", placeholder: "...", isSecret: true },
    ],
  },
];

// ---------- Types ----------

type ConnectedMap = Record<string, boolean>;
type SaveStatus = "idle" | "saving" | "success" | "error";

// ---------- Connect Modal ----------

function ConnectModal({
  integration,
  onClose,
  onConnected,
}: {
  integration: Integration;
  onClose: () => void;
  onConnected: (id: string) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(integration.fields.map((f) => [f.settingsKey, ""]))
  );
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(integration.fields.map((f) => [f.settingsKey, false]))
  );
  const [status, setStatus] = useState<SaveStatus>("idle");
  const { Icon } = integration;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          onConnected(integration.id);
          onClose();
        }, 800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(8,11,15,0.85)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--surface-raised)",
          border: "1px solid var(--surface-border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid var(--surface-border)" }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-glow)" }}
          >
            <Icon size={16} strokeWidth={1.8} style={{ color: "var(--accent)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="modal-title" className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Connect {integration.name}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {integration.category}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "var(--muted)" }}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {integration.fields.map((field) => (
            <div key={field.settingsKey} className="space-y-1.5">
              <label
                htmlFor={`modal-${field.settingsKey}`}
                className="block text-xs font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {field.name}
              </label>
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2.5"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--surface-border)",
                }}
              >
                <input
                  id={`modal-${field.settingsKey}`}
                  type={field.isSecret && !visible[field.settingsKey] ? "password" : "text"}
                  value={values[field.settingsKey] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, [field.settingsKey]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  autoComplete="off"
                  className="flex-1 bg-transparent text-sm outline-none font-mono"
                  style={{ color: "var(--foreground)", fontSize: "16px" }}
                />
                {field.isSecret && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisible((prev) => ({
                        ...prev,
                        [field.settingsKey]: !prev[field.settingsKey],
                      }))
                    }
                    style={{ color: "var(--muted)" }}
                    aria-label={visible[field.settingsKey] ? `Hide ${field.name}` : `Show ${field.name}`}
                  >
                    {visible[field.settingsKey] ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <a
            href={integration.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs"
            style={{ color: "var(--accent)" }}
          >
            <ExternalLink size={11} />
            View {integration.name} docs
          </a>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={status === "saving" || status === "success"}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "var(--accent)", color: "var(--background)" }}
            >
              <Save size={14} strokeWidth={2} />
              {status === "saving" ? "Saving..." : status === "success" ? "Connected!" : "Connect"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                background: "var(--surface)",
                color: "var(--muted)",
                border: "1px solid var(--surface-border)",
              }}
            >
              Cancel
            </button>
            {status === "success" && (
              <span className="flex items-center gap-1 text-xs" style={{ color: "var(--success)" }}>
                <CheckCircle size={13} /> Saved
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1 text-xs" style={{ color: "var(--danger)" }}>
                <AlertCircle size={13} /> Failed
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Integration Card ----------

const CATEGORY_COLORS: Record<string, string> = {
  Cache: "#f59e0b",
  Search: "#8b5cf6",
  Database: "#06b6d4",
  LLM: "#00d4ff",
  Payments: "#22c55e",
  Storage: "#f97316",
  AI: "#ec4899",
};

function IntegrationCard({
  integration,
  connected,
  onConnect,
}: {
  integration: Integration;
  connected: boolean;
  onConnect: () => void;
}) {
  const { Icon } = integration;
  const catColor = CATEGORY_COLORS[integration.category] ?? "var(--accent)";

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4 transition-all duration-150"
      style={{
        background: "var(--surface-raised)",
        border: connected
          ? `1px solid ${catColor}40`
          : "1px solid var(--surface-border)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `${catColor}18`,
            border: `1px solid ${catColor}30`,
          }}
        >
          <Icon size={18} strokeWidth={1.6} style={{ color: catColor }} />
        </div>
        {/* Status badge */}
        <div
          className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            background: connected ? "rgba(0,229,160,0.12)" : "rgba(90,112,128,0.15)",
            color: connected ? "var(--success)" : "var(--muted)",
            border: connected ? "1px solid rgba(0,229,160,0.25)" : "1px solid var(--surface-border)",
          }}
        >
          {connected ? (
            <CheckCircle2 size={10} strokeWidth={2.5} />
          ) : (
            <Circle size={10} strokeWidth={2} />
          )}
          {connected ? "Connected" : "Not Connected"}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            {integration.name}
          </h3>
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{
              background: `${catColor}18`,
              color: catColor,
            }}
          >
            {integration.category}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
          {integration.description}
        </p>
      </div>

      {/* Action */}
      <div className="flex items-center gap-2">
        {connected ? (
          <>
            <button
              onClick={onConnect}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                background: "var(--surface)",
                color: "var(--foreground)",
                border: "1px solid var(--surface-border)",
              }}
            >
              Manage
            </button>
            <a
              href={integration.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--muted)" }}
              aria-label={`${integration.name} docs`}
            >
              <ExternalLink size={11} />
              Docs
            </a>
          </>
        ) : (
          <button
            onClick={onConnect}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
            style={{
              background: "var(--accent)",
              color: "var(--background)",
            }}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- Main Grid ----------

export default function IntegrationsGrid() {
  const [connected, setConnected] = useState<ConnectedMap>({});
  const [activeModal, setActiveModal] = useState<Integration | null>(null);

  function handleConnected(id: string) {
    setConnected((prev) => ({ ...prev, [id]: true }));
  }

  const connectedCount = Object.values(connected).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          {connectedCount} of {INTEGRATIONS.length} connected
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--surface-border)" }}
          aria-hidden="true"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            connected={!!connected[integration.id]}
            onConnect={() => setActiveModal(integration)}
          />
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <ConnectModal
          integration={activeModal}
          onClose={() => setActiveModal(null)}
          onConnected={handleConnected}
        />
      )}
    </div>
  );
}
