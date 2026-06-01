"use client";

import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

export type Task = {
  id: string;
  input: string;
  output: string;
  created_at: string;
};

interface TaskTableProps {
  tasks: Task[];
}

function truncate(str: string, max = 80) {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

export default function TaskTable({ tasks }: TaskTableProps) {
  const [selected, setSelected] = useState<Task | null>(null);

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--surface-border)" }}>
        <table className="w-full text-sm" role="table" aria-label="Agent tasks">
          <thead>
            <tr style={{ background: "var(--surface-raised)", borderBottom: "1px solid var(--surface-border)" }}>
              {["Task ID", "Input", "Output", "Created At", ""].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm font-mono"
                  style={{ color: "var(--muted)" }}
                >
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task, i) => (
                <tr
                  key={task.id}
                  style={{
                    background: i % 2 === 0 ? "var(--surface)" : "var(--background)",
                    borderBottom: "1px solid var(--surface-border)",
                  }}
                  className="transition-colors duration-100 hover:opacity-80"
                >
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--accent)" }}>
                    {task.id}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>
                    {truncate(task.input)}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted)" }}>
                    {truncate(task.output)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {new Date(task.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(task)}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors duration-150"
                      style={{
                        background: "var(--accent-dim)",
                        color: "var(--accent)",
                        border: "1px solid var(--accent-glow)",
                      }}
                      aria-label={`View task ${task.id}`}
                    >
                      <ExternalLink size={12} strokeWidth={2} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,11,15,0.85)", backdropFilter: "blur(8px)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Task ${selected.id} details`}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-6 space-y-5 relative"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{ background: "var(--surface-raised)", color: "var(--muted)" }}
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>
                Task ID
              </p>
              <p className="font-mono text-sm" style={{ color: "var(--accent)" }}>{selected.id}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>
                Created At
              </p>
              <p className="font-mono text-sm" style={{ color: "var(--foreground)" }}>
                {new Date(selected.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                Input
              </p>
              <div
                className="rounded-xl p-4 text-sm leading-relaxed font-sans"
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--foreground)",
                }}
              >
                {selected.input}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
                Output
              </p>
              <div
                className="rounded-xl p-4 text-sm leading-relaxed font-mono max-h-64 overflow-y-auto"
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--foreground)",
                }}
              >
                {selected.output}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
