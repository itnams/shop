import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Order } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private apiService: ApiService) { }

  getOrders() {
    const url = '/cart/orders'
    return this.apiService.getFromPublicApi<IApiResult<Order[]>>(url)
  }
}