import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Product } from '../models';
import { ReviewProductCommand } from '../command';
import { Review } from '../models/review.models';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor(private apiService: ApiService) { }
  getProductDetail(productId: number) {
    const url = `/products/${productId}`
    return this.apiService.getFromPublicApi<IApiResult<Product>>(url)
  }
  getReview(productId: number){
    const url = `/products/review/${productId}`
    return this.apiService.getFromPublicApi<IApiResult<Review[]>>(url)
  }
  reviewProcduct(command: ReviewProductCommand){
    const url = `/products/review`
    return this.apiService.postToPublicApi<IApiResult<Product>>(url,command)
  }
}