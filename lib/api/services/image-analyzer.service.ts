import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export interface ImageAnalysisResponse {
  basic_info: {
    width: number;
    height: number;
    aspect_ratio: number;
    format: string;
    mode: string;
    file_size_kb: number;
  };
  visual_analysis: {
    brightness_score: number;
    contrast_score: number;
    primary_color: {
      rgb: number[];
      hex: string;
      frequency: number;
    };
    color_palette: {
      rgb: number[];
      hex: string;
      frequency: number;
    }[];
  };
  metadata: Record<string, any>;
  recommendations: string[];
}

export const analyzeImage = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  // --- ADD THIS LOG ---
  console.log("DEBUG: API Base URL is:", apiClient.defaults.baseURL);
  console.log("DEBUG: Full Endpoint is:", IMAGE_ENDPOINTS.ANALYZE);
  // --------------------

  return apiClient.post<ImageAnalysisResponse>(
    IMAGE_ENDPOINTS.ANALYZE,
    formData,
    { onUploadProgress },
  );
};
