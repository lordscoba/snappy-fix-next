import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    /* ---------------- PARSE BODY ---------------- */
    const body = await req.json().catch(() => null);

    if (!body || !Array.isArray(body.urls)) {
      return NextResponse.json(
        { error: "Invalid payload: urls must be an array" },
        { status: 400 },
      );
    }

    const urls: string[] = body.urls;

    if (urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }

    /* ---------------- CALL INDEXNOW ---------------- */
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        host: "https://www.snappy-fix.com",
        key: "912144dd-3612-4949-9768-fded8fdc1c02",
        keyLocation:
          "https://www.snappy-fix.com/912144dd-3612-4949-9768-fded8fdc1c02.txt",
        urlList: urls,
      }),
    });

    clearTimeout(timeout);

    /* ---------------- HANDLE RESPONSE ---------------- */
    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");

      return NextResponse.json(
        {
          error: "IndexNow request failed",
          details: text,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      submitted: urls.length,
    });
  } catch (error: any) {
    console.error("IndexNow API Error:", error);

    return NextResponse.json(
      {
        error:
          error?.name === "AbortError"
            ? "IndexNow request timed out"
            : error?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}

// {
//   "urls": [
//     "https://www.snappy-fix.com/tools/base64-to-image"
//   ]
// }
