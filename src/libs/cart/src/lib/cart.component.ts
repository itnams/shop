import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './data-access/services';
import { BehaviorSubject, debounceTime, Subject, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addToCart, AuthState, CartItem, PipesModule } from '@shop/data-access';
import { UpdateCartItemCommand } from './data-access/command';
import { CustomModalComponent } from '@shop/custom-modal';
import { OrderComponent } from '@shop/order';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule, CustomModalComponent, OrderComponent, PipesModule , FormsModule, ReactiveFormsModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  showModal$ = new BehaviorSubject<boolean>(false);
  private updateCartSubject = new Subject<{ id: number, quantity: number }>();
  items$ = new BehaviorSubject<CartItem[]>([]);
  itemSelected: CartItem[] = [] 
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
    const items = this.items$.value;
    const index = items.findIndex(i=> i.cartItemId == id)
    const indexSelect = this.itemSelected.findIndex(i=> i.cartItemId == id)
    if(indexSelect > -1){
      this.itemSelected.splice(indexSelect,1)
    } else {
      this.itemSelected.push(items[index])
    }
  }
  checkItem(id: number){
    return this.itemSelected.findIndex(it=> it.cartItemId == id) > -1
  }
  openModal() {
    this.showModal$.next(true);
  }

  closeModal() {
    this.showModal$.next(false);
  }
  handelCloseModal() {
    this.showModal$.next(false);
    this.getCart()
  }
}
