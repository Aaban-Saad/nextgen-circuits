'use client'

import { X, Package, DollarSign, Layers, Box, Tag, Calendar, User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Product } from '../products/page'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ViewProductDialogProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ViewProductDialog({ product, isOpen, onClose }: ViewProductDialogProps) {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "OUT OF STOCK", color: "bg-red-500" }
    if (stock < 50) return { label: "LOW STOCK", color: "bg-orange-500" }
    return { label: "IN STOCK", color: "bg-green-500" }
  }

  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const status = getStockStatus(product.stock)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-y-auto">
        <ScrollArea className="h-[80vh] p-6">

          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl">Product Details</DialogTitle>
              <Badge className={`${status.color} text-white`}>
                {status.label}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Image */}
            <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover"
                  height={300}
                  width={500}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <Package size={64} className="mx-auto mb-2" />
                    <p>No image available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Product Name & SKU */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-gray-500 mt-1">SKU: {product.sku}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <DollarSign size={18} />
                  <span className="text-sm font-medium">Price</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <Box size={18} />
                  <span className="text-sm font-medium">Stock</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{product.stock}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <Layers size={18} />
                  <span className="text-sm font-medium">Category</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatCategory(product.category)}</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <Tag size={18} />
                  <span className="text-sm font-medium">Value</span>
                </div>
                <p className="text-lg font-bold text-gray-900">${(product.price * product.stock).toFixed(2)}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar size={20} className="text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Created At</p>
                    <p className="text-sm text-gray-900 mt-1">{formatDate(product.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar size={20} className="text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Last Updated</p>
                    <p className="text-sm text-gray-900 mt-1">{formatDate(product.updated_at)}</p>
                  </div>
                </div>

                {product.created_by && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg sm:col-span-2">
                    <User size={20} className="text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Created By</p>
                      <p className="text-sm text-gray-900 mt-1 font-mono">{product.created_by}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stock Warning */}
            {product.stock < 50 && product.stock > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Package size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900">Low Stock Alert</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      This product is running low on stock. Consider restocking soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {product.stock === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Package size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900">Out of Stock</h4>
                    <p className="text-sm text-red-700 mt-1">
                      This product is currently out of stock. Restock immediately to continue sales.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}