"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LineChart,
  Box,
  Folder,
  ShoppingCart,
  Warehouse,
  Users,
  FileText,
  Megaphone,
  BarChart3,
  Headphones,
  ArrowLeft,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "MAIN",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LineChart,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { title: "Products", url: "/admin/products", icon: Box },
      { title: "Categories", url: "/admin/categories", icon: Folder },
      { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
      { title: "Inventory", url: "/admin/inventory", icon: Warehouse },
      { title: "Customers", url: "/admin/customers", icon: Users },
    ],
  },
  {
    title: "CONTENT & MARKETING",
    items: [
      { title: "Content", url: "/admin/content", icon: FileText },
      { title: "Marketing", url: "/admin/marketing", icon: Megaphone },
    ],
  },
  {
    title: "ANALYTICS & SUPPORT",
    items: [
      { title: "Reports", url: "/admin/reports", icon: BarChart3 },
      { title: "Support", url: "/admin/support", icon: Headphones },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { title: "Back to Site", url: "/", icon: ArrowLeft },
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link href="/admin" className="logo-text">
          <span className="next">Next</span>
          <span className="gen">gen</span> <span className="circuits">Circuits</span>
        </Link>
        <div className="admin-title">
          <h2>Admin Panel</h2>
        </div>
      </div>
      
      <nav className="sidebar-menu">
        {menuItems.map((group, groupIndex) => (
          <div key={group.title} className={`menu-section ${groupIndex === menuItems.length - 1 ? "mt-auto back-to-site" : ""}`}>
            <label className="menu-label">{group.title}</label>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url || (item.url === "/admin" && pathname === "/admin");
              
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`menu-item ${isActive ? "active" : ""}`}
                >
                  <i><Icon size={20} /></i>
                  {item.title}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
