import { AdminSidebar } from "./components/admin-sidebar";
import "./globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-body admin-container">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
