"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OrderFilters() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <Select defaultValue="all-orders">
        <SelectTrigger className="w-[150px] bg-white border border-gray-300 rounded-lg">
          <SelectValue placeholder="All Orders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-orders">All Orders</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all-time">
        <SelectTrigger className="w-[150px] bg-white border border-gray-300 rounded-lg">
          <SelectValue placeholder="All Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-time">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

