import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { SearchProductCommand } from '../command';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private apiService: ApiService) { }
  searchProduct(command: SearchProductCommand, pageSize = 10, pageIndex = 1, sortOrder = "asc_price") {
    const url = `/products/search?pageSize=${pageSize}&pageIndex=${pageIndex}&sortOrder=${sortOrder}`
    return this.apiService.postToPublicApi<IApiResult<Product[]>>(url, command)
  }
}