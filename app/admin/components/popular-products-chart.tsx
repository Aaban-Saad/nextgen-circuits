"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  { product: "Arduino Nano", count: 145 },
  { product: "Raspberry Pi 4", count: 132 },
  { product: "ESP32", count: 98 },
  { product: "Sensors Pack", count: 76 },
  { product: "LED Kit", count: 54 },
];

const colors = ["#00ccff", "#00b87a", "#9333ea", "#6b7280", "#f97316"];

export function PopularProductsChart() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Popular Products</CardTitle>
        <Select defaultValue="all-categories">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">All Categories</SelectItem>
            <SelectItem value="microcontrollers">Microcontrollers</SelectItem>
            <SelectItem value="sensors">Sensors</SelectItem>
            <SelectItem value="components">Components</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="product" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
