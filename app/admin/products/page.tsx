'use client'

import { useState, useEffect } from "react"
import { ShoppingBag, Tag, AlertTriangle, DollarSign, RefreshCw, Plus } from "lucide-react"
import { ProductStatsCard } from "../components/product-stats-card"
import { ProductTable } from "../components/product-table"
import { ProductSearchFilters } from "../components/product-search-filters"
import { AdminHeader } from "../components/admin-header"
import { AddProductDialog, ProductFormData } from "../components/add-product-dialog"
import { Button } from "@/components/ui/button"
import { getBrowserSupabaseClient } from "@/lib/supabase/browser"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { isAdmin } from "@/lib/supabase/role-access-control"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  sku: string
  images: string[]
  is_active: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export default function ProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  const supabase = getBrowserSupabaseClient()

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProducts(data || [])
    } catch (error: any) {
      console.error('Error fetching products:', error)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = async (product: ProductFormData, imageFiles: File[]) => {
    setIsSubmitting(true)

    try {
      // Debug logging
      console.log('Current user object:', user)
      console.log('User ID:', user?.id)
      
      // Await the isAdmin check since it returns a Promise
      const userIsAdmin = await isAdmin(user)
      console.log('Is Admin:', userIsAdmin)

      // Get session to verify auth
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Current session:', session)
      console.log('Session user ID:', session?.user?.id)
      
      // Check if user is admin
      if (!userIsAdmin) {
        toast.error("Only admins can add products")
        setIsSubmitting(false)
        return
      }

      // Upload images to Supabase storage
      const imageUrls: string[] = []

      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i]
          const fileExt = file.name.split('.').pop()
          const fileName = `${product.sku}-${Date.now()}-${i}.${fileExt}`
          const filePath = `products/${fileName}`

          const { error: uploadError, data } = await supabase.storage
            .from('product-images')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            })

          if (uploadError) {
            throw new Error(`Failed to upload image ${i + 1}: ${uploadError.message}`)
          }

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath)

          imageUrls.push(publicUrl)
        }
      }

      // Use session?.user?.id instead of user?.id for created_by
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          sku: product.sku,
          images: imageUrls,
          is_active: product.isActive ?? true, // Add this line
          created_by: session?.user?.id || user?.id // Use session user ID if available
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase insert error:', error)
        // Clean up uploaded images if product creation fails
        for (const url of imageUrls) {
          const path = url.split('/').slice(-2).join('/')
          await supabase.storage.from('product-images').remove([path])
        }
        throw error
      }

      toast.success(`Product "${product.name}" added successfully`)

      // Refresh products list
      fetchProducts()

      // Close dialog
      setIsDialogOpen(false)

    } catch (error: any) {
      console.error('Error adding product:', error)
      toast.error(error.message || "Failed to add product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setIsSubmitting(false)
  }

  // Calculate stats
  const totalProducts = products.length
  const categories = new Set(products.map(p => p.category)).size
  const lowStockItems = products.filter(p => p.stock < 50).length
  const inventoryValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)

  return (
    <>
      <div className="admin-topbar">
        <AdminHeader />
      </div>
      <div className="dashboard-content">
        {/* Header */}
        <div className="products-page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="products-page-title text-2xl sm:text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your electronic components</p>
          </div>
          <div className="products-page-actions flex items-center gap-2 sm:gap-3 flex-wrap">
            <Button variant="outline" size="sm" className="gap-2" onClick={fetchProducts} disabled={loading}>
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-[#3498db] hover:bg-[#2980b9]"
              onClick={() => setIsDialogOpen(true)}
              disabled={!isAdmin(user)}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add New Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <ProductStatsCard
            title="Total Products"
            value={totalProducts.toString()}
            trend="+12.5%↑"
            trendPositive={true}
            icon={<ShoppingBag size={24} className="text-[#3498db]" />}
            iconBg="bg-blue-100"
          />
          <ProductStatsCard
            title="Categories"
            value={categories.toString()}
            trend="+2↑"
            trendPositive={true}
            icon={<Tag size={24} className="text-[#2ecc71]" />}
            iconBg="bg-green-100"
          />
          <ProductStatsCard
            title="Low Stock Items"
            value={lowStockItems.toString()}
            trend="+5↑"
            trendPositive={true}
            icon={<AlertTriangle size={24} className="text-[#9333ea]" />}
            iconBg="bg-purple-100"
          />
          <ProductStatsCard
            title="Inventory Value"
            value={`$${inventoryValue.toFixed(2)}`}
            trend="+8.3%↑"
            trendPositive={true}
            icon={<DollarSign size={24} className="text-[#e74c3c]" />}
            iconBg="bg-red-100"
          />
        </div>

        {/* Search and Filters */}
        <ProductSearchFilters />

        {/* Product Table */}
        <ProductTable products={products} loading={loading} onRefresh={fetchProducts} />

        {/* Add Product Dialog */}
        <AddProductDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleAddProduct}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  )
}

