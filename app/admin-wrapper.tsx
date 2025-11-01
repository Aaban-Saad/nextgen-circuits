"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AdminWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isUserRoute = pathname?.startsWith("/user");

  if (isAdminRoute || isUserRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <ScrollArea className="h-screen">
        {children}
        <Footer />
      </ScrollArea>
    </>
  );
}

