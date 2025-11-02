"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CATEGORIES } from "../data"
import { debounce } from "@/lib/utils"

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

  const activeCategories = useMemo(() => params.getAll("category"), [params])

  // Local state for debounced inputs
  const [searchValue, setSearchValue] = useState(params.get("q") ?? "")
  const [minValue, setMinValue] = useState(params.get("min") ?? "")
  const [maxValue, setMaxValue] = useState(params.get("max") ?? "")

  // Sync local state with URL params when they change externally (e.g., from Reset button)
  useEffect(() => {
    setSearchValue(params.get("q") ?? "")
    setMinValue(params.get("min") ?? "")
    setMaxValue(params.get("max") ?? "")
  }, [params])

  // Create debounced functions using useRef to persist across renders
  const debouncedSetSearchRef = useRef(
    debounce((value: string) => setParam("q", value || null), 300)
  )
  const debouncedSetMinRef = useRef(
    debounce((value: string) => setParam("min", value || null), 300)
  )
  const debouncedSetMaxRef = useRef(
    debounce((value: string) => setParam("max", value || null), 300)
  )

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearchValue(value)
    debouncedSetSearchRef.current(value)
  }

  // Handle min price input
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setMinValue(value)
    debouncedSetMinRef.current(value)
  }

  // Handle max price input
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setMaxValue(value)
    debouncedSetMaxRef.current(value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          placeholder="Search products"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Category</p>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => {
            const checked = activeCategories.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`text-left rounded-md border px-3 py-2 text-sm transition ${
                  checked ? "border-primary text-primary" : "hover:border-primary/50"
                }`}
                aria-pressed={checked}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Price</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="min" className="text-xs">Min</Label>
            <Input
              id="min"
              type="number"
              inputMode="numeric"
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
              value={maxValue}
              onChange={handleMaxChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Minimum rating</Label>
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
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="1">1+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="secondary"
        onClick={() => {
          const url = new URL(window.location.href)
          url.search = ""
          window.history.replaceState(null, "", url.toString())
        }}
      >
        Reset
      </Button>
    </div>
  )
}


