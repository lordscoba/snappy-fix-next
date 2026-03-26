import {
  AdminUsageLogListResponse,
  AdminUsageLogCountResponse,
  AdminUsageErrorCountResponse,
  AdminUsageActionCountResponse,
  AdminAvgProcessingResponse,
  AdminErrorRateResponse,
  AdminGroupByActionResponse,
  UsageLogFilters,
  ActionTypeEnum,
} from "@/types/usage-log-types";

import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

/* ---------------- GET LOGS ---------------- */
// ?search="hello"&action_type="upload"&success="true"&method="POST"&from_date="2023-01-01"&to_date="2023-12-31"
/* ---------------- GET LOGS ---------------- */

export const getAdminUsageLogs = async (
  page: number = 1,
  limit: number = 10,
  filters?: UsageLogFilters,
) => {
  const queryParams = new URLSearchParams();

  // pagination
  queryParams.append("page", String(page));
  queryParams.append("limit", String(limit));

  // dynamic filters
  if (filters) {
    if (filters.search) queryParams.append("search", filters.search);

    if (filters.action_type)
      queryParams.append("action_type", filters.action_type);

    if (filters.success !== undefined)
      queryParams.append("success", String(filters.success));

    if (filters.method) queryParams.append("method", filters.method);

    if (filters.from_date) queryParams.append("from_date", filters.from_date);

    if (filters.to_date) queryParams.append("to_date", filters.to_date);
  }

  return clients.golang.get<AdminUsageLogListResponse>(
    `${WEB_ENDPOINTS.admin_usage_log_list}?${queryParams.toString()}`,
  );
};
/* ---------------- COUNT ALL ---------------- */
export const countAllUsageLogs = async () => {
  return clients.golang.get<AdminUsageLogCountResponse>(
    WEB_ENDPOINTS.admin_usage_log_count_all,
  );
};

/* ---------------- COUNT ERRORS ---------------- */
export const countUsageErrors = async () => {
  return clients.golang.get<AdminUsageErrorCountResponse>(
    WEB_ENDPOINTS.admin_usage_count_errors,
  );
};

/* ---------------- COUNT BY ACTION ---------------- */
export const countUsageByAction = async (action: ActionTypeEnum) => {
  return clients.golang.get<AdminUsageActionCountResponse>(
    `${WEB_ENDPOINTS.admin_usage_count_actions}${action}`,
  );
};

/* ---------------- AVG PROCESSING ---------------- */
export const getAverageProcessingTime = async () => {
  return clients.golang.get<AdminAvgProcessingResponse>(
    WEB_ENDPOINTS.admin_stats_average_processing_speed,
  );
};

/* ---------------- ERROR RATE ---------------- */
export const getErrorRate = async () => {
  return clients.golang.get<AdminErrorRateResponse>(
    WEB_ENDPOINTS.admin_stats_error_rate,
  );
};

/* ---------------- GROUP BY ACTION ---------------- */
export const getUsageGroupedByAction = async () => {
  return clients.golang.get<AdminGroupByActionResponse>(
    WEB_ENDPOINTS.admin_stats_group_by_action,
  );
};
