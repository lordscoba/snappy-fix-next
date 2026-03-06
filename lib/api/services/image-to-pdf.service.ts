import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const imageToPdf = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.IMAGE_TO_PDF, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};

export const pdfToImage = async (
  file: File,
  params?: {
    format?: "png" | "jpg";
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.PDF_TO_IMAGE, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};
