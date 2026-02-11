export type HealthPostDTO = {
  message?: string;
};

export function validateHealthPostDTO(payload: unknown): HealthPostDTO {
  if (!payload || typeof payload !== "object") return {};

  const maybe = payload as { message?: unknown };
  if (maybe.message && typeof maybe.message !== "string") {
    throw new Error("message must be a string");
  }

  return { message: maybe.message as string | undefined };
}
