type LogLevel = "info" | "warn" | "error";

export function log(
  level: LogLevel,
  message: string,
  meta?: Record<string, unknown>,
) {
  const payload = meta ? ` | ${JSON.stringify(meta)}` : "";
  if (level === "error") {
    console.error(`[${level.toUpperCase()}] ${message}${payload}`);
    return;
  }
  if (level === "warn") {
    console.warn(`[${level.toUpperCase()}] ${message}${payload}`);
    return;
  }
  console.log(`[${level.toUpperCase()}] ${message}${payload}`);
}
