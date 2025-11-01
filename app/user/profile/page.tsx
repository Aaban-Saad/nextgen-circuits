"use client";

import { useState } from "react";
import { User, Package, Heart, Settings, Truck } from "lucide-react";
import { UserHeader } from "../components/user-header";
import { DeliveryDetails } from "./components/delivery-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState("delivery");

  return (
    <>
      <UserHeader title="My Profile" subtitle="Manage your personal information" />
      
      <div className="dashboard-content">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="delivery" className="flex items-center gap-2 data-[state=active]:bg-[#3498db] data-[state=active]:text-white">
              <Truck size={16} />
              Delivery Details
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-[#3498db] data-[state=active]:text-white">
              <Package size={16} />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2 data-[state=active]:bg-[#3498db] data-[state=active]:text-white">
              <Heart size={16} />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-[#3498db] data-[state=active]:text-white">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="delivery">
            <DeliveryDetails />
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center text-gray-500">
              Orders content will be displayed here
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center text-gray-500">
              Wishlist content will be displayed here
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center text-gray-500">
              Settings content will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

