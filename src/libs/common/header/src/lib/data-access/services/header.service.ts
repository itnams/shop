import { Injectable } from '@angular/core';
import { ApiService, Cart, IApiResult } from '@shop/data-access';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private apiService: ApiService) { }
  getCart() {
    const url = `/cart/items`
    return this.apiService.getFromPublicApi<IApiResult<Cart>>(url)
  }
}