import IntegrationsGrid from "@/components/IntegrationsGrid";

export const metadata = {
  title: "Integrations — Velocity",
  description: "Connect and manage third-party integrations for Velocity.",
};

export default function IntegrationsPage() {
  return (
    <div className="h-full overflow-y-auto px-6 py-6 md:px-8">
      {/* Page header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          Integrations
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Connect external services to power Velocity&apos;s agent capabilities.
        </p>
      </div>

      <IntegrationsGrid />
    </div>
  );
}
