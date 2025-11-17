'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateCartQuantity, removeFromCart } from '@/lib/actions/cart'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface CartItemProps {
  item: {
    id: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
      stock: number
      sku: string
      images: string[]
    }
  }
}

export function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const imageUrl = item.product.images?.[0] || '/placeholder-product.jpg'

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.product.stock) return

    setLoading(true)
    const result = await updateCartQuantity(item.id, newQuantity)

    if (result.success) {
      setQuantity(newQuantity)
      router.refresh()
    } else {
      toast.error(result.error || 'Failed to update quantity')
    }
    setLoading(false)
  }

  const handleRemove = async () => {
    setLoading(true)
    const result = await removeFromCart(item.id)

    if (result.success) {
      toast.success('Item removed from cart')
      router.refresh()
    } else {
      toast.error(result.error || 'Failed to remove item')
    }
    setLoading(false)
  }

  return (
    <div className="flex gap-4 py-4 border-b">
      <Link href={`/products/${item.product.sku}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.product.name}
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link 
          href={`/products/${item.product.sku}`}
          className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          SKU: {item.product.sku}
        </p>
        <p className="text-sm text-muted-foreground">
          {item.product.stock > 0 ? (
            <span className="text-green-600">In Stock ({item.product.stock} available)</span>
          ) : (
            <span className="text-destructive">Out of Stock</span>
          )}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold text-lg">
          ৳{(item.product.price * quantity).toFixed(2)}
        </p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={loading || quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <Input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value)
              if (val >= 1 && val <= item.product.stock) {
                handleQuantityChange(val)
              }
            }}
            className="w-16 h-8 text-center"
            min={1}
            max={item.product.stock}
            disabled={loading}
          />
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={loading || quantity >= item.product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          disabled={loading}
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  )
}