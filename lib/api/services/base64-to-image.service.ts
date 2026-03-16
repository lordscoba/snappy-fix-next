import { AxiosProgressEvent } from "axios";
import { clients } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const base64ToImage = async (
  base64String: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  return clients.fastapi.post(
    IMAGE_ENDPOINTS.BASE64_TO_IMAGE,
    base64String, // send raw string
    {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
      onUploadProgress,
    },
  );
};
