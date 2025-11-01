"use client";

import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DeliveryDetails() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="size-5 text-[#3498db]" />
          Delivery Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="form-group">
            <Label htmlFor="fullName">Full Name</Label>
            <Input type="text" id="fullName" placeholder="Enter your full name" />
          </div>
          
          <div className="form-group">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="tel" id="phoneNumber" placeholder="Enter your phone number" />
              <Input type="tel" id="alternativePhone" placeholder="Alternative Phone (Optional)" />
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input type="text" id="streetAddress" placeholder="Enter your street address" />
          </div>

          <div className="form-group">
            <Label>Location</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input type="text" id="city" placeholder="City" />
              <Input type="text" id="state" placeholder="State" />
              <Input type="text" id="zipCode" placeholder="ZIP Code" />
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
            <Textarea
              id="deliveryInstructions"
              rows={4}
              placeholder="Any special delivery instructions..."
            />
          </div>

          <Button type="submit" className="bg-[#3498db] hover:bg-[#2980b9] text-white">
            Save Details
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

