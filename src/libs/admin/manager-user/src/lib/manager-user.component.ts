import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './data-access/services';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './data-access/models';

@Component({
  selector: 'manager-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-user.component.html',
  styleUrl: './manager-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerUserComponent {
  user$ = new BehaviorSubject<Customer[]>([])
  constructor(private service: AuthService){
    this.getUser()
  }
  getUser(){
    this.service.getUser().subscribe(resp => {
      this.user$.next(resp.data ?? [])
    })
  }
}
