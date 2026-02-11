export type HealthResponse = {
  status: "ok" | "error";
  env: string;
  message: string;
  timestamp: string;
  echo?: string;
};
