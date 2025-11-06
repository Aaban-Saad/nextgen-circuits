'use client';

import { useAuth } from "@/lib/supabase/use-auth";
import { UserSidebar } from "./components/user-sidebar";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login') // Redirect to login if not authenticated
    }
  }, [user, loading, router])

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
  return (
    <div className="user-body user-container">
      <UserSidebar />
      <main className="user-main">
        <div className="user-content">
          {children}
        </div>
      </main>
    </div>
  );
}

