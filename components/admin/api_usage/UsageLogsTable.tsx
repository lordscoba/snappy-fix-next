"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminUsageLogs } from "@/lib/api/services/admin.usage-log.services";
import {
  UsageLog,
  UsageLogFilters,
  AdminUsageLogListResponse,
  ActionTypeEnum,
} from "@/types/usage-log-types";
import {
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Activity,
  AlertCircle,
} from "lucide-react";

type Props = {
  page: number;
  limit: number;
  filters: UsageLogFilters;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFilters: React.Dispatch<React.SetStateAction<UsageLogFilters>>;
};

export default function UsageLogsTable({
  page,
  limit,
  filters,
  setPage,
  setFilters,
}: Props) {
  const { data, isLoading, isFetching } = useQuery<AdminUsageLogListResponse>({
    queryKey: ["usage-logs", page, limit, filters],
    queryFn: async () => {
      const res = await getAdminUsageLogs(page, limit, filters);
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const logs: UsageLog[] = data?.data.logs ?? [];
  const pagination = data?.pagination?.[0];

  /* ---------------- FILTER HANDLER ---------------- */
  const updateFilter = (key: keyof UsageLogFilters, value: any) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  return (
    <section className="rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm overflow-hidden flex flex-col">
      {/* 🔥 FILTERS SECTION */}
      <div className="p-5 border-b border-[#eee4fb] bg-[#faf7ff] flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4">
          <div className="relative w-full sm:max-w-md">
            {/* 1. Increased left position for icon padding */}
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b08fd9]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search logs by endpoint, IP..."
              /* 2. Increased pl-11 to make room for the padded icon */
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#e7ddf2] bg-white text-sm text-[#2b1d3a] placeholder-[#b08fd9] focus:outline-none focus:ring-2 focus:ring-[#e7ddf2] transition-all shadow-sm"
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>

          {isFetching && !isLoading && (
            <div className="flex items-center gap-2 text-xs font-medium text-[#b08fd9] animate-pulse">
              <Activity size={14} /> Updating...
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#6f5a88] font-medium mr-1">
            <Filter size={16} /> Filters:
          </div>

          <select
            className="px-4 py-2 rounded-xl border border-[#e7ddf2] bg-white text-sm text-[#2b1d3a] focus:outline-none focus:ring-2 focus:ring-[#e7ddf2] shadow-sm appearance-none cursor-pointer"
            onChange={(e) => updateFilter("action_type", e.target.value)}
          >
            <option value="">All Actions</option>
            {Object.values(ActionTypeEnum).map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-xl border border-[#e7ddf2] bg-white text-sm text-[#2b1d3a] focus:outline-none focus:ring-2 focus:ring-[#e7ddf2] shadow-sm appearance-none cursor-pointer"
            onChange={(e) =>
              updateFilter(
                "success",
                e.target.value === "" ? undefined : e.target.value === "true",
              )
            }
          >
            <option value="">All Statuses</option>
            <option value="true">Success</option>
            <option value="false">Failed</option>
          </select>

          <div className="flex flex-wrap sm:flex-nowrap items-center bg-white border border-[#e7ddf2] rounded-xl shadow-sm px-3.5 focus-within:ring-2 focus-within:ring-[#e7ddf2] transition-all overflow-hidden">
            <Calendar size={16} className="text-[#b08fd9] mr-3 shrink-0" />
            {/* FROM DATE */}
            <div className="flex items-center group">
              <span className="text-xs font-semibold text-[#6f5a88] mr-2 uppercase tracking-wide">
                From
              </span>
              <input
                type="date"
                className="py-2.5 text-sm font-medium text-[#2b1d3a] focus:outline-none cursor-pointer bg-transparent [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-all"
                onChange={(e) => updateFilter("from_date", e.target.value)}
                title="Start Date"
              />
            </div>
            <span className="text-[#e7ddf2] mx-3 hidden sm:block">|</span>
            <div className="w-full h-[1px] bg-[#e7ddf2] sm:hidden my-1" />{" "}
            {/* Divider for mobile */}
            {/* TO DATE */}
            <div className="flex items-center group">
              <span className="text-xs font-semibold text-[#6f5a88] mr-2 uppercase tracking-wide">
                To
              </span>
              <input
                type="date"
                className="py-2.5 text-sm font-medium text-[#2b1d3a] focus:outline-none cursor-pointer bg-transparent [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-all"
                onChange={(e) => updateFilter("to_date", e.target.value)}
                title="End Date"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 TABLE SECTION */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[1100px] w-full text-left text-sm border-collapse">
          <thead className="bg-[#faf7ff] text-[#b08fd9] text-[10px] uppercase tracking-wider font-black border-b border-[#eee4fb]">
            <tr>
              <th className="px-6 py-4">Status & Action</th>
              <th className="px-6 py-4">Method & Endpoint</th>
              <th className="px-6 py-4">Client IP</th>
              <th className="px-6 py-4">Payload</th>
              <th className="px-6 py-4">Performance</th>
              <th className="px-6 py-4">Error Details</th>
              <th className="px-6 py-4 text-right">Timestamp</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eee4fb] text-[#2b1d3a]">
            {isLoading ? (
              <TableSkeleton rows={limit} />
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="group hover:bg-[#fcfaff] transition-colors"
                >
                  {/* Status & Action */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                          log.success
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-red-50 text-red-600 border border-red-100"
                        }`}
                      >
                        {log.success ? "Success" : "Failed"}
                      </span>
                      <span className="font-semibold text-xs text-[#2b1d3a]">
                        {log.action_type.replace(/_/g, " ")}
                      </span>
                    </div>
                  </td>

                  {/* Method & Endpoint */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#faf7ff] border border-[#eee4fb] text-[#b08fd9] rounded">
                        {log.method}
                      </span>
                      <span
                        className="text-xs text-[#6f5a88] truncate max-w-[200px]"
                        title={log.endpoint}
                      >
                        {log.endpoint}
                      </span>
                    </div>
                  </td>

                  {/* IP */}
                  <td className="px-6 py-4 text-xs font-mono text-[#6f5a88]">
                    {log.ip_address}
                  </td>

                  {/* Payload Info */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs text-[#6f5a88]">
                      <span>
                        Size:{" "}
                        {log.file_size
                          ? `${(log.file_size / 1024).toFixed(1)} KB`
                          : "-"}
                      </span>
                      {log.original_format && log.target_format && (
                        <span className="text-[10px] bg-[#faf7ff] border border-[#eee4fb] px-1.5 py-0.5 rounded inline-block w-fit">
                          {log.original_format.toUpperCase()} →{" "}
                          {log.target_format.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Performance */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-medium text-[#2b1d3a]">
                      {log.processing_time_ms ?? "-"} ms
                    </span>
                  </td>

                  {/* Error Details */}
                  <td className="px-6 py-4">
                    {log.error_message ? (
                      <div
                        className="flex items-center gap-1.5 text-xs text-red-500 max-w-[200px]"
                        title={log.error_message}
                      >
                        <AlertCircle size={14} className="shrink-0" />
                        <span className="truncate">{log.error_message}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#b08fd9]">-</span>
                    )}
                  </td>

                  {/* Timestamp */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-medium text-[#2b1d3a]">
                        {new Date(log.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] text-[#6f5a88]">
                        {new Date(log.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Activity size={32} className="text-[#e7ddf2]" />
                    <p className="text-sm font-medium text-[#6f5a88]">
                      No usage logs found
                    </p>
                    <p className="text-xs text-[#b08fd9]">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 PAGINATION */}
      {pagination && pagination.total_pages_count > 0 && (
        <div className="border-t border-[#eee4fb] bg-[#faf7ff]/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6f5a88]">
          <p className="text-xs">
            Showing page{" "}
            <span className="font-bold text-[#2b1d3a]">
              {pagination.current_page}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#2b1d3a]">
              {pagination.total_pages_count}
            </span>
            <span className="ml-2 text-[#b08fd9]">
              ({pagination.total_count} total records)
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border border-[#e7ddf2] bg-white text-[#2b1d3a] font-medium hover:bg-[#faf7ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs shadow-sm"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              disabled={page === pagination.total_pages_count}
              onClick={() =>
                setPage((p) => Math.min(pagination.total_pages_count, p + 1))
              }
              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border border-[#e7ddf2] bg-white text-[#2b1d3a] font-medium hover:bg-[#faf7ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs shadow-sm"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── SKELETON LOADER ─────────────────────────────────────────────────────────
function TableSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className="animate-pulse border-b border-[#eee4fb] last:border-0"
        >
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-[#faf7ff] border border-[#eee4fb] rounded mb-2" />
            <div className="h-3 w-24 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-10 bg-[#faf7ff] rounded" />
              <div className="h-3 w-32 bg-[#faf7ff] rounded" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-3 w-20 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-3 w-16 bg-[#faf7ff] rounded mb-1.5" />
            <div className="h-3 w-20 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-3 w-12 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4">
            <div className="h-3 w-24 bg-[#faf7ff] rounded" />
          </td>
          <td className="px-6 py-4 flex flex-col items-end justify-center">
            <div className="h-3 w-20 bg-[#faf7ff] rounded mb-1.5" />
            <div className="h-2 w-12 bg-[#faf7ff] rounded" />
          </td>
        </tr>
      ))}
    </>
  );
}

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getAdminUsageLogs } from "@/lib/api/services/admin.usage-log.services";
// import {
//   UsageLog,
//   UsageLogFilters,
//   AdminUsageLogListResponse,
//   ActionTypeEnum,
// } from "@/types/usage-log-types";

// type Props = {
//   page: number;
//   limit: number;
//   filters: UsageLogFilters;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   setFilters: React.Dispatch<React.SetStateAction<UsageLogFilters>>;
// };

// export default function UsageLogsTable({
//   page,
//   limit,
//   filters,
//   setPage,
//   setFilters,
// }: Props) {
//   const { data, isLoading, isFetching } = useQuery<AdminUsageLogListResponse>({
//     queryKey: ["usage-logs", page, limit, filters],
//     queryFn: async () => {
//       const res = await getAdminUsageLogs(page, limit, filters);
//       return res.data;
//     },
//     placeholderData: (prev) => prev,
//   });

//   const logs: UsageLog[] = data?.data.logs ?? [];
//   const pagination = data?.pagination?.[0];

//   /* ---------------- FILTER HANDLER ---------------- */
//   const updateFilter = (key: keyof UsageLogFilters, value: any) => {
//     setPage(1);
//     setFilters((prev) => ({ ...prev, [key]: value || undefined }));
//   };

//   return (
//     <section className="rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm overflow-hidden space-y-4">
//       {/* 🔥 FILTERS */}
//       <div className="p-4 flex flex-wrap gap-3 border-b border-[#eee4fb] bg-[#faf7ff]">
//         <input
//           placeholder="Search logs..."
//           className="px-4 py-2 rounded-xl border border-[#e7ddf2] text-sm"
//           onChange={(e) => updateFilter("search", e.target.value)}
//         />

//         <select
//           className="px-4 py-2 rounded-xl border border-[#e7ddf2] text-sm"
//           onChange={(e) => updateFilter("action_type", e.target.value)}
//         >
//           <option value="">All Actions</option>
//           {Object.values(ActionTypeEnum).map((a) => (
//             <option key={a}>{a}</option>
//           ))}
//         </select>

//         <select
//           className="px-4 py-2 rounded-xl border border-[#e7ddf2] text-sm"
//           onChange={(e) =>
//             updateFilter(
//               "success",
//               e.target.value === "" ? undefined : e.target.value === "true",
//             )
//           }
//         >
//           <option value="">All</option>
//           <option value="true">Success</option>
//           <option value="false">Failed</option>
//         </select>

//         <input
//           type="date"
//           className="px-3 py-2 rounded-xl border border-[#e7ddf2] text-sm"
//           onChange={(e) => updateFilter("from_date", e.target.value)}
//         />

//         <input
//           type="date"
//           className="px-3 py-2 rounded-xl border border-[#e7ddf2] text-sm"
//           onChange={(e) => updateFilter("to_date", e.target.value)}
//         />
//       </div>

//       {/* 🔥 TABLE */}
//       <div className="overflow-x-auto">
//         <table className="min-w-[1200px] w-full text-sm">
//           <thead className="bg-[#faf7ff] text-[#b08fd9] text-[10px] uppercase tracking-wider">
//             <tr>
//               <th className="px-4 py-4">Action</th>
//               <th className="px-4 py-4">Status</th>
//               <th className="px-4 py-4">Method</th>
//               <th className="px-4 py-4">Endpoint</th>
//               <th className="px-4 py-4">IP</th>
//               <th className="px-4 py-4">Size</th>
//               <th className="px-4 py-4">Format</th>
//               <th className="px-4 py-4">Time</th>
//               <th className="px-4 py-4">Error</th>
//               <th className="px-4 py-4">Date</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-[#eee4fb] text-[#2b1d3a]">
//             {isLoading ? (
//               <TableSkeleton rows={limit} />
//             ) : logs.length > 0 ? (
//               logs.map((log) => (
//                 <tr key={log.id} className="hover:bg-[#fcfaff]">
//                   <td className="px-4 py-4 font-semibold">{log.action_type}</td>

//                   <td className="px-4 py-4">
//                     <span
//                       className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
//                         log.success
//                           ? "bg-emerald-50 text-emerald-600"
//                           : "bg-red-50 text-red-600"
//                       }`}
//                     >
//                       {log.success ? "SUCCESS" : "FAILED"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-4">{log.method}</td>

//                   <td className="px-4 py-4 text-xs truncate max-w-[180px]">
//                     {log.endpoint}
//                   </td>

//                   <td className="px-4 py-4 text-xs">{log.ip_address}</td>

//                   <td className="px-4 py-4 text-xs">
//                     {log.file_size
//                       ? `${(log.file_size / 1024).toFixed(1)} KB`
//                       : "-"}
//                   </td>

//                   <td className="px-4 py-4 text-xs">
//                     {log.original_format || "-"} → {log.target_format || "-"}
//                   </td>

//                   <td className="px-4 py-4 text-xs font-mono">
//                     {log.processing_time_ms ?? "-"} ms
//                   </td>

//                   <td className="px-4 py-4 text-xs text-red-500 max-w-[200px] truncate">
//                     {log.error_message || "-"}
//                   </td>

//                   <td className="px-4 py-4 text-xs">
//                     {new Date(log.created_at).toLocaleString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={10} className="text-center py-10 text-[#b08fd9]">
//                   No logs found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 PAGINATION */}
//       {pagination && (
//         <div className="flex justify-between items-center px-6 py-4 text-xs text-[#6f5a88] border-t">
//           <span>
//             Page {pagination.current_page} of {pagination.total_pages_count}
//           </span>

//           <div className="flex gap-2">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className="px-3 py-1 border rounded-lg"
//             >
//               Prev
//             </button>
//             <button
//               onClick={() =>
//                 setPage((p) => Math.min(pagination.total_pages_count, p + 1))
//               }
//               className="px-3 py-1 border rounded-lg"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {isFetching && !isLoading && (
//         <div className="px-6 py-2 text-xs text-[#b08fd9]">Updating...</div>
//       )}
//     </section>
//   );
// }

// function TableSkeleton({ rows }: { rows: number }) {
//   return (
//     <>
//       {Array.from({ length: rows }).map((_, i) => (
//         <tr key={i} className="animate-pulse">
//           <td className="p-4 bg-gray-100" colSpan={10}></td>
//         </tr>
//       ))}
//     </>
//   );
// }
