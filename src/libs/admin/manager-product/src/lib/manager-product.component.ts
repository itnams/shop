import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCartItemCommand, SearchProductCommand } from './data-access/command';
import { addToCart } from '@shop/data-access';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthState, PipesModule } from '@shop/data-access';
import { ProductsService } from './data-access/services';
import { Product } from './data-access/models';

@Component({
  selector: 'manager-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule,
    PipesModule],
  templateUrl: './manager-product.component.html',
  styleUrl: './manager-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerProductComponent {
  Math = Math; 
  sortOrderOptions = [
    { value: 'asc_price', label: 'Giá tăng dần' },
    { value: 'desc_price', label: 'Giá giảm dần' },
    { value: 'asc_id', label: 'Sản phẩm củ' },
    { value: 'desc_id', label: 'Sản phẩm mới' }
  ];
  productTypes = [{ value: -1, label: 'All' },{ value: 1, label: 'Túi xách' },{ value: 2, label: 'Balo' },{ value: 3, label: 'Ví' }];
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
      productTypes: [-1],
      sortOrder: ['asc_price']
    });
  }
  ngAfterViewInit(): void {
    this.searchProduct()
  }
  searchProduct(){
    let command: SearchProductCommand = {
      productName: this.searchForm.value.searchTerm ?? '', 
    }
    command.categoryId = this.searchForm.value.productTypes == -1 ? undefined : this.searchForm.value.productTypes
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
}
