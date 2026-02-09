import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardHome() {
  return (
    <DashboardShell
      title="Welcome back"
      subtitle="Your workspace is getting ready."
    >
      <section className="relative overflow-hidden rounded-3xl border bg-white p-10 shadow">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#e7dbff] blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-[#ffd6e7] blur-3xl" />

        <div className="relative space-y-6">
          <span className="inline-flex items-center rounded-full bg-[#f4edff] px-4 py-1 text-xs text-[#5b32b4]">
            Coming Soon
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2b1d3a]">
            A smarter dashboard is on the way.
          </h2>
          <p className="text-sm md:text-base text-[#6f5a88] max-w-xl">
            We’re building tools to track projects, manage clients, and measure
            performance—all in one beautiful workspace.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-[#faf7ff] px-4 py-3 text-sm text-[#6f5a88] border border-[#eee4fb]">
              Project tracking
            </div>
            <div className="rounded-2xl bg-[#faf7ff] px-4 py-3 text-sm text-[#6f5a88] border border-[#eee4fb]">
              Team activity
            </div>
            <div className="rounded-2xl bg-[#faf7ff] px-4 py-3 text-sm text-[#6f5a88] border border-[#eee4fb]">
              Analytics & reports
            </div>
          </div>

          <button className="rounded-full bg-[#5b32b4] px-6 py-3 text-white text-sm font-semibold hover:bg-[#47238f]">
            Notify me when it’s ready
          </button>
        </div>
      </section>
    </DashboardShell>
  );
}
