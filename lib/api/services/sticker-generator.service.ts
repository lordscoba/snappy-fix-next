import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

// VIDEO → STICKER
export const videoToSticker = async (
  file: File,
  params?: {
    fps?: number; // default 12, min 1, max 20
    start_time?: number; // default 0 (seconds)
    end_time?: number; // default 5 (seconds)
    quality?: "hd" | "high" | "medium" | "low"; // default medium
    reverse?: boolean; // default false
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.VIDEO_TO_STICKER, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};
// IMAGE → STICKER
export const imageToSticker = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.IMAGE_TO_STICKER, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};
