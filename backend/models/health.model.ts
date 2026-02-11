import { HealthStatus } from "../enums/status.enum";

export type HealthRecord = {
  status: HealthStatus;
  message: string;
  timestamp: string;
};
