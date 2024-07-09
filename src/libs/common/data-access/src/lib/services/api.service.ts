import { AuthState } from '../store';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
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
      .pipe(finalize(() => this.loadingService.hide()),catchError(this.handleError));
  }
  putToPublicApi<T>(url: string, params?: any): Observable<T> {
    this.loadingService.show();
    const postData = JSON.stringify(params || {});
    this.prepareHeader();
    const fullUrl = this.baseUrl + url;
    return this.http
      .put<T>(fullUrl, postData, this.httpOptions)
      .pipe(finalize(() => this.loadingService.hide()),catchError(this.handleError));
  }
  getFromPublicApi<T>(url: string): Observable<T> {
    this.loadingService.show();
    const fullUrl = this.baseUrl + url;
    this.prepareHeader();
    return this.http.get<T>(fullUrl, this.httpOptions).pipe(finalize(() => this.loadingService.hide()),catchError(this.handleError));
  }
  deleteFromPublicApi<T>(url: string): Observable<T> {
    this.loadingService.show();
    const fullUrl = this.baseUrl + url;
    this.prepareHeader();
    return this.http.delete<T>(fullUrl, this.httpOptions).pipe(finalize(() => this.loadingService.hide()),catchError(this.handleError));
  }
  uploadFilesToPublicApi<T>(url: string, files: FormData): Observable<T> {
    this.loadingService.show();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    httpOptions.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token$.value,
      'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'accept': 'text/plain',
      'sec-ch-ua-platform': '"Windows"'
    });
    const fullUrl = this.baseUrl + url;
    return this.http
      .post<T>(fullUrl, files, httpOptions)
      .pipe(finalize(() => this.loadingService.hide()),catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    alert(error.error.message);
    window.location.href = "/login"
    return throwError(error.error.message)
  }
}
