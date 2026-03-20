import ListCategoryComponent from "@/components/admin/category/ListCategory";
import AdminShell from "@/components/Layout/AdminShell";

export default function CategoryList() {
  return (
    <AdminShell
      title="Categories"
      subtitle="Manage and organize your blog structure."
    >
      <ListCategoryComponent />
    </AdminShell>
  );
}
