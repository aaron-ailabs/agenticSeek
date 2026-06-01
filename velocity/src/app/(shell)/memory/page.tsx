import MemoryViewer from "@/components/MemoryViewer";

export default function MemoryPage() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1
            className="text-xl font-semibold text-balance"
            style={{ color: "var(--foreground)" }}
          >
            Memory
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Inspect and update the agent&apos;s persistent memory store
          </p>
        </div>

        <MemoryViewer />
      </div>
    </div>
  );
}
