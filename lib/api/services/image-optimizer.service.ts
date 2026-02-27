import { apiClient } from "@/lib/api/client";
import { AxiosProgressEvent } from "axios";
import { IMAGE_ENDPOINTS } from "../endpoints";

/**
 * Optimize image for Twitter
 * Backend: POST /optimize/twitter
 * Returns: optimized image (Blob)
 */
export const optimizeTwitterImage = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.OPTIMIZE_TWITTER, formData, {
    responseType: "blob", // IMPORTANT if backend returns file
    onUploadProgress,
  });
};

export const optimizeInstagramImage = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.OPTIMIZE_INSTAGRAM, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};

export const optimizeYouTubeThumbnail = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.OPTIMIZE_YOUTUBE_THUMBNAIL, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};

export const optimizeWhatsAppImage = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.OPTIMIZE_WHATSAPP, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};

export const optimizeWebImage = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.OPTIMIZE_WEB, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};

export const optimizeSeoResponsiveImage = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.OPTIMIZE_SEO_RESPONSIVE, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};

export const optimizeCustomImage = async (
  file: File,
  options?: {
    target_kb?: number;
    quality?: number; // default 85
    resize_percent?: number;
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.OPTIMIZE_CUSTOM, formData, {
    params: {
      target_kb: options?.target_kb,
      quality: options?.quality ?? 85,
      resize_percent: options?.resize_percent,
    },
    responseType: "blob",
    onUploadProgress,
  });
};
