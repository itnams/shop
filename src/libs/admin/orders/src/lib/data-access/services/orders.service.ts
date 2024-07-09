import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Order } from '../models';
import { SearchOrdersCommand } from '../command';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private apiService: ApiService) { }

  searchOrders(command: SearchOrdersCommand, pageSize: number, pageIndex: number) {
    const url = `/cart/orders-search?pageSize=${pageSize}&pageIndex=${pageIndex}`
    return this.apiService.postToPublicApi<IApiResult<Order[]>>(url,command)
  }
  searchOrdersLoadmore(command: SearchOrdersCommand, url: string) {
    return this.apiService.postToPublicApi<IApiResult<Order[]>>(url,command)
  }
  compleOrder(orderId: number){
    const url = `/cart/completar-order/${orderId}`
    return this.apiService.getFromPublicApi<IApiResult<boolean>>(url)
  }
}
