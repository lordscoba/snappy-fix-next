import { getAppEnv } from "../../lib/env";
import { HealthRepository } from "../repositories/health.repository";
import { HealthResponse } from "../types/api.types";

export class HealthService {
  private repo = new HealthRepository();

  getHealth(): HealthResponse {
    const record = this.repo.createStatus("Service is healthy");
    return {
      ...record,
      env: getAppEnv(),
    };
  }

  postHealth(message?: string): HealthResponse {
    const record = this.repo.createStatus(message || "Health check received");
    return {
      ...record,
      env: getAppEnv(),
      echo: message || "",
    };
  }
}
