import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RegisterService } from '../../services/register.service';
import { UserDTO } from '@core/models/dto/userDTO';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.isSubmitting || this.registerForm.invalid) return;

    this.isSubmitting = true;

    console.log(this.registerForm.value);

    try {
      const user: UserDTO = this.registerForm.value;
      const response = await this.registerService.register(user).toPromise();
      console.log('Usuario registrado com sucesso:', response);

      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Erro ao registrar usuario:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
