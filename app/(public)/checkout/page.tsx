'use client'

import { useState, useEffect } from 'react'
import { CheckoutForm } from './components/checkout-form'
import { getCartItems } from '@/lib/actions/cart'
import { redirect } from 'next/navigation'
import { Truck } from 'lucide-react'


export default function CheckoutPage() {
  const [items, setItems] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCart() {
      const cart = await getCartItems()
      if (cart.items.length === 0) {
        redirect('/cart')
      }
      setItems(cart.items)
      setTotal(cart.total)
      setLoading(false)
    }
    loadCart()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const finalTotal = deliveryFee ? total + deliveryFee : total

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm 
              items={items} 
              total={total} 
              onDeliveryFeeChange={setDeliveryFee}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ৳{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">৳{total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      Delivery Fee
                    </span>
                    <span className="font-medium">
                      {deliveryFee !== null ? `৳${deliveryFee.toFixed(2)}` : 'Enter address'}
                      {}
                    </span>
                    
                  </div>

                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg">৳{finalTotal.toFixed(2)}</span>
                    </div>
                    {deliveryFee === null && (
                      <p className="text-sm  mt-1 text-destructive">
                        + Delivery fee (enter address to calculate)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}