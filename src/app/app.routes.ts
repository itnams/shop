import { Route } from '@angular/router';
import { AboutUsComponent } from '@shop/about-us';
import { AddProductComponent } from '@shop/add-product';
import { AddPromotionComponent } from '@shop/add-promotion';
import { CartComponent } from '@shop/cart';
import { DashboardComponent } from '@shop/dashboard';
import { DeliveryPolicyComponent } from '@shop/delivery-policy';
import { DetailComponent } from '@shop/detail';
import { HomeComponent } from '@shop/home';
import { ListComponent } from '@shop/list';
import { LoginComponent } from '@shop/login';
import { ManagerProductComponent } from '@shop/manager-product';
import { ManagerUserComponent } from '@shop/manager-user';
import { MyOrdersComponent } from '@shop/my-orders';
import { NotFoundComponent } from '@shop/not-found';
import { OrdersComponent } from '@shop/orders';
import { PaymentSuccessComponent } from '@shop/payment-success';
import { PrivacyPolicyComponent } from '@shop/privacy-policy';
import { PromotionsComponent } from '@shop/promotions';
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
    { path: 'dashboard', component: DashboardComponent},
    { path: 'manager-product', component: ManagerProductComponent},
    { path: 'manager-user', component: ManagerUserComponent},
    { path: 'orders', component: OrdersComponent},
    { path: 'promotions', component: PromotionsComponent },
    { path: 'promotions/add', component: AddPromotionComponent },
    { path: 'product/add', component: AddProductComponent },
    { path: 'product/:id', component: DetailComponent },
    { path: 'payment-success/:id', component: PaymentSuccessComponent },
    { path: '**', component: NotFoundComponent }
];
