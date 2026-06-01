import LlmTester from "@/components/LlmTester";

export default function LlmPage() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1
            className="text-xl font-semibold text-balance"
            style={{ color: "var(--foreground)" }}
          >
            LLM Test
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Send a prompt directly to the LLM endpoint and inspect the raw output
          </p>
        </div>

        <LlmTester />
      </div>
    </div>
  );
}
