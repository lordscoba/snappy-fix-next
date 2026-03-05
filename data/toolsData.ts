export const tools = [
  {
    slug: "image-converter",
    name: "Online Image Converter",
    description:
      "Convert images between JPG, PNG, WEBP, SVG and more instantly.",
    longDescription:
      "A free online image converter to change formats like JPG to PNG, PNG to WEBP, or WEBP to JPG. High-quality, secure, and lightning-fast conversion.",
    category: "Conversion Tools",
    href: "/tools/image-converter",
    icon: "convert",
    keywords: [
      "image converter",
      "convert jpg to png",
      "convert webp to jpg",
      "bulk image converter",
    ],
  },
  {
    slug: "optimize-twitter-image",
    name: "Twitter Image Optimizer & Resizer",
    description:
      "Resize and optimize images perfectly for Twitter posts and headers.",
    longDescription:
      "Ensure your Twitter posts and profile headers look professional. This tool optimizes image dimensions and file size for maximum engagement and fast loading.",
    category: "Social Media Optimizers",
    href: "/tools/optimize-twitter-image",
    api: "/api/v1/optimize/twitter",
  },
  {
    slug: "optimize-whatsapp-image",
    name: "WhatsApp Image Optimizer",
    description: "Resize and compress images for WhatsApp status and chats.",
    longDescription:
      "Stop WhatsApp from ruining your image quality. Compress and resize images to the perfect dimensions for WhatsApp status and direct messaging.",
    category: "Social Media Optimizers",
    href: "/tools/optimize-whatsapp-image",
    api: "/api/v1/optimize/whatsapp",
  },
  {
    slug: "optimize-web-image",
    name: "Web Image Optimizer (JPG/PNG/WEBP)",
    description: "Optimize images for websites to improve PageSpeed and SEO.",
    longDescription:
      "Reduce image file sizes by up to 80% without losing quality. Perfect for improving Core Web Vitals and website loading performance.",
    category: "Optimization Tools",
    href: "/tools/optimize-web-image",
    api: "/api/v1/optimize/web",
  },
  {
    slug: "optimize-instagram-image",
    name: "Instagram Post & Reel Resizer",
    description:
      "Resize images perfectly for Instagram posts, stories, and reels.",
    longDescription:
      "Automatically crop and resize images to Instagram’s 1:1, 4:5, and 9:16 aspect ratios to ensure your content never gets cut off.",
    category: "Social Media Optimizers",
    href: "/tools/optimize-instagram-image",
    api: "/api/v1/optimize/instagram",
  },
  {
    slug: "optimize-youtube-thumbnail-image",
    name: "YouTube Thumbnail Optimizer",
    description:
      "Optimize thumbnails for YouTube (1280x720) with high compression.",
    longDescription:
      "Create the perfect YouTube thumbnail. Our tool ensures your image meets the 2MB limit while maintaining 1280x720 HD resolution.",
    category: "Social Media Optimizers",
    href: "/tools/optimize-youtube-thumbnail-image",
    api: "/api/v1/optimize/youtube-thumbnail",
  },
  {
    slug: "optimize-seo-responsive-image",
    name: "SEO & Responsive Image Generator",
    description:
      "Generate responsive images for modern SEO and Core Web Vitals.",
    longDescription:
      "Generate multiple image sizes for srcset attributes. Improve your SEO score by serving the right image size to mobile and desktop users.",
    category: "SEO Tools",
    href: "/tools/optimize-seo-responsive-image",
    api: "/api/v1/optimize/seo-responsive",
  },
  {
    slug: "image-analyzer",
    name: "Image Metadata & DPI Analyzer",
    description: "Analyze image size, format, EXIF metadata, and dimensions.",
    longDescription:
      "Deep-dive into your image properties. Check DPI, EXIF data, color profiles, and hidden metadata instantly.",
    category: "Analysis Tools",
    href: "/tools/image-analyzer",
    api: "/api/v1/analyze/",
  },
  {
    slug: "svg-image-optimizer",
    name: "SVG Vector Optimizer (SVGO)",
    description: "Reduce SVG file size instantly by removing unnecessary code.",
    longDescription:
      "Clean up your SVG files. Remove metadata, comments, and hidden elements to create tiny, fast-loading vector files for the web.",
    category: "Optimization Tools",
    href: "/tools/svg-image-optimizer",
    api: "/api/v1/optimize-svg",
  },
  {
    slug: "image-cropper",
    name: "Free Online Image Cropper",
    description: "Crop images to exact dimensions or aspect ratios online.",
    longDescription:
      "A precise image cropping tool. Select custom areas or use presets for social media to get the perfect frame every time.",
    category: "Editing Tools",
    href: "/tools/image-cropper",
    api: "/api/v1/images/crop",
  },
  {
    slug: "image-resizer",
    name: "Image Resizer: Resize by Pixels or %",
    description: "Resize images to custom width and height instantly.",
    longDescription:
      "Quickly resize images by entering custom dimensions or scaling by percentage. Maintain aspect ratio for high-quality results.",
    category: "Editing Tools",
    href: "/tools/image-resizer",
    api: "/api/v1/images/resize",
  },
  {
    slug: "image-to-base64",
    name: "Image to Base64 Converter",
    description: "Convert images to Base64 strings for CSS and HTML.",
    longDescription:
      "Encode images into Base64 format instantly. Perfect for embedding small icons directly into your code to reduce HTTP requests.",
    category: "Conversion Tools",
    href: "/tools/image-to-base64",
    api: "/api/v1/images/to-base64",
  },
  {
    slug: "base64-to-image",
    name: "Base64 String to Image Decoder",
    description: "Decode Base64 strings back into viewable image files.",
    longDescription:
      "Turn Base64 code back into JPG, PNG, or WEBP files. Simply paste your data URI and download your image instantly.",
    category: "Conversion Tools",
    href: "/tools/base64-to-image",
    api: "/api/v1/images/from-base64",
  },
  {
    slug: "favicon-generator",
    name: "Favicon & App Icon Generator",
    description:
      "Generate professional favicon icons for websites from any image.",
    longDescription:
      "Convert your logo into standard 16x16, 32x32, and Apple Touch icons. Get your website's branding ready in seconds.",
    category: "SEO Tools",
    href: "/tools/favicon-generator",
    api: "/api/v1/images/favicon",
  },
  {
    slug: "optimize-image-custom",
    name: "Professional Custom Image Optimizer",
    description: "Full control over image compression, quality, and file size.",
    longDescription:
      "The ultimate image tool. Compress to a specific target KB size, adjust quality sliders, and resize dimensions all in one place.",
    category: "Optimization Tools",
    href: "/tools/optimize-image-custom",
    api: "/api/v1/optimize/custom",
  },
];
// export const tools = [
//   {
//     slug: "image-converter",
//     name: "Image Converter",
//     description:
//       "Convert images between JPG, PNG, WEBP, SVG and more instantly online.",
//     longDescription:
//       "Free online image converter tool that allows you to convert JPG to PNG, PNG to WEBP, WEBP to JPG and more. Fast, secure and high-quality conversion.",
//     category: "Conversion Tools",
//     href: "/tools/image-converter",
//     icon: "convert",
//     keywords: [
//       "image converter",
//       "convert jpg to png",
//       "convert webp to jpg",
//       "free image converter online",
//     ],
//   },

//   {
//     slug: "optimize-twitter-image",
//     name: "Twitter Image Optimizer",
//     description:
//       "Resize and optimize images perfectly for Twitter posts and previews.",
//     longDescription:
//       "Optimize images for Twitter with correct dimensions and compression for better engagement and faster loading.",
//     category: "Social Media Optimizers",
//     href: "/tools/optimize-twitter-image",
//     api: "/api/v1/optimize/twitter",
//   },

//   {
//     slug: "optimize-whatsapp-image",
//     name: "WhatsApp Image Optimizer",
//     description: "Resize and compress images for WhatsApp sharing.",
//     longDescription:
//       "Ensure your images are perfectly sized and compressed for WhatsApp status and chats.",
//     category: "Social Media Optimizers",
//     href: "/tools/optimize-whatsapp-image",
//     api: "/api/v1/optimize/whatsapp",
//   },

//   {
//     slug: "optimize-web-image",
//     name: "Web Image Optimizer",
//     description:
//       "Optimize images for websites to improve speed and performance.",
//     longDescription:
//       "Compress and convert images to web-friendly formats for faster loading websites.",
//     category: "Optimization Tools",
//     href: "/tools/optimize-web-image",
//     api: "/api/v1/optimize/web",
//   },

//   {
//     slug: "optimize-instagram-image",
//     name: "Instagram Image Optimizer",
//     description: "Resize images perfectly for Instagram posts and reels.",
//     longDescription:
//       "Automatically adjust dimensions and optimize images for Instagram feed and reels.",
//     category: "Social Media Optimizers",
//     href: "/tools/optimize-instagram-image",
//     api: "/api/v1/optimize/instagram",
//   },

//   {
//     slug: "optimize-youtube-thumbnail-image",
//     name: "YouTube Thumbnail Optimizer",
//     description:
//       "Optimize thumbnails for YouTube with correct size and compression.",
//     longDescription:
//       "Create high-quality, optimized YouTube thumbnails that meet platform requirements.",
//     category: "Social Media Optimizers",
//     href: "/tools/optimize-youtube-thumbnail-image",
//     api: "/api/v1/optimize/youtube-thumbnail",
//   },

//   {
//     slug: "optimize-seo-responsive-image",
//     name: "SEO Responsive Image Optimizer",
//     description:
//       "Generate responsive images for SEO and better Core Web Vitals.",
//     longDescription:
//       "Improve SEO performance by generating optimized responsive images for all devices.",
//     category: "SEO Tools",
//     href: "/tools/optimize-seo-responsive-image",
//     api: "/api/v1/optimize/seo-responsive",
//   },
//   {
//     slug: "image-analyzer",
//     name: "Image Analyzer",
//     description: "Analyze image size, format, metadata and dimensions.",
//     longDescription:
//       "Inspect your image properties including size, dimensions, and metadata.",
//     category: "Analysis Tools",
//     href: "/tools/image-analyzer",
//     api: "/api/v1/analyze/",
//   },

//   {
//     slug: "svg-image-optimizer",
//     name: "SVG Optimizer",
//     description: "Reduce SVG file size instantly without quality loss.",
//     longDescription:
//       "Optimize SVG files by removing unnecessary data and reducing size.",
//     category: "Optimization Tools",
//     href: "/tools/svg-image-optimizer",
//     api: "/api/v1/optimize-svg",
//   },

//   {
//     slug: "image-cropper",
//     name: "Image Cropper",
//     description: "Crop images to exact dimensions online.",
//     longDescription: "Free online image cropper tool to crop images precisely.",
//     category: "Editing Tools",
//     href: "/tools/image-cropper",
//     api: "/api/v1/images/crop",
//   },

//   {
//     slug: "image-resizer",
//     name: "Online Image Resizer interface",
//     description: "Resize images to custom width and height.",
//     longDescription:
//       "Quickly resize images while maintaining aspect ratio and quality.",
//     category: "Editing Tools",
//     href: "/tools/image-resizer",
//     api: "/api/v1/images/resize",
//   },

//   {
//     slug: "image-to-base64",
//     name: "Image to Base64",
//     description: "Convert images to Base64 encoding.",
//     longDescription:
//       "Encode images to Base64 format for embedding in HTML, CSS, or JSON.",
//     category: "Conversion Tools",
//     href: "/tools/image-to-base64",
//     api: "/api/v1/images/to-base64",
//   },

//   {
//     slug: "base64-to-image",
//     name: "Base64 to Image",
//     description: "Decode Base64 string back to image.",
//     longDescription:
//       "Convert Base64 encoded strings back into image files instantly.",
//     category: "Conversion Tools",
//     href: "/tools/base64-to-image",
//     api: "/api/v1/images/from-base64",
//   },

//   {
//     slug: "favicon-generator",
//     name: "Favicon Generator",
//     description: "Generate favicon icons from any image.",
//     longDescription:
//       "Create optimized favicon files for websites from JPG, PNG or SVG.",
//     category: "SEO Tools",
//     href: "/tools/favicon-generator",
//     api: "/api/v1/images/favicon",
//   },
//   {
//     slug: "optimize-image-custom",
//     name: "Custom Image Optimizer",
//     description: "Optimize images for any purpose.",
//     longDescription:
//       "Optimize images with custom settings. Compress to target KB, adjust quality, and resize by percentage. Full control image optimization tool – fast, secure and free.",
//     category: "Optimization Tools",
//     href: "/tools/optimize-image-custom",
//     api: "/api/v1/optimize/custom",
//   },
// ];
