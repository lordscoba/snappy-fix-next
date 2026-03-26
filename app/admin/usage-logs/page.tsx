import AdminShell from "@/components/Layout/AdminShell";
import UsageLogsDashboard from "./DashboardClient";

export default function UsageLogsPage() {
  return (
    <AdminShell
      title="Usage Logs"
      subtitle="Monitor API usage, performance and errors."
    >
      <UsageLogsDashboard />
    </AdminShell>
  );
}
