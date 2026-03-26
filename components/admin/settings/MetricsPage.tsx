"use client";

import { useEffect, useState } from "react";
import { MetricsData, MetricItem } from "@/types/metrics-types";
import { toast } from "react-hot-toast";
import { getAdminMetrics } from "@/lib/api/services/metrics-service";

export default function MetricsPageComponent() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await getAdminMetrics();
      setMetrics(res.data.data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // Convert object → array for table
  const metricList: MetricItem[] = metrics
    ? [
        metrics.uptime,
        metrics.error_rate,
        metrics.latency,
        metrics.downtime_incidents,
      ]
    : [];

  return (
    <section className="rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-[#eee4fb] bg-[#faf7ff]">
        <h3 className="text-lg font-semibold text-[#2b1d3a]">System Metrics</h3>
        <p className="text-sm text-[#6f5a88]">
          Monitor system performance and SLA compliance
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[700px]">
          <thead className="bg-[#faf7ff] border-b border-[#eee4fb] text-[#b08fd9] uppercase text-[10px] tracking-[0.2em] font-black">
            <tr>
              <th className="px-6 py-5">Metric</th>
              <th className="px-6 py-5">Value</th>
              <th className="px-6 py-5">SLA Target</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Description</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eee4fb] text-[#2b1d3a]">
            {loading ? (
              <MetricsSkeleton rows={4} />
            ) : metricList.length > 0 ? (
              metricList.map((metric, index) => (
                <tr
                  key={index}
                  className="group hover:bg-[#fcfaff] transition-colors"
                >
                  {/* Metric Name */}
                  <td className="px-6 py-5 font-bold text-sm">
                    {metric.metric}
                  </td>

                  {/* Value */}
                  <td className="px-6 py-5 text-xs font-mono text-[#6f5a88]">
                    {formatMetricValue(metric)}
                  </td>

                  {/* SLA */}
                  <td className="px-6 py-5 text-xs text-[#6f5a88]">
                    {metric.sla_target}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${
                        metric.status === "GOOD"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      {metric.status}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-5 text-xs text-[#6f5a88] max-w-[250px]">
                    {metric.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <p className="text-sm text-[#b08fd9]">No metrics available</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER (WINDOW INFO) */}
      {!loading && metrics?.window && (
        <div className="border-t border-[#eee4fb] bg-[#faf7ff]/50 px-6 py-4 text-xs text-[#6f5a88] flex justify-between">
          <span>Window: {metrics.window.days} days</span>
          <span>
            {new Date(metrics.window.start).toLocaleDateString()} →{" "}
            {new Date(metrics.window.end).toLocaleDateString()}
          </span>
        </div>
      )}
    </section>
  );
}

function MetricsSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-6 py-5">
            <div className="h-4 w-32 bg-gray-100 rounded-md" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-20 bg-gray-100 rounded-md" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-16 bg-gray-100 rounded-md" />
          </td>
          <td className="px-6 py-5">
            <div className="h-6 w-14 bg-gray-100 rounded-lg" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-40 bg-gray-50 rounded-md" />
          </td>
        </tr>
      ))}
    </>
  );
}

function formatMetricValue(metric: MetricItem) {
  if (metric.metric.toLowerCase().includes("rate")) {
    return `${metric.value.toFixed(2)}%`;
  }

  if (metric.metric.toLowerCase().includes("latency")) {
    return `${Math.round(metric.value)} ms`;
  }

  return metric.value;
}
