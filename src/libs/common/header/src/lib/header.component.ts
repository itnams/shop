import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { addToCart, AuthState, Cart, logout, } from '@shop/data-access';
import { HeaderService } from './data-access/services';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  routerLink = "home"
  token$ = new BehaviorSubject<string>("");
  userName$ = new BehaviorSubject<string>("");
  cart$ = new BehaviorSubject<Cart>({});
  constructor(private router: Router, private store: Store<{ auth: AuthState }>, private service: HeaderService) {
    this.store.pipe(select('auth', 'token')).subscribe(resp => this.token$.next(resp ?? ""))
    this.store.pipe(select('auth', 'userName')).subscribe(resp => this.userName$.next(resp ?? ""))
    this.store.select('auth', 'cart').subscribe(cart => {
      this.cart$.next(cart ?? {})
    });
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routerLink = event.urlAfterRedirects
      }
    });
    this.token$.subscribe(resp => {
      if (resp.length > 0) {
        this.getCart()
      }
    })
  }
  getCart() {
    this.service.getCart().subscribe(resp => {
      const cart = resp.data ?? {};
      this.store.dispatch(addToCart({ cart: cart }));
    })
  }
  getTotalItem(cart: Cart){
    let total = 0
    cart.items?.forEach(item => {
      total += (item.quantity ?? 0)
    })
    return total;
  }
  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login'])
  }
  checkActive(url: string) {
    return this.routerLink.includes(url)
  }
  routerLinkProduct(type: string) {
    this.router.navigateByUrl(`/product?productType=${type}`)
  }
}
