import { cache } from "react";
import { getBlogDetails } from "./services/blog.service";

export const getCachedBlogDetails = cache(async (slug: string) => {
  console.log("Fetching cached blog details for slug:");
  return await getBlogDetails(slug);
});
