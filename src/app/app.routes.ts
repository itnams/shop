import { Route } from '@angular/router';
import { AboutUsComponent } from '@shop/about-us';
import { HomeComponent } from '@shop/home';
import { LoginComponent } from '@shop/login';
import { DetailComponent } from 'src/libs/product/detail/src/lib/detail.component';
import { ListComponent } from 'src/libs/product/list/src/lib/list.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'product', component: ListComponent },
    { path: 'product/:id', component: DetailComponent },
];
