import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Cart } from '../models';
import { AddCartItemCommand } from '../command/add-cart-item.command';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private apiService: ApiService) { }

  addCartItem(command: AddCartItemCommand) {
    const url = '/cart/add-item'
    return this.apiService.postToPublicApi<IApiResult<Boolean>>(url, command)
  }
  updateCartItem(command: AddCartItemCommand) {
    const url = '/cart/update-item'
    return this.apiService.putToPublicApi<IApiResult<Boolean>>(url, command)
  }
  getCart() {
    const url = `/cart/items`
    return this.apiService.getFromPublicApi<IApiResult<Cart>>(url)
  }
  deleteCartItem(id: number) {
    const url = `/cart/item?CartItemId=${id}`
    return this.apiService.deleteFromPublicApi<IApiResult<Boolean>>(url)
  }
}