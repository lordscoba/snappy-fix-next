import { ApiResponse, Pagination } from "./base-response";

export enum ActionTypeEnum {
  CONVERT = "CONVERT",
  OPTIMIZE = "OPTIMIZE",
  ANALYZE = "ANALYZE",
  SVG_OPTIMIZE = "SVG_OPTIMIZE",
  CROP = "CROP",
  RESIZE = "RESIZE",
  TO_BASE64 = "TO_BASE64",
  FROM_BASE64 = "FROM_BASE64",
  FAVICON_GENERATE = "FAVICON_GENERATE",

  OPTIMIZE_TWITTER = "OPTIMIZE_TWITTER",
  OPTIMIZE_WHATSAPP = "OPTIMIZE_WHATSAPP",
  OPTIMIZE_WEB = "OPTIMIZE_WEB",
  OPTIMIZE_CUSTOM = "OPTIMIZE_CUSTOM",
  OPTIMIZE_INSTAGRAM = "OPTIMIZE_INSTAGRAM",
  OPTIMIZE_YOUTUBE = "OPTIMIZE_YOUTUBE",
  OPTIMIZE_SEO = "OPTIMIZE_SEO",

  PDF_COMPRESS = "PDF_COMPRESS",
  PDF_COMPRESS_PRO = "PDF_COMPRESS_PRO",

  IMAGE_TO_PDF = "IMAGE_TO_PDF",
  PDF_TO_IMAGE = "PDF_TO_IMAGE",

  EXIF_SCRUBBER = "EXIF_SCRUBBER",

  HEIC_TO_IMAGE = "HEIC_TO_IMAGE",
  IMAGE_TO_HEIC = "IMAGE_TO_HEIC",

  IMAGE_COLOR_EFFECTS = "IMAGE_COLOR_EFFECTS",
  IMAGE_DPI_CHANGER = "IMAGE_DPI_CHANGER",
  IMAGE_DPI_CHECKER = "IMAGE_DPI_CHECKER",

  PASSWORD_GENERATOR = "PASSWORD_GENERATOR",
  EXTRACT_PDF_IMAGES = "EXTRACT_PDF_IMAGES",

  VIDEO_TO_STICKER = "VIDEO_TO_STICKER",
  IMAGE_TO_STICKER = "IMAGE_TO_STICKER",
  VIDEO_TO_GIF = "VIDEO_TO_GIF",
  IMAGE_TO_GIF = "IMAGE_TO_GIF",

  WATERMARK_IMAGES = "WATERMARK_IMAGES",
}

export type UsageLogFilters = {
  search?: string;
  action_type?: ActionTypeEnum;
  success?: boolean;
  method?: string;
  from_date?: string;
  to_date?: string;
};

/* ---------------- ENTITY ---------------- */
export type UsageLog = {
  id: number;

  action_type: string;
  endpoint: string;
  method: string;

  ip_address: string;
  user_agent: string;

  file_size?: number;
  original_format?: string;
  target_format?: string;

  success: boolean;
  status_code: number;

  processing_time_ms?: number;

  error_type?: string;
  error_message?: string;

  created_at: string;
};

/* ---------------- LIST ---------------- */
export type AdminUsageLogListResponse = ApiResponse<{
  logs: UsageLog[];
}> & {
  pagination: Pagination;
};

/* ---------------- COUNT ALL ---------------- */
export type AdminUsageLogCountResponse = ApiResponse<{
  total: number;
}> & {
  pagination: Pagination;
};

/* ---------------- ERROR COUNT ---------------- */
export type AdminUsageErrorCountResponse = ApiResponse<{
  errors: number;
}> & {
  pagination: Pagination;
};

/* ---------------- ACTION COUNT ---------------- */
export type AdminUsageActionCountResponse = ApiResponse<{
  action_type: string;
  count: number;
}> & {
  pagination: Pagination;
};

/* ---------------- AVG PROCESSING ---------------- */
export type AdminAvgProcessingResponse = ApiResponse<{
  average_processing_time_ms: number;
}> & {
  pagination: Pagination;
};

/* ---------------- ERROR RATE ---------------- */
export type AdminErrorRateResponse = ApiResponse<{
  error_rate_percent: number;
}> & {
  pagination: Pagination;
};

/* ---------------- GROUP BY ACTION ---------------- */
export type ActionStat = {
  ActionType: string;
  Count: number;
};

export type AdminGroupByActionResponse = ApiResponse<{
  actions: ActionStat[];
}> & {
  pagination: Pagination;
};
