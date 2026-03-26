import ContactMessagesComponent from "@/components/admin/contact_us/ContactUs";
import AdminShell from "@/components/Layout/AdminShell";

export default function AdminContactUS() {
  return (
    <AdminShell
      title="Settings"
      subtitle="Manage admin preferences and workspace defaults."
    >
      <ContactMessagesComponent />
    </AdminShell>
  );
}
