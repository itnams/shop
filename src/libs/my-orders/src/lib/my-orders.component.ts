import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from '@shop/custom-modal';
import { OrderComponent } from '@shop/order';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from './data-access/services';
import { Order, OrderItem } from './data-access/models';
import { PipesModule } from '@shop/data-access';

@Component({
  selector: 'my-orders',
  standalone: true,
  imports: [CommonModule, CustomModalComponent, OrderComponent, PipesModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent {
  orders$ = new BehaviorSubject<Order[]>([])
  showModal$ = new BehaviorSubject<boolean>(false);
  items$ = new BehaviorSubject<any>({});
  phone$ = new BehaviorSubject<string>('');
  address$ = new BehaviorSubject<string>('');
  paymentStatus$ = new BehaviorSubject<string>('');
  constructor(private service: OrderService){
    this.getOrders()
  }
  getOrders(){
    this.service.getOrders().subscribe(resp=> {
      this.orders$.next(resp.data ?? [])
    })
  }
  openModal(item: Order) {
    this.items$.next(item.items.map(i=> {
      return {
        cartItemId: i.orderId,
        cartId: i.orderId,
        quantity: i.quantity,
        product: i.product,
      }
    }))
    this.paymentStatus$.next(item.paymentMethods ?? '')
    this.address$.next(item.address ?? '')
    this.phone$.next(item.paymentMethods ?? '')
    this.showModal$.next(true);
  }

  closeModal() {
    this.showModal$.next(false);
  }
  handelCloseModal() {
    this.showModal$.next(false);
  }
}
