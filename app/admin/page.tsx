import AdminShell from "../../components/admin/AdminShell";
import StatCard from "../../components/admin/StatCard";

export default function AdminHome() {
  return (
    <AdminShell
      title="Dashboard"
      subtitle="Overview of recent activity and platform health."
    >
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard label="Active Projects" value="12" trend="+3 this week" />
        <StatCard label="New Requests" value="46" trend="+12 today" />
        <StatCard label="Revenue" value="$18.4k" trend="+8%" />
      </section>

      <section className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Latest Updates</h2>
        <p className="mt-2 text-sm text-[#6f5a88]">
          Track approvals, pending tasks, and team check‑ins.
        </p>

        <ul className="mt-6 space-y-4 text-sm text-[#6f5a88]">
          <li className="rounded-2xl border border-[#eee4fb] bg-[#faf7ff] px-4 py-3">
            New client brief received for “Aurora Web Revamp”.
          </li>
          <li className="rounded-2xl border border-[#eee4fb] bg-[#faf7ff] px-4 py-3">
            Design review meeting scheduled for Friday, 3:00 PM.
          </li>
          <li className="rounded-2xl border border-[#eee4fb] bg-[#faf7ff] px-4 py-3">
            Payment cleared for Project Nova phase 2.
          </li>
        </ul>
      </section>
    </AdminShell>
  );
}
