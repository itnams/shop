import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  routerLink = "home"
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routerLink = event.urlAfterRedirects
      }
    });
  }
  checkActive(url: string){
    return this.routerLink.includes(url)
  }
}
