import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './data-access/services';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState, CartItem } from '@shop/data-access';

@Component({
  selector: 'lib-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  items$ = new BehaviorSubject<CartItem[]>([]);

  constructor(private service: CartService,private store: Store<{ auth: AuthState }>) {
    this.store.select('auth', 'cart').subscribe(cart => {
      const item = cart?.items ?? []
      this.items$.next(item)
    });
  }

  ngOnInit(): void {}
  getCart(){
    this.service.getCart().subscribe(resp => {
      this.items$.next(resp.data?.items ?? [])
    })
  }
}
