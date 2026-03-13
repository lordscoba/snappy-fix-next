import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { urls } = await req.json();

  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      host: "snappy-fix.com",
      key: "912144dd-3612-4949-9768-fded8fdc1c02",
      urlList: urls,
    }),
  });

  return NextResponse.json({ success: true });
}
