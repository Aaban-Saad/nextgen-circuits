import { ShoppingCart, User, Heart, Clock, Home, LogOut } from "lucide-react";
import { RecentOrdersCard } from "./components/recent-orders-card";
import { MyProfileCard } from "./components/my-profile-card";
import { MyWishlistCard } from "./components/my-wishlist-card";
import { RecentActivityCard } from "./components/recent-activity-card";

export default function UserDashboard() {
  return (
    <>
      {/* Top Bar */}
      <div className="user-topbar">
        <div className="flex items-center gap-3">
          <Home className="size-6 text-[#3498db]" />
          <div>
            <h1 className="text-2xl font-bold">Welcome, John Doe!</h1>
            <p className="text-sm">Here's an overview of your account</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors border border-white">
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        <RecentOrdersCard />
        <MyProfileCard />
        <MyWishlistCard />
        <RecentActivityCard />
      </div>
    </>
  );
}

