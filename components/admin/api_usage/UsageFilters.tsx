"use client";

import { UsageLogFilters, ActionTypeEnum } from "@/types/usage-log-types";

export default function UsageFilters({ filters, setFilters, setPage }: any) {
  const update = (key: keyof UsageLogFilters, value: any) => {
    setPage(1);
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-wrap gap-3">
      <input
        placeholder="Search..."
        className="rounded-2xl border border-[#e7ddf2] px-4 py-2"
        onChange={(e) => update("search", e.target.value)}
      />

      <select
        className="rounded-2xl border border-[#e7ddf2] px-4 py-2"
        onChange={(e) => update("action_type", e.target.value)}
      >
        <option value="">All Actions</option>
        {Object.values(ActionTypeEnum).map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>

      <select
        className="rounded-2xl border border-[#e7ddf2] px-4 py-2"
        onChange={(e) => update("success", e.target.value)}
      >
        <option value="">All</option>
        <option value="true">Success</option>
        <option value="false">Failed</option>
      </select>
    </div>
  );
}
