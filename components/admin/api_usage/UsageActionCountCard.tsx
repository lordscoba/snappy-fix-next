"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { countUsageByAction } from "@/lib/api/services/admin.usage-log.services";
import { ActionTypeEnum } from "@/types/usage-log-types";

/* ---------------- LABEL FORMATTER ---------------- */
function formatLabel(action: ActionTypeEnum) {
  return action
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function UsageActionCountCard() {
  const [selectedAction, setSelectedAction] = useState<ActionTypeEnum>(
    ActionTypeEnum.CONVERT,
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["usage-action-count", selectedAction],
    queryFn: async () => {
      const res = await countUsageByAction(selectedAction);
      return res.data;
    },
  });

  const count = data?.data.count ?? 0;

  return (
    <section className="rounded-[2rem] border border-[#e7ddf2] bg-white p-6 shadow-sm space-y-5">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-[#2b1d3a]">
          Usage by Action
        </h3>
        <p className="text-sm text-[#6f5a88]">
          View total usage count per action type
        </p>
      </div>

      {/* SELECT */}
      <select
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value as ActionTypeEnum)}
        className="w-full rounded-2xl border border-[#e7ddf2] bg-white px-4 py-3 text-sm font-medium text-[#3e2a55] outline-none focus:ring-4 focus:ring-[#e9dbff]"
      >
        {Object.values(ActionTypeEnum).map((action) => (
          <option key={action} value={action}>
            {formatLabel(action)}
          </option>
        ))}
      </select>

      {/* VALUE DISPLAY */}
      <div className="flex items-center justify-between rounded-2xl border border-[#eee4fb] bg-[#faf7ff] px-5 py-6">
        {isLoading ? (
          <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-md" />
        ) : (
          <div className="flex flex-col">
            <span className="text-xs text-[#6f5a88]">Total Requests</span>
            <span className="text-2xl font-bold text-[#2b1d3a]">{count}</span>
          </div>
        )}

        {/* subtle updating indicator */}
        {isFetching && !isLoading && (
          <span className="text-[10px] text-[#b08fd9]">Updating...</span>
        )}
      </div>
    </section>
  );
}
