"use client";

import {
  countAllUsageLogs,
  countUsageErrors,
  getAverageProcessingTime,
  getErrorRate,
} from "@/lib/api/services/admin.usage-log.services";
import { useQuery } from "@tanstack/react-query";

export default function UsageStatsCards() {
  const { data: total } = useQuery({
    queryKey: ["usage-total"],
    queryFn: countAllUsageLogs,
  });

  const { data: errors } = useQuery({
    queryKey: ["usage-errors"],
    queryFn: countUsageErrors,
  });

  const { data: avg } = useQuery({
    queryKey: ["usage-avg"],
    queryFn: getAverageProcessingTime,
  });

  const { data: rate } = useQuery({
    queryKey: ["usage-rate"],
    queryFn: getErrorRate,
  });

  const cards = [
    {
      label: "Total Requests",
      value: total?.data.data.total,
    },
    {
      label: "Errors",
      value: errors?.data.data.errors,
    },
    {
      label: "Avg Time",
      value: `${Math.round(avg?.data.data.average_processing_time_ms || 0)} ms`,
    },
    {
      label: "Error Rate",
      value: `${rate?.data.data.error_rate_percent?.toFixed(2)}%`,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[#e7ddf2] bg-white p-4 shadow-sm"
        >
          <p className="text-xs text-[#6f5a88]">{card.label}</p>
          <h3 className="text-xl font-bold text-[#2b1d3a]">
            {card.value ?? "--"}
          </h3>
        </div>
      ))}
    </div>
  );
}
