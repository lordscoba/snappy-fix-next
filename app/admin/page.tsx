"use client";

import { useState } from "react";
import AdminShell from "../../components/Layout/AdminShell";
import { UsageLogFilters } from "@/types/usage-log-types";
import UsageStatsCards from "@/components/admin/api_usage/UsageStatsCards";
import UsageLogsTable from "@/components/admin/api_usage/UsageLogsTable";
import { smartIndexNowSubmit, submitAllToIndexNow } from "@/lib/utils/indexnow";
import toast from "react-hot-toast";

export default function AdminHome() {
  // State for the UsageLogsTable
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<UsageLogFilters>({});

  const [smartLoading, setSmartLoading] = useState(false);
  const [forceLoading, setForceLoading] = useState(false);

  /* ---------------- SMART SUBMIT ---------------- */
  const handleSmartSubmit = async () => {
    try {
      setSmartLoading(true);

      const changed = await smartIndexNowSubmit();

      if (!changed) {
        toast("No changes detected. Skipped IndexNow.", {
          icon: "⏭️",
        });
      } else {
        toast.success("IndexNow triggered (changes detected)");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Smart IndexNow failed");
    } finally {
      setSmartLoading(false);
    }
  };

  /* ---------------- FORCE SUBMIT ---------------- */
  const handleForceSubmit = async () => {
    try {
      setForceLoading(true);

      await submitAllToIndexNow();

      toast.success("All URLs submitted to IndexNow 🚀");
    } catch (err: any) {
      console.error("Force IndexNow Error:", err);

      toast.error(err?.message || "Failed to submit URLs to IndexNow");
    } finally {
      setForceLoading(false);
    }
  };

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
      {/* ─── INDEXNOW CONTROLS ─── */}
      <section className="mt-10 flex flex-col md:flex-row gap-4">
        {/* SMART BUTTON */}
        <button
          onClick={handleSmartSubmit}
          disabled={smartLoading}
          className="flex-1 rounded-2xl border border-[#e7ddf2] bg-[#faf7ff] px-6 py-4 text-sm font-semibold text-[#2b1d3a] shadow-sm transition hover:bg-[#f3ecff] disabled:opacity-50"
        >
          {smartLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-[#b08fd9] border-t-transparent rounded-full animate-spin" />
              Checking changes...
            </span>
          ) : (
            "Smart IndexNow (Only Changes)"
          )}
        </button>

        {/* FORCE BUTTON */}
        <button
          onClick={handleForceSubmit}
          disabled={forceLoading}
          className="flex-1 rounded-2xl bg-[#2b1d3a] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#2b1d3a]/30 transition hover:translate-y-[-1px] disabled:opacity-50"
        >
          {forceLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            "Force Submit All URLs"
          )}
        </button>
      </section>
    </AdminShell>
  );
}
