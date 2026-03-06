import { apiClient } from "../client";
import { IMAGE_ENDPOINTS } from "../endpoints";

export type PasswordGeneratorResponse = {
  password: string;
  length: number;
  excluded_characters: string;
  processing_time_ms: number;
};

export const passwordGenerator = async (params?: {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
  exclude_chars?: string;
}) => {
  return apiClient.get<PasswordGeneratorResponse>(
    IMAGE_ENDPOINTS.PASSWORD_GENERATOR,
    {
      params,
    },
  );
};
