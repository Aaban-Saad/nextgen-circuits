import { ShoppingCart, DollarSign, Truck, CheckCircle, RefreshCw, Download } from "lucide-react";
import { OrderStatsCard } from "./components/order-stats-card";
import { OrderTable } from "./components/order-table";
import { OrderSearchFilters } from "./components/order-search-filters";
import { AdminHeader } from "../components/admin-header";

export default function OrdersPage() {
  return (
    <>
      <div className="admin-topbar">
        <AdminHeader />
      </div>
      <div className="dashboard-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Track and manage customer orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <RefreshCw size={16} />
              Refresh Data
            </button>
            <button className="px-4 py-2 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Download size={16} />
              Export Orders
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <OrderStatsCard
            title="Total Orders"
            value="1,284"
            trend="+8.2%↑"
            trendPositive={true}
            icon={<ShoppingCart size={24} className="text-[#3498db]" />}
            iconBg="bg-blue-100"
          />
          <OrderStatsCard
            title="Revenue"
            value="$24,582.50"
            trend="+15.3%↑"
            trendPositive={true}
            icon={<DollarSign size={24} className="text-[#2ecc71]" />}
            iconBg="bg-green-100"
          />
          <OrderStatsCard
            title="Pending Shipments"
            value="42"
            trend="+5.7%↑"
            trendPositive={true}
            icon={<Truck size={24} className="text-[#e74c3c]" />}
            iconBg="bg-red-100"
          />
          <OrderStatsCard
            title="Completed Orders"
            value="892"
            trend="+12.5%↑"
            trendPositive={true}
            icon={<CheckCircle size={24} className="text-[#9333ea]" />}
            iconBg="bg-purple-100"
          />
        </div>

        {/* Search and Filters */}
        <OrderSearchFilters />

        {/* Order Table */}
        <OrderTable />
      </div>
    </>
  );
}

