import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from './data-access/services';

@Component({
  selector: 'lib-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentSuccessComponent {
  id = '';
  constructor(
    private service: PaymentService, 
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.service.paymentSuccess(params.get('id')?.split('?')[0] ?? '').subscribe(resp=> {
        console.log(resp);
      })
    })
  }
}
