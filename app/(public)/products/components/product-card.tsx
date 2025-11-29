"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { addToCart } from "@/lib/actions/cart"
import ProductRating from "./product-rating"

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

export default function ProductCard({ product }: { product: Product }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock')
      return
    }

    setIsAddingToCart(true)
    try {
      await addToCart(product.id, 1)
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success(
        <div className="flex items-center justify-end gap-4">
          <span>Added to cart</span>
          <Button size="sm" asChild>
            <Link href="/cart">View Cart</Link>
          </Button>
        </div>
      )
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
            <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">৳{product.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500">BDT</span>
              </div>
              <ProductRating productId={product.id} />
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4 flex flex-col gap-2">
        <Button
          size="sm"
          className="w-full gap-2"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
        >
          <ShoppingCart size={16} />
          {product.stock === 0 ? 'Out of Stock' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-full gap-2"
          onClick={
            () => {
              handleAddToCart()
              window.location.href = '/checkout'
            }
          }
          disabled={product.stock === 0 || isAddingToCart}
        >
          <Coins size={16} />
          {product.stock === 0 ? 'Out of Stock' : isAddingToCart ? 'Adding...' : 'Buy Now'}
        </Button>
      </CardFooter>
    </Card>
  )
}


