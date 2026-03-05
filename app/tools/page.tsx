import ToolsComponents from "./ToolsComponents";

export const metadata = {
  title:
    "Free Online Image Tools | Image Converter, Optimizer, Analyzer - Snappy Fix",
  description:
    "Explore free online image tools including image converter, optimizer, analyzer, cropper, SVG optimizer and more. Fast, secure and SEO-friendly tools by Snappy Fix.",
  keywords: [
    "free image tools",
    "image optimizer online",
    "image converter",
    "svg optimizer",
    "resize image online",
  ],
};

export default function Page() {
  // We return the Client Component here.
  // This allows the page to remain a Server Component for SEO (metadata)
  // while enabling interactivity inside ToolsComponents.
  return <ToolsComponents />;
}
