import SidebarNavigation from "@/components/SidebarNavigation";
import PingIndicator from "@/components/PingIndicator";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen" style={{ background: "var(--background)" }}>
      <SidebarNavigation />
      <div className="flex flex-col flex-1 min-w-0 ml-14">
        {/* Top bar */}
        <header
          className="flex items-center h-12 px-5 flex-shrink-0"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--surface-border)",
          }}
        >
          <span
            className="font-mono font-bold tracking-widest text-sm uppercase"
            style={{ color: "var(--accent)" }}
          >
            Velocity
          </span>
          <div className="ml-auto flex items-center gap-2">
            <PingIndicator />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
