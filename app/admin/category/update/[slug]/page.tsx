import UpdateCategoryComponent from "@/components/admin/category/UpdateCategory";
import AdminShell from "@/components/Layout/AdminShell";

type Params = Promise<{ slug: string }>;

export default async function UpdateCategory({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <AdminShell
      title="Edit Category"
      subtitle="Modify existing category details, hierarchy, and SEO settings."
    >
      <UpdateCategoryComponent slug={slug} />
    </AdminShell>
  );
}
