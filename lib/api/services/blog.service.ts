import {
  BlogCollectionResponse,
  BlogDetailsResponse,
  BlogListResponse,
  News,
} from "@/types/blog-types";
import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

export const getBlogDetails = async (slug: string) => {
  return clients.golang.get<BlogDetailsResponse>(
    `${WEB_ENDPOINTS.blog_details}${slug}`,
  );
};

export const getBlogList = async (
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
  return clients.golang.get<BlogListResponse>(WEB_ENDPOINTS.blog_list, {
    params,
  });
};

/* ---------------- GET FEATURED ---------------- */
export const getFeaturedNews = async (page: number = 1, limit: number = 10) => {
  return clients.golang.get<BlogCollectionResponse>(
    `${WEB_ENDPOINTS.blog_featured}?page=${page}&limit=${limit}`,
  );
};

/* ---------------- GET EXCLUSIVE ---------------- */
export const getExclusiveNews = async (
  page: number = 1,
  limit: number = 10,
) => {
  return clients.golang.get<BlogCollectionResponse>(
    `${WEB_ENDPOINTS.blog_exclusive}?page=${page}&limit=${limit}`,
  );
};
export const searchNews = async (search: string) => {
  return clients.golang.get<BlogCollectionResponse>(
    `${WEB_ENDPOINTS.blog_search}?search=${search}`,
  );
};

export async function fetchAllPublishedPosts(): Promise<News[]> {
  const limit = 100;

  // ── First fetch: get page 1 + learn total_count ──────────
  const firstRes = await getBlogList(
    1,
    limit,
    "",
    "",
    "published",
    false,
    false,
  );
  const firstBatch = firstRes.data.data.news || [];
  const pagination = firstRes.data.pagination;
  const meta = Array.isArray(pagination) ? pagination[0] : null;

  const totalCount = meta?.total_count ?? firstBatch.length;
  const totalPages = Math.ceil(totalCount / limit);

  // ── If everything fits on page 1, return immediately ─────
  if (totalPages <= 1) return firstBatch;

  // ── Fetch all remaining pages in parallel ─────────────────
  const remainingPages = Array.from(
    { length: totalPages - 1 },
    (_, i) => i + 2, // pages 2, 3, 4...
  );

  const remainingResults = await Promise.all(
    remainingPages.map(
      (page) =>
        getBlogList(page, limit, "", "", "published", false, false)
          .then((res) => res.data.data.news || [])
          .catch(() => [] as News[]), // one page failing won't kill the whole fetch
    ),
  );

  return [firstBatch, ...remainingResults].flat();
}
