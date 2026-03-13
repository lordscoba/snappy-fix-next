export async function submitToIndexNow(urls: string[]): Promise<void> {
  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: "https://snappy-fix.com",
        key: "912144dd-3612-4949-9768-fded8fdc1c02",
        keyLocation:
          "https://snappy-fix.com/912144dd-3612-4949-9768-fded8fdc1c02.txt",
        urlList: urls,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("IndexNow submission failed:", text);
      return;
    }

    console.log("IndexNow submission successful");
  } catch (error) {
    console.error("IndexNow error:", error);
  }
}

// Usage

// Now you can call it anywhere:

// import { submitToIndexNow } from "@/lib/indexnow";

// submitToIndexNow([
//   "https://snappy-fix.com/tools/svg-optimizer",
//   "https://snappy-fix.com/tools/base64-to-image"
// ]);
