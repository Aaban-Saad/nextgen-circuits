"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  sku: string
  images: string[]
  is_active: boolean
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 !== 0
  const empty = 5 - Math.ceil(rating)
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalf && (
        <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  )
}

export default function ProductCard({ product }: { product: Product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock')
      return
    }

    setIsAddingToCart(true)
    try {
      // TODO: Implement cart functionality
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Added to cart')
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  // Use first image or placeholder
  const imageUrl = product.images && product.images.length > 0
    ? product.images[0]
    : '/placeholder-product.jpg'

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="px-0 pt-0">
        <Link href={`/products/${product.sku}`} className="block">
          <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain group-hover:scale-105 transition-transform duration-200"
            />
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Out of Stock</span>
              </div>
            )}
            {product.stock > 0 && product.stock <= 10 && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Only {product.stock} left
              </div>
            )}
          </div>
          <div className="px-4 pt-4">
            {/* <Link href={`/products/${product.sku}`} className="block hover:text-primary transition-colors"> */}
              <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h3>
            {/* </Link> */}
            <p className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">৳{product.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500">BDT</span>
              </div>
              {/* TODO: Add rating from reviews when implemented */}
              <Stars rating={4} />
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button
          size="sm"
          className="w-full gap-2"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
        >
          <ShoppingCart size={16} />
          {product.stock === 0 ? 'Out of Stock' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  )
}


