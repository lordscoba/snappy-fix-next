import { AxiosProgressEvent } from "axios";
import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export type ImageColorPreset =
  | "vintage"
  | "cool"
  | "warm"
  | "dramatic"
  | "noir"
  | "cyberpunk"
  | "faded";

export type LutFilterType =
  | "clarendon"
  | "lark"
  | "gingham"
  | "juno"
  | "reyes"
  | "teal_orange"
  | "blockbuster"
  | "matrix"
  | "bleach_bypass"
  | "film";

export const imageColorEffect = async (
  file: File,
  params?: {
    brightness?: number; //min =0, max = 3 , default 1
    contrast?: number; //min =0, max = 3 , default 1
    saturation?: number; //min =0, max = 3 , default 1
    hue?: number; //min =-180, max = 180 , default 0
    temperature?: number; //min =-100, max = 100 , default 0
    exposure?: number; //min =-5, max = 5 , default 0
    vibrance?: number; //min =-100, max = 100 , default 0
    tint_color?: string; //min =0, max = 1 , default 1
    preset?: ImageColorPreset;
    intensity?: number; //min =0, max = 1 , default 1
    lut_filter?: LutFilterType;
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post(IMAGE_ENDPOINTS.IMAGE_COLOR_EFFECT, formData, {
    params,
    responseType: "blob",
    onUploadProgress,
  });
};
