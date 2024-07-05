import { Injectable } from '@angular/core';
import { LoadingBarComponent } from '@shop/loading-bar';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingBarComponent!: LoadingBarComponent;

  setLoadingBarComponent(loadingBarComponent: LoadingBarComponent) {
    this.loadingBarComponent = loadingBarComponent;
  }

  show() {
    this.loadingBarComponent.show();
  }

  hide() {
    this.loadingBarComponent.hide();
  }
}