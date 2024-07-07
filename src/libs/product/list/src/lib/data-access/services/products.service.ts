import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Product } from '../models';
import { SearchProductCommand } from '../command';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) { }
  searchProducts(command: SearchProductCommand, pageSize = 10, pageIndex = 1, sortOrder = "asc_price"){
    const url = `/products/search?pageSize=${pageSize}&pageIndex=${pageIndex}&sortOrder=${sortOrder}`
    return this.apiService.postToPublicApi<IApiResult<Product[]>>(url,command)
  }
  loadMoreProduct(command: SearchProductCommand, url: string){
    return this.apiService.postToPublicApi<IApiResult<Product[]>>(url,command)
  }
}