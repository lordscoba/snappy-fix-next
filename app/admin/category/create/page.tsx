import CreateCategoryComponent from "@/components/admin/category/CreateCategory";
import AdminShell from "@/components/Layout/AdminShell";

export default function CreateCategory() {
  return (
    <AdminShell
      title="New Category"
      subtitle="Create a new classification for your content."
    >
      <CreateCategoryComponent />
    </AdminShell>
  );
}
