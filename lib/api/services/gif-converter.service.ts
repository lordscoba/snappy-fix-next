import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

// VIDEO → GIF
export const videoToGif = async (
  file: File,
  params?: {
    fps?: number; // default 10, min 1, max 30
    width?: number; // default 480, min 100, max 1000
    start_time?: number; // default 0 (seconds)
    end_time?: number; // default 5 (seconds), max duration 15s
    quality?: "hd" | "high" | "medium" | "low"; // default medium
    reverse?: boolean; // default false
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.VIDEO_TO_GIF, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};
// IMAGE → GIF
export const imageToGif = async (
  file: File,
  params?: {
    duration?: number; // default 500, min 100, max 30000
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.IMAGE_TO_GIF, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};
