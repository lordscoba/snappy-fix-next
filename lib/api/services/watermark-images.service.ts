import { AxiosProgressEvent } from "axios";
import { clients } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export type WatermarkPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

export type CompressionLevel = "low" | "medium" | "high";

const formDataToJson = (formData: FormData) => {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    obj[key] = value;
  });

  return obj;
};

export const watermarkImage = async (
  file: File,
  params?: {
    disposition?: "inline" | "attachment";
  },
  options?: {
    watermark_type: "text" | "image";
    text?: string;
    font_size?: number;
    color?: string;
    watermark_file?: File;
    scale?: number;
    position?: WatermarkPosition;
    opacity?: number; // default 60
    rotation?: number;
    compression?: WatermarkPosition; // medium, high,
  },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();

  let rotation: number;

  formData.append("file", file);
  formData.append("watermark_type", options?.watermark_type || "text");

  if (options?.text) formData.append("text", options.text);
  if (options?.font_size)
    formData.append("font_size", options.font_size.toString());
  if (options?.color) formData.append("color", options.color);

  if (options?.watermark_file)
    formData.append("watermark_file", options.watermark_file);

  if (options?.scale) formData.append("scale", options.scale.toString());
  if (options?.position) formData.append("position", options.position);
  if (options?.opacity) formData.append("opacity", options.opacity.toString());
  if (options?.rotation) {
    rotation = -options.rotation;
    formData.append("rotation", rotation.toString());
  }
  if (options?.compression) formData.append("compression", options.compression);

  console.log(JSON.stringify(formDataToJson(formData), null, 2));

  return clients.fastapi.post(IMAGE_ENDPOINTS.WATERMARK_IMAGE, formData, {
    params,
    responseType: "blob",
    onUploadProgress,
  });
};
