import { HealthService } from "../services/health.services";
import { HealthPostDTO } from "../dtos/health.dto";

export class HealthController {
  private service = new HealthService();

  get() {
    return this.service.getHealth();
  }

  post(payload?: HealthPostDTO) {
    return this.service.postHealth(payload?.message);
  }
}
