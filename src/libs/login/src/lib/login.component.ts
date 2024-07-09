import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './data-access/services';
import { LoginCommand } from './data-access/command';
import { AuthState, login } from '@shop/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private service: AuthService,
    private store: Store<{ auth: AuthState }>
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    const command: LoginCommand = {
      ...this.loginForm.value
    }
    this.service.login(command).subscribe(resp => {
      if (resp.success) {
        const token = resp.token ?? "";
        const userName = resp.data?.userName ?? "";
        const role = resp.data?.role ?? "";
        this.store.dispatch(login({ token, userName, role }));
        this.route.navigate(['/dashboard'])
      } 
    })
  }
}
