import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { addToCart, AuthState } from '@shop/data-access';
import { HomeService } from './data-access/services';
import { Product } from './data-access/models';
import { SearchProductCommand } from './data-access/command';
import { AddCartItemCommand } from './data-access/command/add-cart-item.command';
@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit{
  Math = Math; 
  token$ = new BehaviorSubject<string>("");
  slidesPerView: number = 3;
  newWallet$ = new BehaviorSubject<Product[]>([]);
  newHandBag$ = new BehaviorSubject<Product[]>([]);
  newBalo$ = new BehaviorSubject<Product[]>([]);
  constructor(private router: Router, private store: Store<{ auth: AuthState }>,private service: HomeService) {
    this.store.pipe(select('auth', 'token')).subscribe(resp => this.token$.next(resp ?? ""))
    this.setSlidesPerView();
  }
  ngOnInit(): void {
    this.loading()
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setSlidesPerView();
  }

  setSlidesPerView() {
    this.slidesPerView = window.innerWidth > 500 ? 3 : 1;
  }
  loading(){
    this.searchNewBalo();
    this.searchNewHandBag();
    this.searchWallet();
  }
  searchNewHandBag(){
    const command: SearchProductCommand = {
      categoryId : 1
    }
    this.service.searchProduct(command,10,1,'desc_id').subscribe(resp =>{
      this.newHandBag$.next(resp.data ?? [])
    })
  }
  searchNewBalo(){
    const command: SearchProductCommand = {
      categoryId : 2
    }
    this.service.searchProduct(command,10,1,'desc_id').subscribe(resp =>{
      this.newBalo$.next(resp.data ?? [])
    })
  }
  searchWallet(){
    const command: SearchProductCommand = {
      categoryId : 3
    }
    this.service.searchProduct(command,10,1,'desc_id').subscribe(resp =>{
      this.newWallet$.next(resp.data ?? [])
    })
  }
  addCartItems(productId: number){
    const command: AddCartItemCommand = {
      productId: productId,
      quantity: 1
    }
    this.service.addCartItem(command).subscribe(resp=> {
      if(resp.data == true){
        this.service.getCart().subscribe(rp => {
          const cart = rp.data ?? {};
          this.store.dispatch(addToCart({ cart: cart }));
        })
      }
    })
  }
}
