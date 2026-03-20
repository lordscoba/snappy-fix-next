"use client";

import AdminShell from "@/components/Layout/AdminShell";

import CreateblogComponent from "@/components/admin/blog/CreateBlog";

export default function CreateBlog() {
  return (
    <AdminShell
      title="Create New Post"
      subtitle="Draft and configure your next blog article."
    >
      <CreateblogComponent />
    </AdminShell>
  );
}
