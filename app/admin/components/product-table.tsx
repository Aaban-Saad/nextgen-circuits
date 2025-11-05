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
    <div className="product-table-wrapper bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">Product</TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap hidden sm:table-cell">Category</TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">Stock</TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">Price</TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap hidden md:table-cell">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="min-w-[150px]">
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{product.id}</div>
                    <div className="text-xs text-gray-600 mt-1 sm:hidden">
                      {product.category}
                    </div>
                    <Badge className={`${product.statusColor} text-white text-xs mt-1 md:hidden`}>
                      {product.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-gray-700 hidden sm:table-cell">{product.category}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className={`font-medium ${product.stockColor}`}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-gray-900 whitespace-nowrap">{product.price}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className={`${product.statusColor} text-white`}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                    <button
                      className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                      aria-label="Edit product"
                    >
                      <Edit size={14} className="sm:size-4 text-gray-600" />
                    </button>
                    <button
                      className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete"
                      aria-label="Delete product"
                    >
                      <Trash2 size={14} className="sm:size-4 text-red-600" />
                    </button>
                    <button
                      className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:inline-flex"
                      title="View"
                      aria-label="View product"
                    >
                      <Eye size={14} className="sm:size-4 text-gray-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

