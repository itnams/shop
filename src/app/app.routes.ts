import { Route } from '@angular/router';
import { AboutUsComponent } from '@shop/about-us';
import { CartComponent } from '@shop/cart';
import { DeliveryPolicyComponent } from '@shop/delivery-policy';
import { DetailComponent } from '@shop/detail';
import { HomeComponent } from '@shop/home';
import { ListComponent } from '@shop/list';
import { LoginComponent } from '@shop/login';
import { MyOrdersComponent } from '@shop/my-orders';
import { PrivacyPolicyComponent } from '@shop/privacy-policy';
import { RegisterComponent } from '@shop/register';
import { ReturnPolicyComponent } from '@shop/return-policy';

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
    { path: 'my-orders', component: MyOrdersComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'product/:id', component: DetailComponent },
];
