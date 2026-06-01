"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PingIndicator() {
  const { data, error } = useSWR("/api/ping", fetcher, {
    refreshInterval: 10_000,
    revalidateOnFocus: true,
  });

  const online = !error && data?.status === "ok";
  const label = error ? "OFFLINE" : data ? "ONLINE" : "...";
  const dotColor = error ? "var(--danger)" : data ? "var(--success)" : "var(--muted)";
  const bgColor = error ? "var(--danger)" : data ? "var(--success)" : "var(--muted)";

  return (
    <div
      className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full"
      style={{
        background: `${bgColor}18`,
        color: bgColor,
        border: `1px solid ${bgColor}40`,
      }}
      role="status"
      aria-label={`Backend status: ${label}`}
    >
      {/* Animated pulse dot */}
      <span className="relative flex h-2 w-2">
        {online && (
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ background: dotColor }}
          />
        )}
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ background: dotColor }}
        />
      </span>
      {label}
    </div>
  );
}
