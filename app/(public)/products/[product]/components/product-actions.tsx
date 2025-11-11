'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ProductActionsProps {
  stock: number
  productId: string
  sku: string
}

export default function ProductActions({ stock, productId, sku }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1)
    } else {
      toast.error(`Only ${stock} items available in stock`)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = async () => {
    if (stock === 0) {
      toast.error('Product is out of stock')
      return
    }

    setIsAddingToCart(true)

    try {
      // TODO: Implement cart functionality
      // For now, just show success message
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call
      
      toast.success(`Added ${quantity} item(s) to cart`)
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = async () => {
    if (stock === 0) {
      toast.error('Product is out of stock')
      return
    }

    // TODO: Implement buy now functionality
    toast.info('Buy now functionality coming soon')
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity <= 1 || stock === 0}
            className="h-10 w-10"
          >
            <Minus size={16} />
          </Button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              if (value > 0 && value <= stock) {
                setQuantity(value)
              }
            }}
            min={1}
            max={stock}
            disabled={stock === 0}
            className="h-10 w-20 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={quantity >= stock || stock === 0}
            className="h-10 w-10"
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={stock === 0 || isAddingToCart}
          className="flex-1 gap-2 bg-primary hover:bg-primary/90"
        >
          <ShoppingCart size={18} />
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </Button>
        <Button
          onClick={handleBuyNow}
          disabled={stock === 0}
          variant="outline"
          className="flex-1"
        >
          Buy Now
        </Button>
      </div>

      {/* Stock Warning */}
      {stock > 0 && stock <= 10 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Only {stock} items left in stock
          </p>
        </div>
      )}
    </div>
  )
}


