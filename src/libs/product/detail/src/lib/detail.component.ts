import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  quantity: number = 1;
  comment: string = ""
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  setRating(star: number): void {
    this.rating = star;
  }
}
