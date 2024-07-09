export interface Product {
    productId?: number;
    productName?: string;
    description?: string;
    price?: number;
    oldPrice?: number;
    categoryId?: number;
    promotionId?: number;
    images?: ProductImage[];
}

export interface ProductImage {
    imageId?: number;
    imagePath?: string;
}