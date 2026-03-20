import CategoryDetailsComponent from "@/components/admin/category/CategoryDetails";
import AdminShell from "@/components/Layout/AdminShell";

type Params = Promise<{ slug: string }>;

export default async function CategoryDetails({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <AdminShell
      title="Category Details"
      subtitle="View and manage specific category metadata and performance metrics."
    >
      <CategoryDetailsComponent params={{ slug }} />
    </AdminShell>
  );
}
