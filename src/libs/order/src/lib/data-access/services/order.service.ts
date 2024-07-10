import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Cart } from '../models';
import { AddOrdersCommand } from '../command';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private apiService: ApiService) { }

  addOder(command: AddOrdersCommand) {
    const url = '/cart/orders'
    return this.apiService.postToPublicApi<IApiResult<string>>(url, command)
  }
  getCart() {
    const url = `/cart/items`
    return this.apiService.getFromPublicApi<IApiResult<Cart>>(url)
  }
}