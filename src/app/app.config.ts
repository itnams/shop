import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { ApiService, authReducer, VndFormatPipe } from '@shop/data-access';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ auth: authReducer }),
    ApiService,
    provideHttpClient(),
    importProvidersFrom(
      ApiService,
      VndFormatPipe
    )
  ],
};
