import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private apiService: ApiService) { }
  addProduct(formData: FormData){
    const url = `/products/add`
    return this.apiService.uploadFilesToPublicApi<IApiResult<Product>>(url,formData)
  }
}