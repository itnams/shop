import { CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Product } from './data-access/models';
import { ProductDetailService } from './data-access/services';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthState } from '@shop/data-access';
import { Review } from './data-access/models/review.models';
import { ReviewProductCommand } from './data-access/command';

@Component({
  selector: 'detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailComponent implements AfterViewInit {
  quantity: number = 1;
  comment: string = ""
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  token$ = new BehaviorSubject<string>("");
  id = 0;
  product$ = new BehaviorSubject<Product>({})
  review$ = new BehaviorSubject<Review[]>([])
  constructor(private service: ProductDetailService, private route: ActivatedRoute, private store: Store<{ auth: AuthState }>
  ) {
    this.store.pipe(select('auth', 'token')).subscribe(resp => this.token$.next(resp ?? ""))
    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id')?? '0');
    })
  }
  ngAfterViewInit(): void {
    this.getProductDetail()
    this.getReview()
  }
  setRating(star: number): void {
    this.rating = star;
  }
  getProductDetail() {
    this.service.getProductDetail(this.id).subscribe(resp => {
      this.product$.next(resp.data ?? {})
    })
  }
  reviewProcduct(){
    const command: ReviewProductCommand = {
      productId: this.id,
      rating: this.rating,
      comment: this.comment
    }
    this.service.reviewProcduct(command).subscribe(resp=> {
      if(resp.success) {
        this.getReview()
      }
    })
  }
  getReview() {
    this.service.getReview(this.id).subscribe(resp => {
      this.review$.next(resp.data ?? [])
    })
  }
}
