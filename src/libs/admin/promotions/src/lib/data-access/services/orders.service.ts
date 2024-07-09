import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Promotions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  constructor(private apiService: ApiService) { }
  addPromotions(formData: FormData){
    const url = '/Promotions/add'
    return this.apiService.uploadFilesToPublicApi<IApiResult<boolean>>(url,formData);
  }
  deletePromotions(id: number){
    const url = `/Promotions/${id}`
    return this.apiService.deleteFromPublicApi<IApiResult<boolean>>(url);
  }
  getPromotions(){
    const url = '/Promotions/all'
    return this.apiService.getFromPublicApi<IApiResult<Promotions[]>>(url);
  }
  getPromotionsStillValid(){
    const url = '/Promotions/still-valid'
    return this.apiService.getFromPublicApi<IApiResult<Promotions[]>>(url);
  }
}
