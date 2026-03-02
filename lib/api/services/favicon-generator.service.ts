import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const faviconGenerator = async (
  file: File,
  params: {
    extension?: string;
    background?: string;
    padding?: number;
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.FAVICON, formData, {
    responseType: "blob",
    params, // 👈 query params added here
    onUploadProgress,
  });
};
