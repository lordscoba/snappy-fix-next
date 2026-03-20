import UploadImagesComponent from "@/components/admin/images/CreateImage";
import AdminShell from "@/components/Layout/AdminShell";

export default function UploadImagesPage() {
  return (
    <AdminShell
      title="Upload Media"
      subtitle="Drag and drop your images to optimize and save them to the cloud."
    >
      <UploadImagesComponent />
    </AdminShell>
  );
}
