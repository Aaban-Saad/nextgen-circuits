"use client";

import { Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: "ARD-NANO-001",
    name: "Arduino Nano",
    category: "Development Boards",
    stock: 150,
    stockColor: "text-green-600",
    price: "$24.99",
    status: "ACTIVE",
    statusColor: "bg-green-500",
  },
  {
    id: "RPI-4B-2GB",
    name: "Raspberry Pi 4",
    category: "Development Boards",
    stock: 75,
    stockColor: "text-green-600",
    price: "$45.99",
    status: "ACTIVE",
    statusColor: "bg-green-500",
  },
  {
    id: "RES-10K-100PK",
    name: "10k Resistor Pack",
    category: "Resistors",
    stock: 30,
    stockColor: "text-yellow-600",
    price: "$4.99",
    status: "LOW-STOCK",
    statusColor: "bg-orange-500",
  },
  {
    id: "CAP-100UF-50V",
    name: "100uF Capacitor",
    category: "Capacitors",
    stock: 0,
    stockColor: "text-red-600",
    price: "$2.49",
    status: "INACTIVE",
    statusColor: "bg-red-500",
  },
];

export function ProductTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Product</TableHead>
            <TableHead className="font-semibold text-gray-700">Category</TableHead>
            <TableHead className="font-semibold text-gray-700">Stock</TableHead>
            <TableHead className="font-semibold text-gray-700">Price</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-gray-50">
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.id}</div>
                </div>
              </TableCell>
              <TableCell className="text-gray-700">{product.category}</TableCell>
              <TableCell>
                <span className={`font-medium ${product.stockColor}`}>
                  {product.stock}
                </span>
              </TableCell>
              <TableCell className="font-medium text-gray-900">{product.price}</TableCell>
              <TableCell>
                <Badge className={`${product.statusColor} text-white`}>
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                    aria-label="Edit product"
                  >
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete"
                    aria-label="Delete product"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View"
                    aria-label="View product"
                  >
                    <Eye size={16} className="text-gray-600" />
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

