import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem, PipesModule } from '@shop/data-access';
import { OrderService } from './data-access/services';
import { AddOrdersCommand } from './data-access/command';

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
  phone: string = '';
  shippingAddress: string = '';
  paymentMethod: string = 'vnpay';
  @Output() actionEvent = new EventEmitter();

  constructor(private service: OrderService){}
  getTotalAmount(){
    let totalAmount = 0
    this.items.forEach(item=>{
      totalAmount += ((item.product?.price ?? 0)*(item.quantity ?? 0))
    })
    return totalAmount
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
      if(resp.data){
        alert('Đặt hàng thành công')
        this.actionEvent.emit();
      }
    })
  }
}
