'use client'

import { useState } from "react"
import { ShoppingBag, Tag, AlertTriangle, DollarSign, RefreshCw, Plus } from "lucide-react"
import { ProductStatsCard } from "../components/product-stats-card"
import { ProductTable } from "../components/product-table"
import { ProductSearchFilters } from "../components/product-search-filters"
import { AdminHeader } from "../components/admin-header"
import { AddProductDialog, ProductFormData } from "../components/add-product-dialog"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/supabase-client"
import { useAuth } from "@/lib/supabase/use-auth"
import { toast } from "sonner"
import { isAdmin } from "@/lib/supabase/role-access-control"

export default function ProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, profile } = useAuth()

  const handleAddProduct = async (product: ProductFormData) => {
    setIsSubmitting(true)

    try {
      // Check if user is admin
      if (!isAdmin(profile)) {
        toast.error("Only admins can add products")
        setIsSubmitting(false)
        return
      }

      // Insert product into Supabase
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          sku: product.sku,
          image_url: product.image_url || null,
          created_by: user?.id
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      toast.success(`Product "${product.name}" added successfully`)

      console.log('Product added:', data)

      // Close dialog AFTER resetting submitting state
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
    setIsSubmitting(false) // Reset submitting state when closing
  }

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
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-[#3498db] hover:bg-[#2980b9]"
              onClick={() => setIsDialogOpen(true)}
              disabled={profile?.role !== 'admin'}
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
            value="4"
            trend="+12.5%↑"
            trendPositive={true}
            icon={<ShoppingBag size={24} className="text-[#3498db]" />}
            iconBg="bg-blue-100"
          />
          <ProductStatsCard
            title="Categories"
            value="3"
            trend="+2↑"
            trendPositive={true}
            icon={<Tag size={24} className="text-[#2ecc71]" />}
            iconBg="bg-green-100"
          />
          <ProductStatsCard
            title="Low Stock Items"
            value="1"
            trend="+5↑"
            trendPositive={true}
            icon={<AlertTriangle size={24} className="text-[#9333ea]" />}
            iconBg="bg-purple-100"
          />
          <ProductStatsCard
            title="Inventory Value"
            value="$7347.45"
            trend="+8.3%↑"
            trendPositive={true}
            icon={<DollarSign size={24} className="text-[#e74c3c]" />}
            iconBg="bg-red-100"
          />
        </div>

        {/* Search and Filters */}
        <ProductSearchFilters />

        {/* Product Table */}
        <ProductTable />

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

