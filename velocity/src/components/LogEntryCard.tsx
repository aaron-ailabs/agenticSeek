import { Terminal, Wrench, CheckCircle, AlertCircle } from "lucide-react";

export type LogEntry = {
  id: string;
  timestamp: string;
  action: string;
  tool: string;
  result: string;
  status?: "success" | "error" | "info";
};

interface LogEntryCardProps {
  entry: LogEntry;
}

const statusConfig = {
  success: { color: "var(--success)", Icon: CheckCircle },
  error: { color: "var(--danger)", Icon: AlertCircle },
  info: { color: "var(--accent)", Icon: Terminal },
};

export default function LogEntryCard({ entry }: LogEntryCardProps) {
  const status = entry.status ?? "info";
  const { color, Icon } = statusConfig[status];

  return (
    <article
      className="flex gap-4 p-4 rounded-xl transition-colors duration-100 hover:opacity-90"
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--surface-border)",
      }}
      aria-label={`Log entry: ${entry.action}`}
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
            <Wrench size={10} strokeWidth={2} />
            {entry.tool}
          </span>
        </div>

        {/* Action */}
        <p className="text-sm font-medium leading-snug" style={{ color: "var(--foreground)" }}>
          {entry.action}
        </p>

        {/* Result */}
        <p className="text-xs leading-relaxed font-mono" style={{ color: "var(--muted)" }}>
          {entry.result}
        </p>
      </div>
    </article>
  );
}
