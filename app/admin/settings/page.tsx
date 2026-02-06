import AdminShell from "../../../components/admin/AdminShell";

export default function AdminSettings() {
  return (
    <AdminShell
      title="Settings"
      subtitle="Manage admin preferences and workspace defaults."
    >
      <section className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Workspace</h3>
          <p className="text-sm text-[#6f5a88]">
            Control the defaults used for new projects and onboarding.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-[#3e2a55]">
            Default project lead
            <input
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
              placeholder="Select team member"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-[#3e2a55]">
            Notification email
            <input
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
              placeholder="admin@snappyfix.com"
            />
          </label>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#eee4fb] bg-[#faf7ff] px-4 py-4 text-sm text-[#6f5a88]">
          <span>Enable weekly summary emails</span>
          <button className="rounded-full bg-[#2b1d3a] px-4 py-2 text-xs font-semibold text-white">
            Enabled
          </button>
        </div>

        <button className="rounded-2xl bg-[#2b1d3a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2b1d3a]/30 transition hover:translate-y-[-1px]">
          Save settings
        </button>
      </section>
    </AdminShell>
  );
}
