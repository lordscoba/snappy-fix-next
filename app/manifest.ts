import { toolCategories } from "@/data/toolsCategoryData";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const shortcuts = toolCategories.slice(0, 4).map((category) => ({
    name: category.name,
    url: category.href,
    description: `Access our ${category.name}`,
  }));
  return {
    name: "Snappy-Fix Technologies",
    short_name: "Snappy-Fix",
    description: "Professional Online Image, PDF, and SEO Tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a", // Matches your themeColor
    theme_color: "#0f172a",
    icons: [
      {
        src: "/images/snappy-fix-logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable", // Allows Android to crop your logo into circles/squares
      },
      {
        src: "/images/snappy-fix-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcuts: shortcuts,
  };
}
