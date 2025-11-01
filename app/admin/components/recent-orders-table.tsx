"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "#ORD-2305",
    customer: "John Smith",
    status: "Completed",
    statusColor: "bg-green-500",
    amount: "$125.99",
  },
  {
    id: "#ORD-2304",
    customer: "Sarah Johnson",
    status: "Processing",
    statusColor: "bg-blue-500",
    amount: "$89.50",
  },
  {
    id: "#ORD-2303",
    customer: "Michael Brown",
    status: "Completed",
    statusColor: "bg-green-500",
    amount: "$432.25",
  },
  {
    id: "#ORD-2302",
    customer: "Emily Davis",
    status: "Pending",
    statusColor: "bg-orange-500",
    amount: "$76.00",
  },
];

export function RecentOrdersTable() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
        <Link href="/admin/orders" className="text-sm text-[#00ccff] hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">Order ID</TableHead>
              <TableHead className="text-gray-600">Customer</TableHead>
              <TableHead className="text-gray-600">Status</TableHead>
              <TableHead className="text-gray-600 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge className={`${order.statusColor} text-white`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {order.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

