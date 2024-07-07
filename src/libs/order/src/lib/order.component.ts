import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem, PipesModule } from '@shop/data-access';

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
  shippingAddress: string = '';
  paymentMethod: string = 'vnpay';
  getTotalAmount(){
    let totalAmount = 0
    this.items.forEach(item=>{
      totalAmount += ((item.product?.price ?? 0)*(item.quantity ?? 0))
    })
    return totalAmount
  }
  placeOrder(){
    console.log(this.shippingAddress,this.paymentMethod)
  }
}
