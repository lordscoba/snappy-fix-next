import { register } from "module";

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
  SVG_OPTIMIZE: "/optimize-svg",

  // Cropping
  CROP: "/images/crop",

  // Resizing
  RESIZE: "/images/resize",

  // Base64
  IMAGE_TO_BASE64: "/images/to-base64",
  BASE64_TO_IMAGE: "/images/from-base64",

  //Favicon Generator
  FAVICON: "/images/favicon",

  // PDF Compressor
  PDF_COMPRESS: "/compress-pdf",
  PDF_COMPRESS_PRO: "/compress-pdf/pro",

  //Image to PDF Converter
  IMAGE_TO_PDF: "/image-to-pdf",
  PDF_TO_IMAGE: "/pdf-to-image",

  //HEIC Converter
  HEIC_TO_IMAGE: "/heic-to-image",
  IMAGE_TO_HEIC: "/image-to-heic",

  // PDF EXTRACTOR
  EXTRACT_PDF_IMAGES: "/extract-pdf-images",

  //WATERMARK
  WATERMARK_IMAGE: "/watermark-image",

  // Image color effect
  IMAGE_COLOR_EFFECT: "/image-color-effect",

  // EXif Scrubber
  EXIF_SCRUBBER: "/exif-scrubber",

  // Image DPI Changer
  IMAGE_DPI_CHANGER: "/image-dpi-changer",
  IMAGE_DPI_CHECKER: "/image-dpi-checker",

  // Password Generator
  PASSWORD_GENERATOR: "/secure-password-generator",

  // GIF CONVERTER
  VIDEO_TO_GIF: "/video-to-gif",
  IMAGE_TO_GIF: "/image-to-gif",

  // STICKER GENERATOR
  VIDEO_TO_STICKER: "/video-to-sticker",
  IMAGE_TO_STICKER: "/image-to-sticker",
} as const;

export const WEB_ENDPOINTS = {
  // Auth
  register: "/auth/register",
  login: "/auth/login",
  refreshToken: "/auth/refresh-token",
  logout: "/auth/logout",

  // blog
  blog_list: "/blog/news",
  blog_details: "/blog/news/",
  blog_featured: "blog/news/featured",
  blog_exclusive: "/blog/news/exclusive",
  // blog_category: "/blog/news/category",
  blog_search: "/blog/news/search",

  // blog category
  blog_category_list: "/blog/categories",
  blog_category_details: "/blog/categories/",
  blog_category_top: "/blog/categories/top",

  // admin bog
  admin_login: "/admin/login",
  admin_blog_list: "/admin/news/",
  admin_blog_details: "/admin/news/",
  admin_blog_create: "/admin/news",
  admin_blog_update: "/admin/news/",
  admin_blog_delete: "/admin/news/",

  // admin category
  admin_category_list: "/admin/categories",
  admin_category_details: "/admin/categories/",
  admin_category_create: "/admin/categories",
  admin_category_update: "/admin/categories/",
  admin_category_delete: "/admin/categories/",
  admin_category_top: "/admin/categories/top",
} as const;
