import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

interface CartSummaryProps {
  subtotal: number
  itemCount: number
}

export function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  // const shipping = subtotal > 0 ? 100 : 0 // Flat shipping rate
  const tax = subtotal * 0 // No tax for now
  // const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="font-medium">৳{subtotal.toFixed(2)}</span>
        </div>
        
        {/* <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `৳${shipping.toFixed(2)}`}
          </span>
        </div> */}

        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">৳{tax.toFixed(2)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          {/* <span>৳{total.toFixed(2)}</span> */}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">
            Proceed to Checkout
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/products">
            Continue Shopping
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}