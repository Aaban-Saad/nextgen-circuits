import { Tag, Box, TrendingUp, Calendar, RefreshCw, Plus } from "lucide-react";
import { ProductStatsCard } from "../components/product-stats-card";
import { CategoryTable } from "../components/category-table";
import { CategorySearchBar } from "../components/category-search-bar";
import { AdminHeader } from "../components/admin-header";

export default function CategoriesPage() {
  return (
    <>
      <div className="admin-topbar">
        <AdminHeader />
      </div>
      <div className="dashboard-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
            <p className="text-gray-600 mt-1">Manage your product categories</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="px-4 py-2 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Plus size={16} />
              Add New Category
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <ProductStatsCard
            title="Total Categories"
            value="10"
            trend="+2↑"
            trendPositive={true}
            icon={<Tag size={24} className="text-[#3498db]" />}
            iconBg="bg-blue-100"
          />
          <ProductStatsCard
            title="Total Products"
            value="254"
            trend="+12.5%↑"
            trendPositive={true}
            icon={<Box size={24} className="text-[#2ecc71]" />}
            iconBg="bg-green-100"
          />
          <ProductStatsCard
            title="Most Popular"
            value="Development Boards"
            subtitle="45 products ↑"
            trend=""
            trendPositive={true}
            icon={<TrendingUp size={24} className="text-[#9333ea]" />}
            iconBg="bg-purple-100"
          />
          <ProductStatsCard
            title="Last Added"
            value="Tools"
            subtitle="15 days ago"
            trend=""
            trendPositive={true}
            icon={<Calendar size={24} className="text-[#f39c12]" />}
            iconBg="bg-orange-100"
          />
        </div>

        {/* Search Bar */}
        <CategorySearchBar />

        {/* Category Table */}
        <CategoryTable />
      </div>
    </>
  );
}

