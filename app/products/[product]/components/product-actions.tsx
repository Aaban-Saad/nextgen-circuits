"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProductActions({ availability }: { availability: string }) {
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((q) => Math.min(99, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Quantity</p>
          <div className="inline-flex items-center rounded-lg border border-gray-200 overflow-hidden">
            <Button variant="ghost" type="button" onClick={decrement} className="px-3 py-2">−</Button>
            <div className="px-4 py-2 min-w-[3rem] text-center select-none">{quantity}</div>
            <Button variant="ghost" type="button" onClick={increment} className="px-3 py-2">+</Button>
          </div>
        </div>
        <span className="text-primary text-sm font-medium">{availability}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90">Buy Now</Button>
        <Button type="button" variant="outline" className="border-primary text-primary hover:bg-primary/5">Add to cart</Button>
      </div>
    </div>
  );
}


