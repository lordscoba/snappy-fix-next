export type AppEnv = "development" | "production" | "test";

export function getAppEnv(): AppEnv {
  const appEnv = process.env.APP_ENV?.toLowerCase();
  if (
    appEnv === "development" ||
    appEnv === "production" ||
    appEnv === "test"
  ) {
    return appEnv;
  }

  const nodeEnv = process.env.NODE_ENV?.toLowerCase();
  if (
    nodeEnv === "development" ||
    nodeEnv === "production" ||
    nodeEnv === "test"
  ) {
    return nodeEnv;
  }

  return "development";
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
