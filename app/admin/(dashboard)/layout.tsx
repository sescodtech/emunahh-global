import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

// Server-side guard as defense-in-depth alongside middleware.ts — if a
// request ever reaches this layout without a valid session (e.g. an
// edge case in matcher config), it still won't render admin content.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-boarding-paper font-body">
      <AdminSidebar
        userName={session.user.name ?? session.user.email ?? "Admin"}
        userRole={session.user.role ?? "EDITOR"}
      />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
