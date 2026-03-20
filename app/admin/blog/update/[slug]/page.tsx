"use client";

import { use } from "react";
import AdminShell from "@/components/Layout/AdminShell";
import UpdateBlogComponent from "@/components/admin/blog/UpdateBlog";

type Params = Promise<{ slug: string }>;

export default function UpdateBlogPage({ params }: { params: Params }) {
  const { slug } = use(params);

  return (
    <AdminShell
      title="Edit Article"
      subtitle="Update content, manage media, and refine SEO settings."
    >
      <UpdateBlogComponent slug={slug} />
    </AdminShell>
  );
}
