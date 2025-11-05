"use client";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductSearchFilters() {
  return (
    <div className="product-search-filters bg-white rounded-lg p-4 mb-6 shadow-sm flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
      <div className="relative flex-1 w-full sm:min-w-[250px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent text-sm sm:text-base"
        />
      </div>
      
      <Select defaultValue="all-categories">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-categories">All Categories</SelectItem>
          <SelectItem value="development-boards">Development Boards</SelectItem>
          <SelectItem value="resistors">Resistors</SelectItem>
          <SelectItem value="capacitors">Capacitors</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all-status">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Stock Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-status">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="low-stock">Low Stock</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

