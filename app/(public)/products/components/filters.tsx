"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { debounce } from "@/lib/utils"
import { getBrowserSupabaseClient } from "@/lib/supabase/browser"
import { Loader2 } from "lucide-react"

interface Category {
  id: string
  name: string
}

function useSetParam() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  return (key: string, value?: string | null) => {
    const newParams = new URLSearchParams(params?.toString())
    if (value === undefined || value === null || value === "") {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    router.replace(`${pathname}?${newParams.toString()}`)
  }
}

function useToggleArrayParam(key: string) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  return (value: string) => {
    const newParams = new URLSearchParams(params?.toString())
    const current = newParams.getAll(key)
    const exists = current.includes(value)
    const next = exists ? current.filter((v) => v !== value) : [...current, value]
    newParams.delete(key)
    next.forEach((v) => newParams.append(key, v))
    router.replace(`${pathname}?${newParams.toString()}`)
  }
}

export default function Filters() {
  const params = useSearchParams()
  const setParam = useSetParam()
  const toggleCategory = useToggleArrayParam("category")
  const supabase = getBrowserSupabaseClient()

  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  const activeCategories = useMemo(() => params.getAll("category"), [params])

  // Local state for debounced inputs
  const [searchValue, setSearchValue] = useState(params.get("q") ?? "")
  const [minValue, setMinValue] = useState(params.get("min") ?? "")
  const [maxValue, setMaxValue] = useState(params.get("max") ?? "")

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name')
          .order('name')

        if (error) throw error
        setCategories(data || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [supabase])

  // Sync local state with URL params when they change externally
  useEffect(() => {
    setSearchValue(params.get("q") ?? "")
    setMinValue(params.get("min") ?? "")
    setMaxValue(params.get("max") ?? "")
  }, [params])

  // Create debounced functions
  const debouncedSetSearchRef = useRef(
    debounce((value: string) => setParam("q", value || null), 300)
  )
  const debouncedSetMinRef = useRef(
    debounce((value: string) => setParam("min", value || null), 300)
  )
  const debouncedSetMaxRef = useRef(
    debounce((value: string) => setParam("max", value || null), 300)
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchValue(value)
    debouncedSetSearchRef.current(value)
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setMinValue(value)
    debouncedSetMinRef.current(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setMaxValue(value)
    debouncedSetMaxRef.current(value)
  }

  const handleReset = () => {
    const url = new URL(window.location.href)
    url.search = ""
    window.history.replaceState(null, "", url.toString())
    setSearchValue("")
    setMinValue("")
    setMaxValue("")
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="q">Search Products</Label>
        <Input
          id="q"
          placeholder="Search by name or SKU..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Category</p>
        {loadingCategories ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories available</p>
        ) : (
          <div className="space-y-2">
            {categories.map((cat) => {
              const checked = activeCategories.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full text-left rounded-md border px-3 py-2 text-sm transition ${
                    checked 
                      ? "border-primary bg-primary/5 text-primary font-medium" 
                      : "hover:border-primary/50 hover:bg-gray-50"
                  }`}
                  aria-pressed={checked}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Price Range (৳ BDT)</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="min" className="text-xs">Min</Label>
            <Input
              id="min"
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={minValue}
              onChange={handleMinChange}
            />
          </div>
          <div>
            <Label htmlFor="max" className="text-xs">Max</Label>
            <Input
              id="max"
              type="number"
              inputMode="numeric"
              placeholder="10000"
              value={maxValue}
              onChange={handleMaxChange}
            />
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-2">
        <Label>Stock Status</Label>
        <Select
          value={params.get("stock") ?? undefined}
          onValueChange={(v) => {
            if (v === "clear") {
              setParam("stock", null)
            } else {
              setParam("stock", v)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clear">Any</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="low_stock">Low Stock (&lt;= 10)</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <Label>Minimum Rating</Label>
        <Select
          value={params.get("rating") ?? undefined}
          onValueChange={(v) => {
            if (v === "clear") {
              setParam("rating", null)
            } else {
              setParam("rating", v)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clear">Any</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="2">2+ Stars</SelectItem>
            <SelectItem value="1">1+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      <Button
        variant="secondary"
        className="w-full"
        onClick={handleReset}
      >
        Reset Filters
      </Button>
    </div>
  )
}


