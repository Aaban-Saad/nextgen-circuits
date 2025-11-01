"use client";

import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    id: "dev-boards",
    name: "Development Boards",
    icon: "Deve",
    description: "Microcontroller and processor developme...",
    products: 45,
    createdDate: "2023-01-15",
    status: "ACTIVE",
  },
  {
    id: "resistors",
    name: "Resistors",
    icon: "Resis",
    description: "Various resistors for electronic circuits",
    products: 32,
    createdDate: "2023-01-20",
    status: "ACTIVE",
  },
  {
    id: "capacitors",
    name: "Capacitors",
    icon: "Capa",
    description: "Different types of capacitors for electronic...",
    products: 28,
    createdDate: "2023-01-25",
    status: "ACTIVE",
  },
  {
    id: "ics",
    name: "Integrated Circuits",
    icon: "Integ",
    description: "Various ICs for different applications",
    products: 56,
    createdDate: "2023-02-05",
    status: "ACTIVE",
  },
  {
    id: "transistors",
    name: "Transistors",
    icon: "Trans",
    description: "Different types of transistors for electroni...",
    products: 18,
    createdDate: "2023-02-10",
    status: "ACTIVE",
  },
  {
    id: "sensors",
    name: "Sensors",
    icon: "Sens",
    description: "Various sensors for detecting environmen...",
    products: 37,
    createdDate: "2023-02-15",
    status: "ACTIVE",
  },
  {
    id: "leds",
    name: "LEDs",
    icon: "LEDs",
    description: "Light-emitting diodes of various colors an...",
    products: 22,
    createdDate: "2023-02-20",
    status: "ACTIVE",
  },
  {
    id: "connectors",
    name: "Connectors",
    icon: "Conn",
    description: "Various connectors for electronic projects",
    products: 15,
    createdDate: "2023-03-01",
    status: "ACTIVE",
  },
  {
    id: "power-supplies",
    name: "Power Supplies",
    icon: "Powe",
    description: "Power supply modules and components",
    products: 12,
    createdDate: "2023-03-10",
    status: "ACTIVE",
  },
  {
    id: "tools",
    name: "Tools",
    icon: "Tools",
    description: "Tools for electronics work and soldering",
    products: 24,
    createdDate: "2023-03-15",
    status: "ACTIVE",
  },
];

export function CategoryTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Category</TableHead>
            <TableHead className="font-semibold text-gray-700">Products</TableHead>
            <TableHead className="font-semibold text-gray-700">Created Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#3498db] text-white flex items-center justify-center font-semibold text-xs">
                    {category.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-700 font-medium">
                {category.products}
              </TableCell>
              <TableCell className="text-gray-700">{category.createdDate}</TableCell>
              <TableCell>
                <Badge className="bg-green-500 text-white">{category.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                    aria-label="Edit category"
                  >
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete"
                    aria-label="Delete category"
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

