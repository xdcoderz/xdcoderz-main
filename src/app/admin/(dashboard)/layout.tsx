import { requireAdmin } from "@/features/admin/auth";
import { AdminShell } from "@/features/admin/components/AdminShell";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const identity = await requireAdmin();
  return <AdminShell identity={identity}>{children}</AdminShell>;
}
