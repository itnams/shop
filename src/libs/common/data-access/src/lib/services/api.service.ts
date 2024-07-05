import { AuthState } from '../store';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, finalize } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class ApiService {
  token$ = new BehaviorSubject<string>("");
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  baseUrl = "https://shop-be20240705160013.azurewebsites.net";
  constructor(
    private store: Store<{ auth: AuthState }>,
    public http: HttpClient,
    private loadingService: LoadingService
  ) {
    this.store.pipe(select('auth', 'token')).subscribe(resp => this.token$.next(resp ?? ""))
  }
  private prepareHeader() {
    if (this.token$.value) {
      this.httpOptions.headers = this.httpOptions.headers.set(
        'Authorization',
        'Bearer ' + this.token$.value
      );
    }
    const domain = window.location.host;
    this.httpOptions.headers = this.httpOptions.headers.set(
      'X-Tenant-Host',
      domain
    );
  }
  postToPublicApi<T>(url: string, params?: any): Observable<T> {
    this.loadingService.show();
    const postData = JSON.stringify(params || {});
    this.prepareHeader();
    const fullUrl = this.baseUrl + url;
    return this.http
      .post<T>(fullUrl, postData, this.httpOptions)
      .pipe(finalize(() => this.loadingService.hide()));
  }
  getFromPublicApi<T>(url: string): Observable<T> {
    this.loadingService.show();
    const fullUrl = this.baseUrl + url;
    this.prepareHeader();
    return this.http.get<T>(fullUrl, this.httpOptions).pipe(finalize(() => this.loadingService.hide()));
  }
  uploadFilesToPublicApi<T>(url: string, files: FormData): Observable<T> {
    this.loadingService.show();
    this.prepareHeader();
    const fullUrl = this.baseUrl + url;
    return this.http
      .post<T>(fullUrl, files, this.httpOptions)
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
