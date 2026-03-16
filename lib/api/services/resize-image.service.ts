import { AxiosProgressEvent } from "axios";
import { clients } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const resizeImage = async (
  file: File,
  params: {
    width: number;
    height: number;
    keep_aspect?: boolean;
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post(IMAGE_ENDPOINTS.RESIZE, formData, {
    responseType: "blob",
    params, // 👈 width, height, keep_aspect sent as query
    onUploadProgress,
  });
};
