"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ListTodo, ScrollText, Settings, Database, Cpu, PlugZap } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/chat", icon: MessageSquare, label: "Chat" },
  { href: "/tasks", icon: ListTodo, label: "Tasks" },
  { href: "/logs", icon: ScrollText, label: "Logs" },
  { href: "/integrations", icon: PlugZap, label: "Integrations" },
  { href: "/memory", icon: Database, label: "Memory" },
  { href: "/llm", icon: Cpu, label: "LLM Test" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function SidebarNavigation() {
  const pathname = usePathname();
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <aside
      className="fixed left-0 top-0 h-full w-14 flex flex-col items-center py-4 z-50"
      style={{
        background: "var(--surface)",
        borderRight: "1px solid var(--surface-border)",
      }}
    >
      {/* Logo mark */}
      <div className="mb-8 flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-glow)" }}>
        <span className="font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>V</span>
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col gap-1 flex-1" role="navigation" aria-label="Main navigation">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href);
          return (
            <div key={href} className="relative flex items-center">
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setTooltip(label)}
                onMouseLeave={() => setTooltip(null)}
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2"
                style={{
                  background: active ? "var(--accent-dim)" : "transparent",
                  color: active ? "var(--accent)" : "var(--muted)",
                  border: active ? "1px solid var(--accent-glow)" : "1px solid transparent",
                  // @ts-ignore
                  "--tw-ring-color": "var(--accent)",
                }}
              >
                <Icon size={18} strokeWidth={1.6} />
              </Link>

              {/* Tooltip */}
              {tooltip === label && (
                <div
                  className="absolute left-12 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none z-50"
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--surface-border)",
                    color: "var(--foreground)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                  role="tooltip"
                >
                  {label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Version badge */}
      <div className="mt-auto">
        <span className="font-mono text-[10px]" style={{ color: "var(--muted)" }}>v1</span>
      </div>
    </aside>
  );
}
