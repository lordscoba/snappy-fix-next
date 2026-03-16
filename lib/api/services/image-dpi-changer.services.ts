import { AxiosProgressEvent } from "axios";
import { clients } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

// Inside your service file
export interface ImageDpiCheckerResponse {
  dpi_x: number | null;
  dpi_y: number | null;
  width: number;
  height: number;
  format: string;
  processing_time_ms: number;
}
export const imageDpiChanger = async (
  file: File,
  params?: {
    dpi?: number;
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post(IMAGE_ENDPOINTS.IMAGE_DPI_CHANGER, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};

export const imageDpiChecker = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post<ImageDpiCheckerResponse>(
    IMAGE_ENDPOINTS.IMAGE_DPI_CHECKER,
    formData,
    {
      responseType: "json",
      onUploadProgress,
    },
  );
};
