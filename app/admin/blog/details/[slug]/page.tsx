import BlogdetailsComponent from "@/components/admin/blog/Blogdetails";
import AdminShell from "@/components/Layout/AdminShell";

type Params = Promise<{ slug: string }>;

export default async function AdminBlogDetails({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <AdminShell
      title="Article Details"
      subtitle="Review content, performance metrics, and SEO configuration."
    >
      <BlogdetailsComponent slug={slug} />
    </AdminShell>
  );
}
