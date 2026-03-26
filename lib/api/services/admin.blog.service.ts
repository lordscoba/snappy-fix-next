import {
  BlogListResponse,
  BlogDetailsResponse,
  NewsPayload,
  BlogCreateResponse,
  BlogUpdateResponse,
  BlogDeleteResponse,
} from "@/types/blog-types";

import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";
import { submitToIndexNow } from "@/lib/utils/indexnow";

/* ---------------- GET ALL ---------------- */
export const getAdminBlogs = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  category_id: string = "",
  status: string = "",
  is_featured: boolean = false,
  is_exclusive: boolean = false,
) => {
  // 1. Start with the required/base parameters
  const params: Record<string, any> = {
    page,
    limit,
  };

  // 2. Conditionally add strings only if they aren't empty
  if (search) params.search = search;
  if (category_id) params.category_id = category_id;
  if (status) params.status = status;

  // 3. Conditionally add booleans only if they are true
  if (is_featured) params.is_featured = is_featured;
  if (is_exclusive) params.is_exclusive = is_exclusive;

  return clients.golang.get<BlogListResponse>(WEB_ENDPOINTS.admin_blog_list, {
    params,
  });
};

/* ---------------- GET DETAILS ---------------- */
export const getAdminBlogDetails = async (slug: string) => {
  return clients.golang.get<BlogDetailsResponse>(
    `${WEB_ENDPOINTS.admin_blog_details}${slug}`,
  );
};

export const createBlog = async (payload: any) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("category_id", payload.category_id);
  formData.append("body", payload.body);
  formData.append("status", payload.status);
  formData.append("is_featured", String(payload.is_featured ?? false));
  formData.append("is_exclusive", String(payload.is_exclusive ?? false));

  if (payload.tags) formData.append("tags", payload.tags);
  if (payload.meta_title) formData.append("meta_title", payload.meta_title);
  if (payload.meta_desc) formData.append("meta_desc", payload.meta_desc);

  if (payload.thumbnail instanceof File) {
    formData.append("thumbnail", payload.thumbnail);
  }

  if (payload.thumbnail_id)
    formData.append("thumbnail_id", payload.thumbnail_id);

  if (payload.thumbnail_url)
    formData.append("thumbnail_url", payload.thumbnail_url);

  if (payload.images?.length) {
    payload.images.forEach((file: File) => formData.append("images", file));
  }

  //  MAIN REQUEST
  const response = await clients.golang.post<BlogCreateResponse>(
    WEB_ENDPOINTS.admin_blog_create,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  // AFTER SUCCESS → INDEXNOW
  try {
    const blog = response.data.data.news;

    // only submit if published
    if (blog.status === "published") {
      const urls = [
        `https://www.snappy-fix.com/blog/${blog.slug}`,
        "https://www.snappy-fix.com/blog",
        "https://www.snappy-fix.com/sitemap.xml",
      ];

      await submitToIndexNow(urls);

      console.log(" Submitted to IndexNow:", urls);
    }
  } catch (err) {
    //  don't break main flow
    console.error("IndexNow submission failed:", err);
  }

  return response;
};

export const updateBlog = async (
  id: string,
  payload: NewsPayload & {
    thumbnail_id?: string;
    thumbnail_url?: string;
  },
) => {
  console.log(payload);

  const formData = new FormData();

  if (payload.title) formData.append("title", payload.title);
  if (payload.category_id) formData.append("category_id", payload.category_id);
  if (payload.body) formData.append("body", payload.body);
  if (payload.status) formData.append("status", payload.status);

  if (payload.is_featured !== undefined) {
    formData.append("is_featured", String(payload.is_featured));
  }
  if (payload.is_exclusive !== undefined) {
    formData.append("is_exclusive", String(payload.is_exclusive));
  }

  if (payload.tags) formData.append("tags", payload.tags);
  if (payload.meta_title) formData.append("meta_title", payload.meta_title);
  if (payload.meta_desc) formData.append("meta_desc", payload.meta_desc);

  if (payload.thumbnail_id)
    formData.append("thumbnail_id", payload.thumbnail_id);
  if (payload.thumbnail_url)
    formData.append("thumbnail_url", payload.thumbnail_url);

  if (payload.thumbnail instanceof File) {
    formData.append("thumbnail", payload.thumbnail);
  }

  if (payload.images?.length) {
    payload.images.forEach((file) => formData.append("images", file));
  }

  // MAIN REQUEST
  const response = await clients.golang.put<BlogUpdateResponse>(
    `${WEB_ENDPOINTS.admin_blog_update}${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  // AFTER SUCCESS → INDEXNOW
  try {
    const blog = response.data.data.news;

    // only submit if published
    if (blog.status === "published") {
      const urls = [
        `https://www.snappy-fix.com/blog/${blog.slug}`,
        "https://www.snappy-fix.com/blog",
        "https://www.snappy-fix.com/sitemap.xml",
      ];

      // ⚡ fire and forget (non-blocking)
      submitToIndexNow(urls);

      console.log(" IndexNow update submitted:", urls);
    }
  } catch (err) {
    console.error("IndexNow update failed:", err);
  }

  return response;
};

// /* ---------------- DELETE ---------------- */
// export const deleteBlog = async (id: string) => {
//   return clients.golang.delete<BlogDeleteResponse>(
//     `${WEB_ENDPOINTS.admin_blog_delete}${id}`,
//   );
// };

export const deleteBlog = async (id: string, slug?: string) => {
  const response = await clients.golang.delete<BlogDeleteResponse>(
    `${WEB_ENDPOINTS.admin_blog_delete}${id}`,
  );

  try {
    if (slug) {
      const urls = [
        `https://www.snappy-fix.com/blog/${slug}`,
        "https://www.snappy-fix.com/blog",
        "https://www.snappy-fix.com/sitemap.xml",
      ];

      submitToIndexNow(urls, { type: "delete" });

      console.log("🗑️ Submitted for de-indexing:", urls);
    }
  } catch (err) {
    console.error("IndexNow delete submission failed:", err);
  }

  return response;
};
