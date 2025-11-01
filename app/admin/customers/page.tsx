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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="size-8 text-[#3498db]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600 mt-1">Manage your customer base</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Plus size={16} />
              Add New Customer
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

