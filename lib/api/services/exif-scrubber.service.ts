import { AxiosProgressEvent } from "axios";
import { clients } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export const exifScrubber = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return clients.fastapi.post(IMAGE_ENDPOINTS.EXIF_SCRUBBER, formData, {
    responseType: "blob",
    onUploadProgress,
  });
};
