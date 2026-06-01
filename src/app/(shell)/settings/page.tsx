import SettingsForm from "@/components/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-balance" style={{ color: "var(--foreground)" }}>
            Settings
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Configure API keys and integration endpoints
          </p>
        </div>

        <SettingsForm />
      </div>
    </div>
  );
}
