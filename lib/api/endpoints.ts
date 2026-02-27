export const IMAGE_ENDPOINTS = {
  CONVERT: "/convert",

  // Optimizers
  OPTIMIZE_TWITTER: "/optimize/twitter",
  OPTIMIZE_WEB: "/optimize/web",
  OPTIMIZE_INSTAGRAM: "/optimize/instagram",
  OPTIMIZE_YOUTUBE_THUMBNAIL: "/optimize/youtube-thumbnail",
  OPTIMIZE_SEO_RESPONSIVE: "/optimize/seo-responsive",
  OPTIMIZE_WHATSAPP: "/optimize/whatsapp",
  OPTIMIZE_CUSTOM: "/optimize/custom",

  // Analyzers
  ANALYZE: "/analyze",

  // svg optimizers
  SVG_OPTIMIZE: "/svg/optimize",

  // Cropping
  CROP: "/images/crop",

  // Resizing
  RESIZE: "/images/resize",

  // Base64
  IMAGE_TO_BASE64: "/images/to-base64",
  BASE64_TO_IMAGE: "/images/from-base64",

  //Favicon Generator
  FAVICON: "/images/favicon",
} as const;
