export interface Review {
    reviewId?: number;
    productId?: number;
    rating?: number;
    comment?: string;
    reviewDate?: string;
    user?: User;
}

export interface User {
    id?: number,
    userName?: string,
    password?: string,
    role?: string
}