import { Users, Plus } from "lucide-react";
import { CustomerTable } from "./components/customer-table";
import { CustomerSearchFilters } from "./components/customer-search-filters";
import { AdminHeader } from "../components/admin-header";

export default function CustomersPage() {
  return (
    <>
      <div className="admin-topbar">
        <AdminHeader />
      </div>
      <div className="dashboard-content">
        {/* Header */}
        <div className="products-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Users className="size-6 sm:size-8 text-[#3498db]" />
            <div>
              <h1 className="products-page-title text-2xl sm:text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your customer base</p>
            </div>
          </div>
          <div className="products-page-actions flex items-center gap-2 sm:gap-3 flex-wrap">
            <button className="products-action-btn px-3 sm:px-4 py-2 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">Add New Customer</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <CustomerSearchFilters />

        {/* Customer Table */}
        <CustomerTable />
      </div>
    </>
  );
}

