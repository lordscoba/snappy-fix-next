import ListBlogs from "@/components/admin/blog/ListBlogs";
import AdminShell from "@/components/Layout/AdminShell";
import Link from "next/link";

export default function BlogList() {
  return (
    <AdminShell
      title="Blog Posts"
      subtitle="Manage your news articles, featured stories, and exclusive content."
    >
      {/* --- HEADER ACTIONS --- */}
      <ListBlogs />
    </AdminShell>
  );
}
