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
import { Badge } from "@/components/ui/badge";

// Mock orders data - empty table shown in image
const orders: Array<{
  id: string;
  customer: string;
  date: string;
  total: string;
  status: string;
  statusColor: string;
}> = [];

export function OrderTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
            <TableHead className="font-semibold text-gray-700">Customer</TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Total</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                <TableCell className="text-gray-700">{order.customer}</TableCell>
                <TableCell className="text-gray-700">{order.date}</TableCell>
                <TableCell className="font-medium text-gray-900">{order.total}</TableCell>
                <TableCell>
                  <Badge className={`${order.statusColor} text-white`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View"
                      aria-label="View order"
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

