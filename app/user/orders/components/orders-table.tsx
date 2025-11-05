"use client";

import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: "ORD-2305",
    date: "May 15, 2023",
    total: "$125.99",
    status: "Delivered",
    statusBg: "bg-green-100",
    statusText: "text-green-600",
  },
  {
    id: "ORD-2304",
    date: "Apr 28, 2023",
    total: "$89.95",
    status: "Shipped",
    statusBg: "bg-green-100",
    statusText: "text-green-600",
  },
  {
    id: "ORD-2303",
    date: "Mar 15, 2023",
    total: "$35.50",
    status: "Processing",
    statusBg: "bg-blue-100",
    statusText: "text-blue-600",
  },
  {
    id: "ORD-2302",
    date: "Feb 20, 2023",
    total: "$199.99",
    status: "Pending",
    statusBg: "bg-orange-100",
    statusText: "text-orange-600",
  },
];

export function OrdersTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Total</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
              <TableCell className="text-gray-700">{order.date}</TableCell>
              <TableCell className="font-medium text-gray-900">{order.total}</TableCell>
              <TableCell>
                <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${order.statusBg} ${order.statusText}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <button
                  className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="View"
                  aria-label="View order"
                >
                  <Eye size={18} className="text-[#3498db]" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

