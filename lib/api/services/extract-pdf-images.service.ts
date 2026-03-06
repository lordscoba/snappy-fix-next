import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const extractPdfImages = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.EXTRACT_PDF_IMAGES, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};
