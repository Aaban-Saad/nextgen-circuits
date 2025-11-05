"use client";

import { Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    membership: "Premium",
    membershipColor: "bg-yellow-500",
    orders: 15,
    totalSpent: "$2499.99",
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    membership: "Vip",
    membershipColor: "bg-purple-500",
    orders: 27,
    totalSpent: "$4750.50",
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    membership: "Standard",
    membershipColor: "bg-blue-500",
    orders: 3,
    totalSpent: "$349.99",
    status: "Inactive",
    statusColor: "bg-red-500",
  },
  {
    id: "4",
    name: "Emily Williams",
    email: "emily@example.com",
    membership: "Premium",
    membershipColor: "bg-yellow-500",
    orders: 12,
    totalSpent: "$1899.75",
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    membership: "Standard",
    membershipColor: "bg-blue-500",
    orders: 7,
    totalSpent: "$899.50",
    status: "Active",
    statusColor: "bg-green-500",
  },
];

export function CustomerTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Customer</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700">Orders</TableHead>
            <TableHead className="font-semibold text-gray-700">Total Spent</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{customer.name}</span>
                  <Badge className={`${customer.membershipColor} text-white text-xs`}>
                    {customer.membership}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-gray-700">{customer.email}</TableCell>
              <TableCell className="text-gray-700 font-medium">{customer.orders}</TableCell>
              <TableCell className="font-medium text-gray-900">{customer.totalSpent}</TableCell>
              <TableCell>
                <Badge className={`${customer.statusColor} text-white`}>
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View"
                    aria-label="View customer"
                  >
                    <Eye size={16} className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                    aria-label="Edit customer"
                  >
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete"
                    aria-label="Delete customer"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

