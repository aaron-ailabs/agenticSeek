import { Terminal, Wrench, CheckCircle, AlertCircle, Brain, Cpu } from "lucide-react";

export type LogEntry = {
  id: string;
  timestamp: string;
  // Real API fields
  type?: "thought" | "tool_call" | "tool_result" | "final";
  content?: string;
  // Legacy/mock fields
  action?: string;
  tool?: string;
  result?: string;
  status?: "success" | "error" | "info";
};

interface LogEntryCardProps {
  entry: LogEntry;
}

const typeConfig: Record<string, { color: string; Icon: React.ElementType; label: string }> = {
  thought: { color: "var(--accent)", Icon: Brain, label: "thought" },
  tool_call: { color: "#f59e0b", Icon: Wrench, label: "tool_call" },
  tool_result: { color: "var(--success)", Icon: CheckCircle, label: "tool_result" },
  final: { color: "var(--accent)", Icon: Cpu, label: "final" },
  success: { color: "var(--success)", Icon: CheckCircle, label: "success" },
  error: { color: "var(--danger)", Icon: AlertCircle, label: "error" },
  info: { color: "var(--accent)", Icon: Terminal, label: "info" },
};

export default function LogEntryCard({ entry }: LogEntryCardProps) {
  // Resolve display values from either real API or legacy mock shape
  const typeKey = entry.type ?? entry.status ?? "info";
  const { color, Icon, label } = typeConfig[typeKey] ?? typeConfig.info;

  const heading = entry.action ?? (entry.content ? entry.content.slice(0, 120) : "Log entry");
  const detail = entry.result ?? (entry.content && entry.content.length > 120 ? entry.content.slice(120) : null);
  const badge = entry.tool ?? label;

  return (
    <article
      className="flex gap-4 p-4 rounded-xl transition-colors duration-100 hover:opacity-90"
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--surface-border)",
      }}
      aria-label={`Log entry: ${heading}`}
    >
      {/* Status icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon size={16} strokeWidth={1.8} style={{ color }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-3">
          <time
            dateTime={entry.timestamp}
            className="font-mono text-[10px]"
            style={{ color: "var(--muted)" }}
          >
            {new Date(entry.timestamp).toLocaleString()}
          </time>
          <span
            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              background: `${color}18`,
              color,
              border: `1px solid ${color}40`,
            }}
          >
            <Icon size={10} strokeWidth={2} />
            {badge}
          </span>
        </div>

        {/* Main content */}
        <p className="text-sm font-medium leading-snug" style={{ color: "var(--foreground)" }}>
          {heading}
        </p>

        {/* Detail / overflow content */}
        {detail && (
          <p className="text-xs leading-relaxed font-mono" style={{ color: "var(--muted)" }}>
            {detail}
          </p>
        )}
      </div>
    </article>
  );
}
