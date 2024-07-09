import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './data-access/services';
import { LoginCommand } from './data-access/command';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private service: AuthService,
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  register() {
    const command: LoginCommand = {
      ...this.registerForm.value
    }
    this.service.register(command).subscribe(resp => {
      if (resp.success) {
        this.route.navigate(['/login'])
      } 
    })
  }
}
