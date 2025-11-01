import { Target, Mail, TrendingUp, DollarSign, Plus } from "lucide-react";
import { MarketingStatsCard } from "./components/marketing-stats-card";
import { MarketingTable } from "./components/marketing-table";
import { MarketingSearchFilters } from "./components/marketing-search-filters";
import { AdminHeader } from "../components/admin-header";

export default function MarketingPage() {
  return (
    <>
      <div className="admin-topbar">
        <AdminHeader />
      </div>
      <div className="dashboard-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing Management</h1>
            <p className="text-gray-600 mt-1">Manage your marketing campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#3498db] hover:bg-[#2980b9] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Plus size={16} />
              New Campaign
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <MarketingStatsCard
            title="Active Campaigns"
            value="8"
            icon={<Target size={24} className="text-[#3498db]" />}
            iconBg="bg-blue-100"
          />
          <MarketingStatsCard
            title="Email Subscribers"
            value="2.5K"
            icon={<Mail size={24} className="text-[#2ecc71]" />}
            iconBg="bg-green-100"
          />
          <MarketingStatsCard
            title="Conversion Rate"
            value="3.2%"
            icon={<TrendingUp size={24} className="text-[#9333ea]" />}
            iconBg="bg-purple-100"
          />
          <MarketingStatsCard
            title="ROI"
            value="$ 245%"
            icon={<DollarSign size={24} className="text-[#f39c12]" />}
            iconBg="bg-orange-100"
          />
        </div>

        {/* Search and Filters */}
        <MarketingSearchFilters />

        {/* Marketing Table */}
        <MarketingTable />
      </div>
    </>
  );
}

