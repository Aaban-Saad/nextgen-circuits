"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Microcontrollers",
    image: "/assets/images/Popular Categories/microcontrollers.jpeg",
    href: "/categories#microcontrollers"
  },
  {
    name: "Sensors",
    image: "/assets/images/Popular Categories/sensors.jpeg", 
    href: "/categories#sensors"
  },
  {
    name: "Displays",
    image: "/assets/images/Popular Categories/displays.jpeg",
    href: "/categories#displays"
  },
  {
    name: "Components",
    image: "/assets/images/Popular Categories/components.jpg",
    href: "/categories#components"
  }
];

export default function FeaturedCategories() {
  return (
    <section className="featured-categories py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Popular Categories
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="category-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {category.name}
                    </h3>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={category.href}>View Products</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}