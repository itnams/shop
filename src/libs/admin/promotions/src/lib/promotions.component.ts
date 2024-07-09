import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promotions } from './data-access/models';
import { PromotionsService } from './data-access/services';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-promotions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
  promotions$ = new BehaviorSubject<Promotions[]>([]);

  constructor(private service: PromotionsService) { }

  ngOnInit(): void {
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    this.service.getPromotions().subscribe(resp => {
      this.promotions$.next(resp.data ?? [])
    })
  }

  deletePromotion(promotionId: number): void {
    this.service.deletePromotions(promotionId).subscribe(resp => {
     if(resp.data){
      alert("Remove success")
      this.fetchPromotions();
     }
    })
  }
}
