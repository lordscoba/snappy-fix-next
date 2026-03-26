"use client";

import { useState } from "react";
import AdminShell from "../../components/Layout/AdminShell";
import { UsageLogFilters } from "@/types/usage-log-types";
import UsageStatsCards from "@/components/admin/api_usage/UsageStatsCards";
import UsageLogsTable from "@/components/admin/api_usage/UsageLogsTable";

export default function AdminHome() {
  // State for the UsageLogsTable
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<UsageLogFilters>({});

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Overview of platform usage, health, and recent API activity."
    >
      {/* ─── Top Stats Row ─── */}
      <section className="my-6">
        <UsageStatsCards />
      </section>

      {/* ─── Main Logs Table ─── */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-[#2b1d3a]">
            Latest Activity Logs
          </h2>
          <p className="mt-1 text-sm text-[#6f5a88]">
            Track recent processing actions, errors, and system events in
            real-time.
          </p>
        </div>

        <UsageLogsTable
          page={page}
          limit={limit}
          filters={filters}
          setPage={setPage}
          setFilters={setFilters}
        />
      </section>
    </AdminShell>
  );
}
