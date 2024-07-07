import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './data-access/services';
import { BehaviorSubject, debounceTime, Subject, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addToCart, AuthState, CartItem } from '@shop/data-access';
import { AddCartItemCommand, UpdateCartItemCommand } from './data-access/command';

@Component({
  selector: 'lib-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private updateCartSubject = new Subject<{ id: number, quantity: number }>();
  items$ = new BehaviorSubject<CartItem[]>([]);
  private inputSubject: Subject<{ id: number, event: Event }> = new Subject();
  private inputSubscription!: Subscription;
  constructor(private service: CartService,private store: Store<{ auth: AuthState }>) {
    this.store.select('auth', 'cart').subscribe(cart => {
      const item = cart?.items ?? []
      this.items$.next(item)
    });
    this.updateCartSubject.pipe(
      debounceTime(300), // Thời gian debounce (300ms là ví dụ, có thể thay đổi)
      switchMap(({ id, quantity }) => {
        const command: UpdateCartItemCommand = {
          cartItemId: id,
          quantity: quantity
        };
        return this.service.updateCartItem(command);
      })
    ).subscribe(() => {
      this.getCart();
    });
  }

  ngOnInit(): void {}
  getCart(){
    this.service.getCart().subscribe(resp => {
      const cart = resp.data ?? {};
      this.store.dispatch(addToCart({ cart: cart }));
    })
  }
  deleteItem(id: number){
    this.service.deleteCartItem(id).subscribe(resp =>{
      if(resp.success){
       this.getCart()
      }
    })
  }
  
  updateCartItem(id: number, event: any){
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value) || 0;
    this.updateCartSubject.next({ id, quantity });
  }

  selectItem(id: number){

  }
}
