"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsageGroupedByAction } from "@/lib/api/services/admin.usage-log.services";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartData = {
  action: string;
  count: number;
};

export default function UsageCharts() {
  const { data, isLoading } = useQuery({
    queryKey: ["usage-grouped"],
    queryFn: async () => {
      const res = await getUsageGroupedByAction();
      return res.data;
    },
  });

  // ✅ transform + normalize
  const chartData: ChartData[] =
    data?.data.actions.map((a) => ({
      action: formatActionLabel(a.ActionType),
      count: a.Count,
    })) ?? [];

  return (
    <div className="rounded-[2rem] border border-[#e7ddf2] bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#2b1d3a]">Usage Trends</h3>
        <p className="text-sm text-[#6f5a88]">
          Distribution of API usage across actions
        </p>
      </div>

      {/* CHART */}
      {isLoading ? (
        <div className="h-64 animate-pulse bg-gray-100 rounded-xl" />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            {/* GRID */}
            <CartesianGrid stroke="#eee4fb" strokeDasharray="3 3" />

            {/* X AXIS */}
            <XAxis
              dataKey="action"
              tick={{ fontSize: 10, fill: "#6f5a88" }}
              angle={-20}
              textAnchor="end"
              interval={0}
            />

            {/* Y AXIS */}
            <YAxis
              tick={{ fontSize: 10, fill: "#6f5a88" }}
              allowDecimals={false}
            />

            {/* TOOLTIP */}
            <Tooltip content={<CustomTooltip />} />

            {/* LINE */}
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2b1d3a"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[#e7ddf2] bg-white px-3 py-2 shadow-md">
      <p className="text-xs font-semibold text-[#2b1d3a]">{label}</p>
      <p className="text-xs text-[#6f5a88]">
        Requests:{" "}
        <span className="font-bold text-[#2b1d3a]">{payload[0].value}</span>
      </p>
    </div>
  );
}

function formatActionLabel(action: string) {
  return action
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
