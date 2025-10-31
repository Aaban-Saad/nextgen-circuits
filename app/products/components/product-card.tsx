"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import type { ListProduct } from "../data"

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

export default function ProductCard({ product }: { product: ListProduct }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="px-0 pt-0">
        <div className="relative aspect-[4/3] w-full bg-muted">
          {/* next/image for local or remote URLs */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="px-4 pt-4">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-sm font-medium line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-semibold">৳{product.price}</span>
            <Stars rating={product.rating} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4">
        <Button size="sm" className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}


