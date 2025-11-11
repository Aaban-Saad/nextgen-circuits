import { getServerSupabaseClient } from '@/lib/supabase/server'
import ProductCard from './components/product-card'
import Filters from './components/filters'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SearchParams {
  q?: string
  category?: string | string[]
  min?: string
  max?: string
  rating?: string
  stock?: string
  sort?: string
}

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

async function getProducts(searchParams: SearchParams) {
  const supabase = await getServerSupabaseClient()

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)

  // Search filter
  if (searchParams.q) {
    query = query.or(`name.ilike.%${searchParams.q}%,sku.ilike.%${searchParams.q}%,description.ilike.%${searchParams.q}%`)
  }

  // Category filter
  if (searchParams.category) {
    const categories = Array.isArray(searchParams.category) 
      ? searchParams.category 
      : [searchParams.category]
    query = query.in('category', categories)
  }

  // Price range filter
  if (searchParams.min) {
    query = query.gte('price', parseFloat(searchParams.min))
  }
  if (searchParams.max) {
    query = query.lte('price', parseFloat(searchParams.max))
  }

  // Stock filter
  if (searchParams.stock) {
    switch (searchParams.stock) {
      case 'in_stock':
        query = query.gt('stock', 0)
        break
      case 'low_stock':
        query = query.gt('stock', 0).lte('stock', 10)
        break
      case 'out_of_stock':
        query = query.eq('stock', 0)
        break
    }
  }

  // Sorting
  const sortBy = searchParams.sort || 'newest'
  switch (sortBy) {
    case 'price_asc':
      query = query.order('price', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price', { ascending: false })
      break
    case 'name_asc':
      query = query.order('name', { ascending: true })
      break
    case 'name_desc':
      query = query.order('name', { ascending: false })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const products = await getProducts(searchParams)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Browse our collection of electronic components</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-4 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <Filters />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort and Results Count */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                {products.length} {products.length === 1 ? 'product' : 'products'} found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select defaultValue={searchParams.sort || 'newest'}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="name_asc">Name: A to Z</SelectItem>
                    <SelectItem value="name_desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}


