import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { MonthlyProductSales, MonthlySales, MonthlySalesCount } from '../models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private apiService: ApiService) { }

  
  getMonthlySales(){
    const url = '/sale/monthly-sales'
    return this.apiService.getFromPublicApi<IApiResult<MonthlySales[]>>(url).pipe();
  }

  getMonthlySalesCount() {
    const url = '/sale/monthly-sales-count'
    return this.apiService.getFromPublicApi<IApiResult<MonthlySalesCount[]>>(url);
  }

  getMonthlyProductSales() {
    const url = '/sale/monthly-product-sales'
    return this.apiService.getFromPublicApi<IApiResult<MonthlyProductSales[]>>(url);
  }
}
