import { ShoppingCart, Truck, CheckCircle, Clock } from "lucide-react";
import { OrderSummaryCard } from "./components/order-summary-card";
import { OrderFilters } from "./components/order-filters";
import { OrdersTable } from "./components/orders-table";

export default function MyOrdersPage() {
  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>
      
      {/* Order Summary Cards */}
      <div className="stats-grid mb-6">
        <OrderSummaryCard
          title="Total Orders"
          value="4"
          icon={<ShoppingCart size={24} className="text-[#3498db]" />}
          iconBg="bg-blue-100"
        />
        <OrderSummaryCard
          title="In Transit"
          value="1"
          icon={<Truck size={24} className="text-[#2ecc71]" />}
          iconBg="bg-green-100"
        />
        <OrderSummaryCard
          title="Delivered"
          value="2"
          icon={<CheckCircle size={24} className="text-[#2ecc71]" />}
          iconBg="bg-green-100"
        />
        <OrderSummaryCard
          title="Pending"
          value="1"
          icon={<Clock size={24} className="text-[#f39c12]" />}
          iconBg="bg-orange-100"
        />
      </div>

      {/* Filters */}
      <OrderFilters />

      {/* Orders Table */}
      <OrdersTable />
    </>
  );
}

