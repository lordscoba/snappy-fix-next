import {
  AdminImageListResponse,
  AdminImageDetailsResponse,
  AdminImageCreateResponse,
  AdminImageDeleteResponse,
  CreateImagePayload,
} from "@/types/image-types";

import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

/* ---------------- GET ALL ---------------- */
export const getAdminImages = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
) => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });

  return clients.golang.get<AdminImageListResponse>(
    `${WEB_ENDPOINTS.admin_image_list}?${query.toString()}`,
  );
};

/* ---------------- GET DETAILS ---------------- */
export const getAdminImageDetails = async (id: string) => {
  return clients.golang.get<AdminImageDetailsResponse>(
    `${WEB_ENDPOINTS.admin_image_details}${id}`,
  );
};

/* ---------------- CREATE (MULTIPART) ---------------- */
export const createImage = async (payload: CreateImagePayload) => {
  const formData = new FormData();

  // Add text fields
  if (payload.file_name) formData.append("file_name", payload.file_name);
  if (payload.description) formData.append("description", payload.description);
  if (payload.image_type) formData.append("image_type", payload.image_type);

  // Add images (supports multiple as per your Go code)
  payload.images.forEach((file) => {
    formData.append("images", file);
  });

  return clients.golang.post<AdminImageCreateResponse>(
    WEB_ENDPOINTS.admin_image_create,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

/* ---------------- DELETE ---------------- */
export const deleteImage = async (id: string) => {
  return clients.golang.delete<AdminImageDeleteResponse>(
    `${WEB_ENDPOINTS.admin_image_delete}${id}`,
  );
};
