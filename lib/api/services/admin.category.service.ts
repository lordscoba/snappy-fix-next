import {
  BlogCategoryListResponse,
  BlogCategoryDetailsResponse,
  AdminCategoryCreateResponse,
  AdminCategoryUpdateResponse,
  AdminCategoryDeleteResponse,
  CategoryPayload,
} from "@/types/category-types";

import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

/* ---------------- GET ALL ---------------- */
export const getAdminCategories = async (
  page: number = 1,
  limit: number = 10,
) => {
  return clients.golang.get<BlogCategoryListResponse>(
    `${WEB_ENDPOINTS.admin_category_list}?page=${page}&limit=${limit}`,
  );
};

/* ---------------- GET TOP ---------------- */
export const getAdminTopCategories = async (
  page: number = 1,
  limit: number = 10,
) => {
  return clients.golang.get<BlogCategoryListResponse>(
    `${WEB_ENDPOINTS.admin_category_top}?page=${page}&limit=${limit}`,
  );
};

/* ---------------- GET DETAILS ---------------- */
export const getAdminCategoryDetails = async (id: string) => {
  return clients.golang.get<BlogCategoryDetailsResponse>(
    `${WEB_ENDPOINTS.admin_category_details}${id}`,
  );
};

/* ---------------- CREATE ---------------- */
export const createCategory = async (payload: CategoryPayload) => {
  return clients.golang.post<AdminCategoryCreateResponse>(
    WEB_ENDPOINTS.admin_category_create,
    {
      name: payload.name,
      description: payload.description,
      level: payload.level,
      parent_id: payload.parent_id ?? null,
    },
  );
};

/* ---------------- UPDATE ---------------- */
export const updateCategory = async (
  id: string,
  payload: Partial<CategoryPayload>,
) => {
  return clients.golang.put<AdminCategoryUpdateResponse>(
    `${WEB_ENDPOINTS.admin_category_update}${id}`,
    {
      ...(payload.name && { name: payload.name }),
      ...(payload.description && { description: payload.description }),
      ...(payload.level !== undefined && { level: payload.level }),
      ...(payload.parent_id !== undefined && {
        parent_id: payload.parent_id,
      }),
    },
  );
};

/* ---------------- DELETE ---------------- */
export const deleteCategory = async (id: string) => {
  return clients.golang.delete<AdminCategoryDeleteResponse>(
    `${WEB_ENDPOINTS.admin_category_delete}${id}`,
  );
};
