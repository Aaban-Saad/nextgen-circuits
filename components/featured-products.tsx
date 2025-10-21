"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Star, Eye, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Arduino UNO R3",
    image: "/assets/images/products/arduino-uno.jpg",
    price: 850,
    oldPrice: 950,
    rating: 4.5,
    reviews: 45,
    badge: "New"
  },
  {
    id: 2,
    name: "Raspberry Pi 4 Model B (4GB)",
    image: "/assets/images/products/raspberry-pi.jpg",
    price: 7500,
    rating: 5,
    reviews: 78,
    badge: "Bestseller"
  },
  {
    id: 3,
    name: "HC-SR04 Ultrasonic Sensor",
    image: "/assets/images/products/ultrasonic-sensor.jpg",
    price: 120,
    oldPrice: 150,
    rating: 4,
    reviews: 32
  },
  {
    id: 4,
    name: "16x2 LCD Display Module",
    image: "/assets/images/products/lcd-display.jpg",
    price: 220,
    oldPrice: 280,
    rating: 3.5,
    reviews: 21,
    badge: "Sale"
  }
];

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
  }
  
  if (hasHalfStar) {
    stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
  }
  
  return stars;
};

export default function FeaturedProducts() {
  return (
    <section className="featured-products py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {product.badge && (
                  <Badge 
                    className={`absolute top-3 left-3 z-10 ${
                      product.badge === 'New' ? 'bg-green-500' :
                      product.badge === 'Bestseller' ? 'bg-orange-500' :
                      product.badge === 'Sale' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="px-3">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Browse All Categories</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}