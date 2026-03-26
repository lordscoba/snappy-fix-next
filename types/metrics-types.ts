import { ApiResponse, Pagination } from "./base-response";

/* ---------------- METRIC ITEM ---------------- */
export type MetricItem = {
  description: string;
  metric: string;
  sla_target: number;
  status: "GOOD" | "BAD";
  value: number;
};

/* ---------------- WINDOW ---------------- */
export type MetricsWindow = {
  days: number;
  start: string;
  end: string;
};

/* ---------------- METRICS DATA ---------------- */
export type MetricsData = {
  downtime_incidents: MetricItem;
  error_rate: MetricItem;
  latency: MetricItem;
  uptime: MetricItem;
  window: MetricsWindow;
};

/* ---------------- RESPONSE ---------------- */
export type AdminMetricsResponse = ApiResponse<MetricsData> & {
  pagination: Pagination;
};
