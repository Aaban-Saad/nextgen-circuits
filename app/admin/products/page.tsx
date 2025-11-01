import { ShoppingBag, Tag, AlertTriangle, DollarSign, RefreshCw, Plus } from "lucide-react";
import { ProductStatsCard } from "../components/product-stats-card";
import { ProductTable } from "../components/product-table";
import { ProductSearchFilters } from "../components/product-search-filters";
import { AdminHeader } from "../components/admin-header";

export default function ProductsPage() {
  return (
    <>
      <div className="admin-topbar">
        <AdminHeader />
      </div>
      <div className="dashboard-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your electronic components</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={16} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <ProductStatsCard
          title="Total Products"
          value="4"
          trend="+12.5%↑"
          trendPositive={true}
          icon={<ShoppingBag size={24} className="text-[#3498db]" />}
          iconBg="bg-blue-100"
        />
        <ProductStatsCard
          title="Categories"
          value="3"
          trend="+2↑"
          trendPositive={true}
          icon={<Tag size={24} className="text-[#2ecc71]" />}
          iconBg="bg-green-100"
        />
        <ProductStatsCard
          title="Low Stock Items"
          value="1"
          trend="+5↑"
          trendPositive={true}
          icon={<AlertTriangle size={24} className="text-[#9333ea]" />}
          iconBg="bg-purple-100"
        />
        <ProductStatsCard
          title="Inventory Value"
          value="$7347.45"
          trend="+8.3%↑"
          trendPositive={true}
          icon={<DollarSign size={24} className="text-[#e74c3c]" />}
          iconBg="bg-red-100"
        />
      </div>

      {/* Search and Filters */}
      <ProductSearchFilters />

      {/* Product Table */}
      <ProductTable />
    </div>
    </>
  );
}

