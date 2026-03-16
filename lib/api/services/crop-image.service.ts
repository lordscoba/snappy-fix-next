import { AxiosProgressEvent } from "axios";
import { clients } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const cropImage = async (
  file: File,
  params: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post(IMAGE_ENDPOINTS.CROP, formData, {
    responseType: "blob",
    params,
    onUploadProgress,
  });
};
