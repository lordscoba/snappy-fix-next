import { AdminMetricsResponse } from "@/types/metrics-types";
import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

/* ---------------- GET METRICS ---------------- */
export const getAdminMetrics = async () => {
  return clients.golang.get<AdminMetricsResponse>(WEB_ENDPOINTS.admin_metrics);
};
