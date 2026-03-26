"use client";

import { useState } from "react";
import { UsageLogFilters } from "@/types/usage-log-types";
import UsageStatsCards from "@/components/admin/api_usage/UsageStatsCards";
// import UsageCharts from "@/components/admin/api_usage/UsageCharts";
import UsageFilters from "@/components/admin/api_usage/UsageFilters";
import UsageLogsTable from "@/components/admin/api_usage/UsageLogsTable";
import dynamic from "next/dynamic";
import UsageActionCountCard from "@/components/admin/api_usage/UsageActionCountCard";

const UsageCharts = dynamic(
  () => import("@/components/admin/api_usage/UsageCharts"),
  { ssr: false },
);

export default function UsageLogsDashboard() {
  const [filters, setFilters] = useState<UsageLogFilters>({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div className="space-y-6">
      <UsageStatsCards />
      <UsageActionCountCard />
      <UsageCharts />
      <UsageLogsTable
        page={page}
        limit={limit}
        filters={filters}
        setPage={setPage}
        setFilters={setFilters}
      />
    </div>
  );
}
