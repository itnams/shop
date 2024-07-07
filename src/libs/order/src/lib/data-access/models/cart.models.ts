import { Product } from "./product.model";

export interface Cart {
    cartId?: number;
    userId?: number;
    items?: CartItem[];
}

export interface CartItem {
    cartItemId?: number;
    cartId?: number;
    quantity?: number;
    product?: Product;
}
