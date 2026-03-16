import { AxiosProgressEvent } from "axios";
import { clients } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const heicToImage = async (
  file: File,
  params?: {
    format?: "jpg" | "png";
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post(IMAGE_ENDPOINTS.HEIC_TO_IMAGE, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};

export const imageToHeic = async (
  file: File,
  params?: {
    quality?: number; // default 80 , min 10, max 100
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post(IMAGE_ENDPOINTS.IMAGE_TO_HEIC, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};
