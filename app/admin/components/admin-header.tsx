"use client";

import { Search, Bell, User, RefreshCw, Download } from "lucide-react";

export function AdminHeader() {
  return (
    <div className="admin-header-wrapper">
      <div className="search-bar">
        <i><Search size={18} /></i>
        <input type="search" placeholder="Search..." />
      </div>

      <div className="topbar-actions">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-count">3</span>
        </button>

        <div className="admin-profile">
          <div className="size-9 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="size-5 text-gray-600" />
          </div>
          <span className="admin-name text-sm font-medium text-gray-700 ml-2">Admin Name</span>
        </div>

        <button
          className="action-btn refresh-btn ml-4 px-4 py-2 bg-[#00ccff] hover:bg-[#009fd6] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <RefreshCw size={16} />
          <span className="btn-text">Refresh Data</span>
        </button>
        <button
          className="action-btn export-btn ml-2 px-4 py-2 bg-[#00ccff] hover:bg-[#009fd6] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Download size={16} />
          <span className="btn-text">Export Report</span>
        </button>
      </div>
    </div>
  );
}
