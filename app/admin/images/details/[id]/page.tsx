import ImageDetailsComponent from "@/components/admin/images/ViewImage";
import AdminShell from "@/components/Layout/AdminShell";

type Params = Promise<{ id: string }>;

export default async function ImageDetailsPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <AdminShell
      title="Image Asset Details"
      subtitle="Analyze, manage, or remove this specific media asset from the system."
    >
      <ImageDetailsComponent params={{ id }} />
    </AdminShell>
  );
}
