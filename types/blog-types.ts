import { ApiResponse, Pagination } from "./base-response";
import { Category } from "./category-types";

export type NewsImage = {
  id: string;
  news_id: string;
  public_id: string;
  url: string;
  image_type: string;
};

export type News = {
  id: string;
  title: string;
  slug: string;
  body: string;
  category_id: string;
  category: Category;
  thumbnail_id: string;
  thumbnail_url: string;
  images: NewsImage[];
  status: "draft" | "published";
  is_featured: boolean;
  is_exclusive: boolean;
  tags: string;
  meta_title: string;
  meta_desc: string;
  created_at: string;
  updated_at: string;
};

export type NewsPayload = {
  title: string;
  category_id: string;
  body: string;
  status: "draft" | "published";
  is_featured?: boolean;
  is_exclusive?: boolean;
  tags?: string;
  meta_title?: string;
  meta_desc?: string;
  images?: File[];
  thumbnail?: File;
  thumbnail_id?: string;
  thumbnail_url?: string;
};

export type BlogListResponse = ApiResponse<{
  news: News[];
}> & {
  pagination: Pagination;
};

export type BlogDetailsResponse = ApiResponse<{
  news: News;
}> & {
  pagination: Pagination;
};

// Featured / Exclusive / Search
export type BlogCollectionResponse = ApiResponse<{
  news: News[];
}> & {
  pagination: Pagination;
};

export type BlogCreateResponse = ApiResponse<{
  news: News;
}> & {
  pagination: Pagination;
};

export type BlogUpdateResponse = ApiResponse<{
  news: News;
}> & {
  pagination: Pagination;
};

export type BlogDeleteResponse = ApiResponse<{
  message: string;
}> & {
  pagination: Pagination;
};
