import ListImagesComponent from "@/components/admin/images/ListImages";
import AdminShell from "@/components/Layout/AdminShell";

export default function ImageGalleryPage() {
  return (
    <AdminShell
      title="Media Library"
      subtitle="View and manage your uploaded news assets."
    >
      <ListImagesComponent />
    </AdminShell>
  );
}
