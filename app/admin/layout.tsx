'use client';

import { useAuth } from "@/lib/supabase/use-auth";
import { AdminSidebar } from "./components/admin-sidebar";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAdmin } from "@/lib/supabase/role-access-control";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login') // Redirect to login if not authenticated
    }

    if (!loading && user && profile && !isAdmin(profile)) {
      router.push('/') // Redirect if not authorized
    }

  }, [user, profile, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }


  if (user && profile && isAdmin(profile)) {
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
