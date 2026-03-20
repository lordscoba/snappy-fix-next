import { ApiResponse, Pagination } from "./base-response";

export type ImageAsset = {
  id: string;
  news_id?: string | null;
  public_id: string;
  url: string;
  image_type: string;
  file_name: string;
  extension: string;
  size: number;
  description?: string;
  created_at: string;
};

/* ---------------- PAYLOADS ---------------- */
export type CreateImagePayload = {
  file_name?: string;
  description?: string;
  image_type?: string;
  images: File[]; // For multiple upload
};

/* ---------------- RESPONSES ---------------- */
export type AdminImageListResponse = ApiResponse<{
  images: ImageAsset[];
}> & {
  pagination: Pagination;
};

export type AdminImageDetailsResponse = ApiResponse<{
  image: ImageAsset;
}> & {
  pagination: Pagination;
};

export type AdminImageCreateResponse = ApiResponse<{
  images: ImageAsset[];
}> & {
  pagination: Pagination;
};

export type AdminImageDeleteResponse = ApiResponse<{
  message: string;
}> & {
  pagination: Pagination;
};
