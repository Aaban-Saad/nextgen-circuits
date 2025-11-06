import { DollarSign, ShoppingCart, Users, Box } from "lucide-react";
import { MetricCard } from "./components/metric-card";
import { SalesChart } from "./components/sales-chart";
import { PopularProductsChart } from "./components/popular-products-chart";
import { RecentOrdersTable } from "./components/recent-orders-table";
import { RecentActivity } from "./components/recent-activity";
import { AdminHeader } from "./components/admin-header";

export default function AdminDashboard() {

  return (
    <>
      <div className="admin-topbar">
        <AdminHeader />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of your business performance
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$24,582.50"
            trend="+15.3%↑"
            icon={<DollarSign className="size-6 text-green-600" />}
            iconBg="bg-green-100"
          />
          <MetricCard
            title="Total Orders"
            value="1,284"
            trend="+8.2%↑"
            icon={<ShoppingCart className="size-6 text-green-600" />}
            iconBg="bg-green-100"
          />
          <MetricCard
            title="Total Customers"
            value="892"
            trend="+12.5%↑"
            icon={<Users className="size-6 text-purple-600" />}
            iconBg="bg-purple-100"
          />
          <MetricCard
            title="Low Stock Items"
            value="24"
            trend="+5.7%↑"
            icon={<Box className="size-6 text-red-600" />}
            iconBg="bg-red-100"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <PopularProductsChart />
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrdersTable />
          <RecentActivity />
        </div>
      </div>
    </>
  );
}

