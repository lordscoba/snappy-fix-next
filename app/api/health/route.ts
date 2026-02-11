import { NextResponse } from "next/server";
import { HealthController } from "../../../backend";
import { validateHealthPostDTO } from "../../../backend/dtos/health.dto";
import { ok, fail } from "../../../packages/api/responses";
import { log } from "../../../packages/logger";

const controller = new HealthController();

export function GET() {
  const data = controller.get();
  log("info", "GET /api/health");
  return NextResponse.json(ok("Health check ok", data), { status: 200 });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const dto = validateHealthPostDTO(payload);
    const data = controller.post(dto);
    log("info", "POST /api/health", { message: dto.message || "" });
    return NextResponse.json(ok("Health check received", data), {
      status: 200,
    });
  } catch (error) {
    log("error", "POST /api/health failed", { error: String(error) });
    return NextResponse.json(fail("Invalid request body", String(error)), {
      status: 400,
    });
  }
}
