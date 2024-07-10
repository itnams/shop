import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addToCart, AuthState, CartItem, PipesModule } from '@shop/data-access';
import { OrderService } from './data-access/services';
import { AddOrdersCommand } from './data-access/command';
import { Store } from '@ngrx/store';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, FormsModule, PipesModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  @Input() items!: CartItem[];
  @Input() phone: string = '';
  @Input() shippingAddress: string = '';
  @Input() paymentMethod: string = 'Momo';
  @Input() readonly: boolean = false;
  @Output() actionEvent = new EventEmitter();

  constructor(private service: OrderService,private store: Store<{ auth: AuthState }>){}
  getTotalAmount(){
    let totalAmount = 0
    this.items.forEach(item=>{
      totalAmount += ((item.product?.price ?? 0)*(item.quantity ?? 0))
    })
    return totalAmount
  }
  getCart(){
    this.service.getCart().subscribe(resp => {
      const cart = resp.data ?? {};
      this.store.dispatch(addToCart({ cart: cart }));
    })
  }
  addOder(){
    const command: AddOrdersCommand = {
      totalAmount: this.getTotalAmount(),
      status: 'Chờ giao hàng',
      address: this.shippingAddress,
      paymentMethods: this.paymentMethod,
      phone: this.phone,
      cartItems: this.items.map( item => {
        return  {
          cartItemId: item.cartItemId ?? 0,
          quantity: item.quantity ?? 0,
          productId: item.product?.productId ?? 0,
          price: item.product?.price ?? 0
        }
      })
    }
    this.service.addOder(command).subscribe(resp=>{
      if(resp.success){
        alert('Đặt hàng thành công')
        this.getCart()
        if(resp.data?.length ?? 0 > 0){
          window.location.href = resp.data ?? '';
        }
      }
    })
  }
}
