import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { sleep } from '@shared/utils/helpers';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  async handleSubmit() {
    if (this.isSubmitting || this.loginForm.invalid) return;

    this.isSubmitting = true;

    try {
      const token = await this.loginService
        .logar(this.loginForm.value)
        .toPromise();
      if (token) {
        this.loginService.addToken(token);
        await sleep(2000);
        this.router.navigate(['/app']);
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
}
