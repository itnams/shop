import { Route } from '@angular/router';
import { AboutUsComponent } from '@shop/about-us';
import { CartComponent } from '@shop/cart';
import { DeliveryPolicyComponent } from '@shop/delivery-policy';
import { HomeComponent } from '@shop/home';
import { LoginComponent } from '@shop/login';
import { PrivacyPolicyComponent } from '@shop/privacy-policy';
import { ReturnPolicyComponent } from '@shop/return-policy';
import { DetailComponent } from 'src/libs/product/detail/src/lib/detail.component';
import { ListComponent } from 'src/libs/product/list/src/lib/list.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'return-policy', component: ReturnPolicyComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent},
    { path: 'delivery-policy', component: DeliveryPolicyComponent},
    { path: 'product', component: ListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: DetailComponent },
];
