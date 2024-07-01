import { Route } from '@angular/router';
import { AboutUsComponent } from '@shop/about-us';
import { HomeComponent } from '@shop/home';
import { LoginComponent } from '@shop/login';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about-us', component: AboutUsComponent },
];
