import { Injectable } from '@angular/core';
import { ApiService, IApiResult } from '@shop/data-access';
import { LoginCommand } from '../command';
import { Customer } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}
  login(command: LoginCommand){
    const url = '/auth/login'
    return this.apiService.postToPublicApi<IApiResult<Customer>>(url,command);
  }
}