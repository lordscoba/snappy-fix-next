import { ApiResponse, Pagination } from "./base-response";

export type CategoryPayload = {
  name: string;
  description: string;
  level: number;

  // subcategories
  parent_id?: string | null;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  slug: string;
  level: number;
  created_at: string;
  updated_at: string;

  // 🔥 add this (important for hierarchy)
  parent_id?: string | null;
};

export type BlogCategoryListResponse = ApiResponse<{
  categories: Category[];
}> & {
  pagination: Pagination;
};

export type BlogCategoryDetailsResponse = ApiResponse<{
  category: Category;
}> & {
  pagination: Pagination;
};

export type AdminCategoryCreateResponse = ApiResponse<{
  category: Category;
}> & {
  pagination: Pagination;
};

export type AdminCategoryUpdateResponse = ApiResponse<{
  category: Category;
}> & {
  pagination: Pagination;
};

export type AdminCategoryDeleteResponse = ApiResponse<{
  message: string;
}> & {
  pagination: Pagination;
};
