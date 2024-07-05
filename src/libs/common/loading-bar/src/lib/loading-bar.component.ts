import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loading-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss',
})
export class LoadingBarComponent {
  isLoading = false;

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}
