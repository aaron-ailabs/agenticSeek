"use client";

import useSWR from "swr";
import TaskTable, { Task } from "@/components/TaskTable";
import { RefreshCw } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const MOCK_TASKS: Task[] = [
  {
    id: "task_001",
    input: "Research the latest advancements in quantum computing and summarize key breakthroughs.",
    output:
      "Found 12 papers published in Q1 2025. Key breakthroughs include error correction at room temperature and 1000-qubit processors from IBM and Google.",
    created_at: new Date(Date.now() - 3_600_000).toISOString(),
  },
  {
    id: "task_002",
    input: "Write a Python script to scrape product prices from an e-commerce site.",
    output:
      "Generated scraper using requests + BeautifulSoup. Script exports to CSV. Rate-limiting and retry logic included.",
    created_at: new Date(Date.now() - 7_200_000).toISOString(),
  },
  {
    id: "task_003",
    input: "Analyze the sentiment of customer reviews from the provided dataset.",
    output:
      "Completed sentiment analysis on 5,432 reviews. Positive: 68%, Neutral: 21%, Negative: 11%. Top complaint: delivery time.",
    created_at: new Date(Date.now() - 86_400_000).toISOString(),
  },
];

export default function TasksPage() {
  const { data, error, isLoading, mutate } = useSWR<Task[]>("/api/tasks", fetcher);

  const tasks: Task[] = data && data.length > 0 ? data : MOCK_TASKS;
  const count = tasks.length;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-semibold text-balance"
              style={{ color: "var(--foreground)" }}
            >
              Tasks
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              Agent task history and results
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => mutate()}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-150 disabled:opacity-40"
              style={{
                background: "var(--surface-raised)",
                color: "var(--muted)",
                border: "1px solid var(--surface-border)",
              }}
              aria-label="Refresh tasks"
            >
              <RefreshCw size={12} strokeWidth={2} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
            <div
              className="text-xs font-mono px-3 py-1.5 rounded-full"
              style={{
                background: "var(--surface-raised)",
                color: "var(--muted)",
                border: "1px solid var(--surface-border)",
              }}
            >
              {count} {count === 1 ? "task" : "tasks"}
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs font-mono" style={{ color: "var(--danger)" }}>
            Backend unreachable — showing cached data.
          </p>
        )}

        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
}
