'use client';

import { useUser } from "@/hooks/use-user";
import { AdminSidebar } from "./components/admin-sidebar";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAdmin } from "@/lib/supabase/role-access-control";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, isLoading } = useUser()
  const router = useRouter()


  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoading && !user) {
        router.push('/login');
        return;
      }
      if (!isLoading && user) {
        const admin = await isAdmin(user);
        setIsAdminUser(admin);
        if (!admin) {
          router.push('/');
        }
      }
    };
    checkAdmin();
  }, [user, isLoading, router]);

  if (isLoading || isAdminUser === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || !isAdminUser) {
    return null; // Will redirect
  }

  if (user && isAdminUser) {
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
}
