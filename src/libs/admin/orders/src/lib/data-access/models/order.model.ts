import { Product } from "./product.model"

export interface Order {
    orderId?: number,
    userId?: number,
    orderDate?: string,
    totalAmount?: number,
    status?: string,
    address?: string,
    phone?: string,
    paymentMethods?: string,
    items: OrderItem[]
  }

  export interface OrderItem {
    orderDetailId?: number,
    orderId?: number,
    quantity?: number,
    price?: number,
    product?: Product
  }