import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './data-access/services';
import { SearchOrdersCommand } from './data-access/command';
import { BehaviorSubject } from 'rxjs';
import { Order } from './data-access/models';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  filterCriteria = {
    orderId: '',
    orderDate: '',
    status: '',
    phone: '',
    address: '',
    paymentMethods: 'All'
  };
  paymentMethodsOptions: string[] = [
    'All',
    'Momo', 
    'Đã thanh toán qua Momo', 
    'Thanh toán thất bại', 
    'Thanh toán thành công'
  ];
  oders$ = new BehaviorSubject<Order[]>([])
  nextLink =""
  constructor(private service: OrderService){
    this.searchOrders()
  }
 
  searchOrders(){
    const command: SearchOrdersCommand ={
      ...this.filterCriteria,
      orderId: parseInt(this.filterCriteria.orderId ?? 0) < 0 ? undefined : parseInt(this.filterCriteria.orderId ?? 0),
      paymentMethods: this.filterCriteria.paymentMethods == 'All' ? undefined : this.filterCriteria.paymentMethods
    } 
    this.service.searchOrders(command,10,1).subscribe(resp=> {
      this.oders$.next(resp.data ?? [])
      this.nextLink = resp.nextLink ?? ''
    })
  }
  loadMore(){
    const command: SearchOrdersCommand ={
      ...this.filterCriteria,
      orderId: parseInt(this.filterCriteria.orderId ?? 0) < 0 ? undefined : parseInt(this.filterCriteria.orderId ?? 0),
      paymentMethods: this.filterCriteria.paymentMethods == 'All' ? undefined : this.filterCriteria.paymentMethods
    } 
    this.service.searchOrdersLoadmore(command,this.nextLink).subscribe(resp=> {
      this.oders$.next(this.oders$.value.concat(resp.data ?? []))
      this.nextLink = resp.nextLink ?? ''
    })
  }
  compleOrder(order: Order){
    const orders = this.oders$.value
    const index = this.oders$.value.findIndex(i=> order.orderId == i.orderId)
    this.service.compleOrder(order.orderId ?? 0).subscribe(resp => {
      if(resp.data){
        const value = orders[index]
        value.status = 'Đã giao'
        value.paymentMethods = 'Thanh toán thành công'
        orders.splice(index,1)
        orders.splice(index, 0, value);
        this.oders$.next(orders)
      }
    })
  }
}
