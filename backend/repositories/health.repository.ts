import { HealthStatus } from "../enums/status.enum";
import { HealthRecord } from "../models/health.model";

export class HealthRepository {
  createStatus(
    message: string,
    status: HealthStatus = HealthStatus.OK,
  ): HealthRecord {
    return {
      status,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
