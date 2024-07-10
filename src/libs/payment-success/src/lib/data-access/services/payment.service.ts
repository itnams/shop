import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private apiService: ApiService) { }
  paymentSuccess(id: string){
    const url = `/cart/payment-success/${id}`
    return this.apiService.getFromPublicApi<boolean>(url)
  }
}