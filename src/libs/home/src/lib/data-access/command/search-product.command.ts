export interface SearchProductCommand {
    productName?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
}
