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
export interface Product {
    productId?: number;
    productName?: string;
    description?: string;
    price?: number;
    oldPrice?: number;
    categoryId?: number;
    promotionId?: number;
    images?: ProductImages[];
}
export interface ProductImages {
    imageId?: number;
    imagePath?: string;
}