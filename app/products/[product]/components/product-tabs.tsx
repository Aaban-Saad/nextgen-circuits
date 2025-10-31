"use client";

import type { Product } from "../data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function ProductTabs({ product }: { product: Product }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">About this Item</h2>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="border border-gray-200 mb-6 bg-transparent p-0 h-auto">
          <div className="flex flex-wrap gap-2 ">
            <TabsTrigger value="description" className="px-4 py-2 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/30">Description</TabsTrigger>
            <TabsTrigger value="specs" className="px-4 py-2 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/30">Specifications</TabsTrigger>
            <TabsTrigger value="videos" className="px-4 py-2 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/30">Videos</TabsTrigger>
            <TabsTrigger value="reviews" className="px-4 py-2 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/30">Reviews</TabsTrigger>
            <TabsTrigger value="questions" className="px-4 py-2 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/30">Questions</TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="description">
          <Card className="rounded-lg border border-gray-200 p-5 bg-white">
            <div className="prose max-w-none">
              <p>
                The 7400 series integrated circuit contains four independent NAND
                gates. It is widely used in digital logic applications, teaching
                labs, and prototyping. This mock product shows the overall page
                layout while we wire up the real backend later.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="specs">
          <Card className="rounded-lg border border-gray-200 p-5 bg-white">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {product.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card className="rounded-lg border border-gray-200 p-5 bg-white">
            <div className="text-gray-700">No videos yet.</div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="rounded-lg border border-gray-200 p-5 bg-white">
            <div className="space-y-4">
              <div className="text-sm text-gray-700">Average rating: {product.rating} / 5 ({product.reviewsCount} reviews)</div>
              <ul className="space-y-4">
                {product.reviews.map((r) => (
                  <li key={r.id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{r.author}</span>
                      <span className="text-primary text-sm">{r.rating}★</span>
                    </div>
                    <p className="text-gray-700">{r.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">{r.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card className="rounded-lg border border-gray-200 p-5 bg-white">
            <div className="text-gray-700">No questions yet.</div>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}


