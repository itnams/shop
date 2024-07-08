export interface AddOrdersCommand {
    totalAmount: number,
    status: string,
    address: string,
    paymentMethods: string,
    phone: string,
    cartItems: CartItemIdCommand[]
}
export interface CartItemIdCommand {
    cartItemId: number,
    quantity: number,
    productId: number,
    price: number
}
