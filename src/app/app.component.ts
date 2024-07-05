import { Component, importProvidersFrom, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingService } from '@shop/data-access';
import { HeaderComponent } from '@shop/header';
import { LoadingBarComponent } from '@shop/loading-bar';
import { FooterComponent } from 'src/libs/common/footer/src/lib/footer.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, LoadingBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title =""
  @ViewChild(LoadingBarComponent) loadingBarComponent!: LoadingBarComponent;
  constructor(private loadingService: LoadingService) {}
  ngAfterViewInit() {
    this.loadingService.setLoadingBarComponent(this.loadingBarComponent);
  }
}
