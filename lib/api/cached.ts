import { cache } from "react";
import { getBlogDetails } from "./services/blog.service";

export const getCachedBlogDetails = cache(async (slug: string) => {
  return await getBlogDetails(slug);
});
