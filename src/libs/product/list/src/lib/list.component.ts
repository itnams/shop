import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { addToCart, AuthState, PipesModule } from '@shop/data-access';
import { ProductsService } from './data-access/services';
import { Product } from './data-access/models';
import { AddCartItemCommand, SearchProductCommand } from './data-access/command';

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule, PipesModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterViewInit {
  Math = Math; 
  sortOrderOptions = [
    { value: 'asc_price', label: 'Giá tăng dần' },
    { value: 'desc_price', label: 'Giá giảm dần' },
    { value: 'asc_id', label: 'Sản phẩm củ' },
    { value: 'desc_id', label: 'Sản phẩm mới' }
  ];
  productTypes = [{ value: 1, label: 'Túi xách' },{ value: 2, label: 'Balo' },{ value: 3, label: 'Ví' }];
  token$ = new BehaviorSubject<string>("");
  searchForm!: FormGroup;
  products$ = new BehaviorSubject<Product[]>([])
  nextLink$ = new BehaviorSubject<string>('')
  constructor(
    private store: Store<{ auth: AuthState }>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ProductsService
  ) {
    this.store.pipe(select('auth', 'token')).subscribe(resp => this.token$.next(resp ?? ""))
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      minPrice: [],
      maxPrice: [],
      productTypes: [1],
      sortOrder: ['asc_price']
    });
    this.route.queryParams.subscribe((params) => {
      this.searchForm.patchValue({
        productTypes: parseInt(params['productType'])
      })
      this.searchProduct()
    });
  }
  ngAfterViewInit(): void {
    
  }
  searchProduct(){
    let command: SearchProductCommand = {
      productName: this.searchForm.value.searchTerm ?? '', 
      categoryId: this.searchForm.value.productTypes ?? 0, 
    }
    if(this.searchForm.value.minPrice > 0){
      command.minPrice = this.searchForm.value.minPrice
    }
    if(this.searchForm.value.maxPrice > 0){
      command.maxPrice = this.searchForm.value.maxPrice
    }
    this.service.searchProducts(command,10,1,this.searchForm.value.sortOrder).subscribe(resp => {
      this.products$.next(resp.data ?? [])
      this.nextLink$.next(resp.nextLink ?? '')
    })
  }
  loadMore(){
    let command: SearchProductCommand = {
      productName: this.searchForm.value.searchTerm ?? '', 
      categoryId: this.searchForm.value.productTypes ?? 0, 
    }
    if(this.searchForm.value.minPrice > 0){
      command.minPrice = this.searchForm.value.minPrice
    }
    if(this.searchForm.value.maxPrice > 0){
      command.maxPrice = this.searchForm.value.maxPrice
    }
    this.service.loadMoreProduct(command, this.nextLink$.value).subscribe(resp => {
      this.products$.next(this.products$.value.concat(resp.data ?? []))
      this.nextLink$.next(resp.nextLink ?? '')
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
