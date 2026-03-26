import { toolCategories } from "@/data/toolsCategoryData";
import { tools } from "@/data/toolsData";

const BASE_URL = "https://www.snappy-fix.com";

/* ---------------- GENERATE ALL URLS ---------------- */
export function generateIndexNowUrls(): string[] {
  const toolUrls = tools.map((tool) => `${BASE_URL}/tools/${tool.slug}`);

  const categoryUrls = toolCategories.map(
    (cat) => `${BASE_URL}/tools/${cat.slug}`,
  );

  const staticUrls = [`${BASE_URL}/tools`, `${BASE_URL}/sitemap.xml`];

  // remove duplicates (important)
  return Array.from(new Set([...toolUrls, ...categoryUrls, ...staticUrls]));
}

/* ---------------- HASH GENERATOR ---------------- */
async function generateHash(data: any): Promise<string> {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));

  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);

  // convert to hex string
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
/* ---------------- SMART SUBMIT ---------------- */
export async function smartIndexNowSubmit(): Promise<boolean> {
  try {
    // combine BOTH datasets
    const combinedData = {
      tools,
      toolCategories,
    };

    const currentHash = await generateHash(combinedData);

    // guard for SSR
    if (typeof window === "undefined") return false;

    const lastHash = localStorage.getItem("indexnow_hash");

    if (currentHash !== lastHash) {
      const urls = generateIndexNowUrls();

      // fire and forget
      await submitToIndexNow(urls);

      localStorage.setItem("indexnow_hash", currentHash);

      console.log("IndexNow triggered (tools/categories changed)");
      return true;
    }
    console.log("No changes detected, skipping IndexNow");
    return false;
  } catch (error) {
    console.error("IndexNow smart submit error:", error);
    throw error;
  }
}

/* ---------------- MANUAL FORCE SUBMIT ---------------- */
export async function submitAllToIndexNow() {
  const urls = generateIndexNowUrls();

  await submitToIndexNow(urls);

  console.log(" Manual IndexNow submission complete");
}

/* ---------------- SUBMIT TO INDEXNOW ---------------- */
export async function submitToIndexNow(
  urls: string[],
  options?: { type?: "update" | "delete" },
): Promise<void> {
  try {
    const res = await fetch("/api/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: "https://www.snappy-fix.com",
        key: "912144dd-3612-4949-9768-fded8fdc1c02",
        keyLocation:
          "https://www.snappy-fix.com/912144dd-3612-4949-9768-fded8fdc1c02.txt",
        urlList: urls,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.error || "IndexNow failed");
    }

    console.log(
      `IndexNow ${options?.type === "delete" ? "de-index" : "update"} submitted:`,
      urls,
    );
  } catch (error) {
    console.error("IndexNow error:", error);
    throw error; // 🔥 important for UI handling
  }
}

// Usage

// Now you can call it anywhere:

// import { submitToIndexNow } from "@/lib/indexnow";

// submitToIndexNow([
//   "https://www.snappy-fix.com/tools/svg-optimizer",
//   "https://www.snappy-fix.com/tools/base64-to-image"
// ]);
