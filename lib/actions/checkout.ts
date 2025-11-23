'use server'

import { getServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface OrderData {
  recipient_name: string
  recipient_phone: string
  recipient_secondary_phone?: string
  recipient_address: string
  special_instruction?: string
  payment_method: 'cod' | 'bkash' | 'nagad'
  bkash_number?: string
  bkash_transaction_id?: string
  nagad_number?: string
  nagad_transaction_id?: string
  items: any[]
  total: number
}

export async function createOrder(orderData: OrderData) {
  try {
    const supabase = await getServerSupabaseClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Calculate total weight and quantity
    const item_quantity = orderData.items.reduce((sum, item) => sum + item.quantity, 0)
    const item_weight = orderData.items.reduce((sum, item) => sum + (item.quantity * 0.5), 0) // Assuming 0.5kg per item

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        recipient_name: orderData.recipient_name,
        recipient_phone: orderData.recipient_phone,
        recipient_secondary_phone: orderData.recipient_secondary_phone || null,
        recipient_address: orderData.recipient_address,
        special_instruction: orderData.special_instruction || null,
        payment_method: orderData.payment_method,
        payment_number: orderData.payment_method === 'bkash' 
          ? orderData.bkash_number 
          : orderData.payment_method === 'nagad' 
          ? orderData.nagad_number 
          : null,
        payment_transaction_id: orderData.payment_method === 'bkash' 
          ? orderData.bkash_transaction_id 
          : orderData.payment_method === 'nagad' 
          ? orderData.nagad_transaction_id 
          : null,
        subtotal: orderData.total,
        total: orderData.total, // Will be updated with delivery fee later
        item_quantity,
        item_weight,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return { success: false, error: 'Failed to create order' }
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items error:', itemsError)
      // Rollback order creation
      await supabase.from('orders').delete().eq('id', order.id)
      return { success: false, error: 'Failed to create order items' }
    }

    // Clear user's cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    // TODO: Create Pathao order via API
    // This would be done in a separate API route or background job
    // const pathaoResponse = await createPathaoOrder(order)

    revalidatePath('/cart')
    revalidatePath('/orders')

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error('Checkout error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}