import { clients } from "@/lib/api/client";
import { AxiosProgressEvent } from "axios";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const convertImage = async (
  file: File,
  targetFormat: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post(IMAGE_ENDPOINTS.CONVERT, formData, {
    params: { target_format: targetFormat },
    responseType: "blob",
    onUploadProgress,
  });
};
