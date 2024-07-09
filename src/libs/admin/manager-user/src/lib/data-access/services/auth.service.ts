import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}
  getUser(){
    const url = '/auth/users'
    return this.apiService.getFromPublicApi<IApiResult<Customer[]>>(url);
  }
}