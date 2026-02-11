import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { log } from "../../packages/logger";

export function middleware(req: NextRequest) {
  log("info", "Request", { path: req.nextUrl.pathname, method: req.method });
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
