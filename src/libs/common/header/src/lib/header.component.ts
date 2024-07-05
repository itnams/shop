import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthState, logout } from '@shop/data-access';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  routerLink = "home"
  token$ = new BehaviorSubject<string>("");
  userName$ = new BehaviorSubject<string>("");
  constructor(private router: Router, private store: Store<{ auth: AuthState }>) {
    this.store.pipe(select('auth', 'token')).subscribe(resp => this.token$.next(resp ?? ""))
    this.store.pipe(select('auth', 'userName')).subscribe(resp => this.userName$.next(resp ?? ""))
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routerLink = event.urlAfterRedirects
      }
    });
  }
  logout(){
    this.store.dispatch(logout());
    this.router.navigate(['/login'])
  }
  checkActive(url: string) {
    return this.routerLink.includes(url)
  }
  routerLinkProduct(type: string) {
    this.router.navigateByUrl(`/product?productType=${type}`)
  }
}
