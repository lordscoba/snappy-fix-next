import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const compressPdf = async (
  file: File,
  params?: {
    compression_level?: "low" | "medium" | "high";
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.PDF_COMPRESS, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};

export const compressPdfPro = async (
  file: File,
  params?: {
    quality?: number; // default 70
    dpi?: number; // default 150
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.PDF_COMPRESS_PRO, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};
