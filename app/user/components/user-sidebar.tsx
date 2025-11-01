"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, User, Settings } from "lucide-react";

const menuItems = [
  {
    title: "MAIN",
    items: [
      {
        title: "Dashboard",
        url: "/user",
        icon: Home,
      },
    ],
  },
  {
    title: "MY ACCOUNT",
    items: [
      { title: "My Orders", url: "/user/orders", icon: ShoppingCart },
      { title: "My Profile", url: "/user/profile", icon: User },
      { title: "Settings", url: "/user/settings", icon: Settings },
    ],
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="user-sidebar">
      <div className="sidebar-header" style={{ padding: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Link href="/user" className="logo-text">
          <span className="next" style={{ fontWeight: "bold" }}>Nextgen</span> <span className="circuits" style={{ fontWeight: "normal" }}>Circuits</span>
        </Link>
        <div className="admin-title">
          <h2 style={{ fontSize: "0.9rem", margin: "10px 0 0 0", opacity: 0.8 }}>User Dashboard</h2>
        </div>
      </div>
      
      <nav className="sidebar-menu" style={{ padding: "20px 0", display: "flex", flexDirection: "column" }}>
        {menuItems.map((group) => (
          <div key={group.title} className="menu-section" style={{ marginBottom: "20px" }}>
            <label className="menu-label" style={{ display: "block", padding: "0 20px", marginBottom: "10px", fontSize: "0.8rem", textTransform: "uppercase", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "1px" }}>
              {group.title}
            </label>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url || (item.url === "/user" && pathname === "/user");
              
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 20px",
                    color: isActive ? "white" : "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "0.95rem",
                    backgroundColor: isActive ? "var(--user-sidebar-active)" : "transparent",
                    borderLeft: isActive ? "4px solid #2ecc71" : "4px solid transparent",
                  }}
                >
                  <i style={{ marginRight: "10px", width: "20px", textAlign: "center" }}>
                    <Icon size={20} />
                  </i>
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

