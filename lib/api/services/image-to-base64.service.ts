import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export interface ImageToBase64Response {
  success: boolean;
  format: string;
  base64: string;
}

export const imageToBase64 = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post<ImageToBase64Response>(
    IMAGE_ENDPOINTS.IMAGE_TO_BASE64,
    formData,
    {
      onUploadProgress,
    },
  );
};
