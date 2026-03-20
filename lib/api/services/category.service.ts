import {
  BlogCategoryDetailsResponse,
  BlogCategoryListResponse,
} from "@/types/category-types";
import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

export const getBlogCategories = async (
  page: number = 1,
  limit: number = 10,
) => {
  return clients.golang.get<BlogCategoryListResponse>(
    WEB_ENDPOINTS.blog_category_list,
    {
      params: { page, limit },
    },
  );
};
export const getTopCategories = async () => {
  return clients.golang.get<BlogCategoryListResponse>(
    WEB_ENDPOINTS.blog_category_top,
  );
};

export const getCategoryDetails = async (slug: string) => {
  return clients.golang.get<BlogCategoryDetailsResponse>(
    `${WEB_ENDPOINTS.blog_category_details}${slug}`,
  );
};

// const res = await getBlogCategories();
// const categories = res.data.data.categories;

// const res = await getTopCategories();
// const categories = res.data.data.categories;

// const res = await getCategoryDetails("epl-nigerians");
// const category = res.data.data.category;
