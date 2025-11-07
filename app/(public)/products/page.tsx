import Filters from "./components/filters"
import ProductCard from "./components/product-card"
import { MOCK_PRODUCTS, filterProducts } from "./data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : undefined
  const category = params.category
  const min = typeof params.min === "string" ? Number(params.min) : undefined
  const max = typeof params.max === "string" ? Number(params.max) : undefined
  const rating = typeof params.rating === "string" ? Number(params.rating) : undefined

  const filtered = filterProducts(MOCK_PRODUCTS, { q, category, min, max, rating })

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Products</h1>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline">Filters</Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Filters />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <Filters />
            </div>
          </aside>

          <section className="lg:col-span-9">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No products match your filters.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}


